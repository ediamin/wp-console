<?php

namespace WPConsole;

class AdminBar {

    /**
     * Class constructor
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function __construct() {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        add_action( 'wp_before_admin_bar_render', [ $this, 'add_admin_bar_quick_link' ] );
        add_action( 'admin_menu', [ $this, 'add_admin_tools_submenu' ] );

        add_action( 'wp_after_admin_bar_render', [ $this, 'add_footer' ] );
    }

    /**
     * Add admin bar quick link
     *
     * @since 1.0.0
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
     * Add an admin submenu item under tools menu.
     *
     * Admin who are unable to open WP Console window
     * using admin bar menu, can use this submenu.
     * @see: https://wordpress.org/support/topic/feature-request-dedicated-page-instead-of-pop-up/
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function add_admin_tools_submenu() {
        add_submenu_page(
            'tools.php',
            __( 'WP Console', 'wp-console' ),
            __( 'WP Console', 'wp-console' ),
            'manage_options',
            'wp-console',
            [ $this, 'add_admin_page' ]
        );
    }

    /**
     * Add footer
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function add_footer() {
        echo '<div id="wp-console"></div>';
    }

    /**
     * Add submenu page under tools admin menu.
     *
     * This is just a dummy page and JS will prevent
     * opening it.
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function add_admin_page() {
        esc_html_e( 'WP Console', 'wp-console' );
    }
}
