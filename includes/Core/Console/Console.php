<?php

namespace WPConsole\Core\Console;

class Console {

    /**
     * Class constructor
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function __construct() {
        add_filter( 'wp_console_rest_controllers', [ $this, 'add_rest_controller' ] );
        add_filter( 'wp_console_user_settings_schema', [ $this, 'add_user_settings_schema' ] );
    }

    /**
     * Add REST controller
     *
     * @since 1.0.0
     *
     * @param array $controllers
     *
     * @return void
     */
    public function add_rest_controller( $controllers ) {
        $controllers->console = new RestController();
        return $controllers;
    }

    /**
     * Add user settings schema
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param array $settings
     *
     * @return array
     */
    public function add_user_settings_schema( $schema ) {
        $schema['console'] = [
            'description' => __( 'User settings for Console panel', 'wp-console' ),
            'type'        => 'object',
            'context'     => [ 'view', 'edit' ],
            'properties'  => [
                'window_split' => [
                    'description' => __( 'Console panel window split type', 'wp-console' ),
                    'type'        => 'string',
                    'enum'        => [ 'horizontal', 'vertical' ],
                    'default'     => 'horizontal',
                    'context'     => [ 'view', 'edit' ],
                ],
            ],
        ];
        return $schema;
    }
}
