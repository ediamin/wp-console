<?php

namespace WPConsole\Core\Console;

class Console {

    /**
     * Class constructor
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function __construct() {
        add_action( 'wp_console_controllers', [ $this, 'add_controller' ] );
        add_action( 'wp_console_rest_controllers', [ $this, 'add_rest_controller' ] );

        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        } else {
            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        }
    }

    /**
     * Add chainable controller
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param array $controllers
     *
     * @return void
     */
    public function add_controller( $controllers ) {
        $controllers['console'] = new Controller();
        return $controllers;
    }

    /**
     * Add REST controller
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param array $controllers
     *
     * @return void
     */
    public function add_rest_controller( $controllers ) {
        $controllers['console'] = new RestController();
        return $controllers;
    }

    /**
     * Enqueue console scripts
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_enqueue_style( 'wp-console', WP_CONSOLE_ASSETS . '/css/wp-console.css', [], WP_CONSOLE_VERSION );
        wp_enqueue_script( 'wp-console', WP_CONSOLE_ASSETS . '/js/wp-console.js', [ 'jquery', 'wp-api-fetch' ], WP_CONSOLE_VERSION, true );

        $data = [
            'rest' => [
                'root'      => untrailingslashit( get_rest_url() ),
                'nonce'     => wp_create_nonce( 'wp_rest' ),
                'namespace' => 'wp-console/v1',
            ],
        ];

        wp_localize_script( 'wp-console', 'WPConsole', $data );
    }
}
