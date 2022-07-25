<?php

namespace WPConsole\Core\UserSettings;

use Exception;
use WPConsole\Traits\RESTResponseError;
use WP_REST_Controller;
use WP_REST_Server;

class RestController extends WP_REST_Controller {

    use RESTResponseError;

    /**
     * Endpoint namespace
     *
     * @since 2.0.0
     *
     * @var string
     */
    protected $namespace = 'wp-console/v1';

    /**
     * Route name
     *
     * @since 2.0.0
     *
     * @var string
     */
    protected $base = 'user-settings';

    /**
     * Class constructor
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function __construct() {
        $this->register_routes();
    }

    /**
     * Register REST routes
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->base, [
            [
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => [ $this, 'update_item' ],
                'permission_callback' => [ $this, 'can_manage_options' ],
                'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ),
            ],

            'schema' => [ $this, 'get_public_item_schema' ],
        ] );
    }

    /**
     * Check if current user has manage_options capability
     *
     * @since 2.0.0
     *
     * @return bool
     */
    public function can_manage_options() {
        return current_user_can( 'manage_options' );
    }

    /**
     * Update user settings
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function update_item( $request ) {
        try {
            $user_id  = get_current_user_id();
            $settings = wp_console()->user_settings->save( $user_id, $request->get_params() );

            return rest_ensure_response( $settings );

        } catch ( Exception $e ) {
            return $this->send_response_error( $e );
        }
    }

    /**
     * Endpoint schema
     *
     * @since 2.0.0
     *
     * @return array
     */
    public function get_item_schema() {
        $schema = [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'wp-console-user-settings',
            'type'       => 'object',
            'properties' => wp_console()->user_settings->get_settings_schema(),
        ];

        return $schema;
    }
}
