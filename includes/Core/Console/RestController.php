<?php

namespace WPConsole\Core\Console;

use WPConsole\Core\Console\Psy\Output\ShellOutput;
use WPConsole\Core\Console\Psy\Shell;
use WP_Error;
use WP_REST_Controller;
use WP_REST_Server;

class RestController extends WP_REST_Controller {

    /**
     * Endpoint namespace
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    protected $namespace = 'wp-console/v1';

    /**
     * Route name
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    protected $base = 'console';

    /**
     * Class constructor
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function __construct() {
        $this->register_routes();
    }

    /**
     * Register REST routes
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->base, [
            [
                'methods'  => WP_REST_Server::CREATABLE,
                'callback' => [ $this, 'create_item' ],
                'args'     => [
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
     * Validate input arg
     *
     * @since WP_CONSOLE_SINCE
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
     * @since WP_CONSOLE_SINCE
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public function create_item( $request ) {
        global $wp_console_dump;

        $input = $request['input'];

        $config = new \Psy\Configuration( [
            'configDir' => WP_CONTENT_DIR,
        ] );

        $config->setColorMode( \Psy\Configuration::COLOR_MODE_DISABLED );

        $psysh = new Shell( $config );

        $output = new ShellOutput( ShellOutput::VERBOSITY_NORMAL, true );

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

        $data = [
            'output' => $output->outputMessage,
            'dump'   => $wp_console_dump
        ];

        return rest_ensure_response( $data );
    }
}
