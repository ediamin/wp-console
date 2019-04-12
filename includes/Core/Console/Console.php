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
}
