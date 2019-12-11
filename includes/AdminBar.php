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
     * Add footer
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function add_footer() {
        echo '<div id="wp-console"></div>';
    }
}
