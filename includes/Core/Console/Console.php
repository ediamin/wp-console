<?php

namespace WPConsole\Core\Console;

use WPConsole\Core\Console\Scripts;

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
        add_action( 'wp_before_admin_bar_render', [ $this, 'add_admin_bar_quick_link' ] );
        add_action( 'wp_after_admin_bar_render', [ $this, 'add_footer' ] );

        new Scripts();
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
     * Add admin bar quick link
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function add_admin_bar_quick_link() {
        global $wp_admin_bar;

        $wp_admin_bar->add_menu( array(
            'id'     => 'wp-console',
            'parent' => 'top-secondary',
            'title'  => __( 'Console', 'wp-console' ),
        ) );
    }

    /**
     * Add footer
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function add_footer() {
        echo '<div id="wp-console"></div>';
    }
}
