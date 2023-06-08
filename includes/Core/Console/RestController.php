<?php

namespace WPConsole\Core\Console;

use WP_Error;
use Exception;
use Throwable;
use WP_REST_Server;
use WP_REST_Controller;
use WPConsole\Core\Console\Psy\Shell;
use WPConsole\Core\Console\Psy\Output\ShellOutput;

class RestController extends WP_REST_Controller {

    /**
     * Endpoint namespace
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $namespace = 'wp-console/v1';

    /**
     * Route name
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $base = 'console';

    /**
     * Class constructor
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function __construct() {
        $this->register_routes();
    }

    /**
     * Register REST routes
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->base, [
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'create_item' ],
                'permission_callback' => [ $this, 'can_manage_options' ],
                'args'                => [
                    'input' => [
                        'required'          => true,
                        'type'              => 'string',
                        'description'       => esc_html__( 'Code to be executed.', 'wp-console' ),
                        'validate_callback' => [ $this, 'input_validation' ],
                    ],
                ],
            ],
        ] );
    }

    /**
     * Check if current user has manage_options capability
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return bool
     */
    public function can_manage_options( $request ) {
        return current_user_can( 'manage_options' );
    }

    /**
     * Validate input arg
     *
     * @since 1.0.0
     *
     * @param string           $value
     * @param \WP_REST_Request $request
     * @param string           $param
     *
     * @return bool|\WP_Error
     */
    public function input_validation( $value, $request, $param ) {
        if ( ! empty( trim( $value ) ) ) {
            return true;
        }

        return new WP_Error( 'wp_console_rest_invalid_input', esc_html__( 'Input is empty', 'wp-console' ) );
    }

    /**
     * Evaluate input code
     *
     * @since 1.0.0
     * @since 1.1.0 Use \Psy\Shell::writeStdout as output buffer
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public function create_item( $request ) {
        global $wp_console_dump;

        try {
            $timer = microtime( true );
            $input = $request['input'];

            $config = new \Psy\Configuration( [
                'configDir' => WP_CONTENT_DIR,
            ] );

            $output = new ShellOutput( ShellOutput::VERBOSITY_NORMAL, true );

            $config->setOutput( $output );
            $config->setColorMode( \Psy\Configuration::COLOR_MODE_DISABLED );

            $psysh = new Shell( $config );

            $psysh->setOutput( $output );

            $psysh->addCode( $input );

            extract( $psysh->getScopeVariablesDiff( get_defined_vars() ) );

            ob_start( [ $psysh, 'writeStdout' ], 1 );

            set_error_handler( [ $psysh, 'handleError' ] );

            $_ = eval( $psysh->onExecute( $psysh->flushCode() ?: \Psy\ExecutionClosure::NOOP_INPUT ) );

            restore_error_handler();

            $psysh->setScopeVariables( get_defined_vars() );
            $psysh->writeReturnValue( $_ );

            ob_end_flush();

            if ( $output->exception ) {
                throw $output->exception;
            }

            $execution_time = microtime( true ) - $timer;

            $data = [
                'output'         => $output->outputMessage,
                'dump'           => $wp_console_dump,
                'execution_time' => number_format( $execution_time, 3, '.', '' ),
            ];

            return rest_ensure_response( $data );

        } catch ( Throwable $error ) {
            // This code only executes in PHP >= 7.x and is ignored in PHP 5.x.
            return $this->request_error( $request['input'], $error );

        } catch ( Exception $error ) {
            // This code only executes in PHP 5.x and is ignored in PHP 7.
            return $this->request_error( $request['input'], $error );
        }
    }

    /**
     * Evaluate input code
     *
     * @since 2.3.0
     *
     * @param string     $input
     * @param \Throwable $request
     *
     * @return \WP_Error
     */
    protected function request_error( $input, $error ) {
        if ( ob_get_length() ) {
            ob_end_flush();
        }

        return new WP_Error( 'wp_console_rest_error', $error->getMessage(), [
            'input'  => $input,
            'status' => 422,
            'trace'  => $error->getTraceAsString(),
        ] );
    }
}
