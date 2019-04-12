<?php

namespace WPConsole\Core\Console;

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
        $input = $request['input'];

        return [];
    }
}
