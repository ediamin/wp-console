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
        add_action( 'init', [ $this, 'register_scripts' ] );
        add_action( 'init', [ $this, 'load_translation' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        add_action( 'wp_before_admin_bar_render', [ $this, 'add_admin_bar_quick_link' ] );
        add_action( 'admin_footer', [ $this, 'add_footer' ] );
        add_action( 'wp_footer', [ $this, 'add_footer' ] );
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
     * Register scripts
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function register_scripts() {
        wp_register_style( 'wp-console', WP_CONSOLE_ASSETS . '/css/wp-console.css', [], WP_CONSOLE_VERSION );

        $deps_file = WP_CONSOLE_ABSPATH . '/assets/js/wp-console.deps.json';
        $deps      = file_exists( $deps_file ) ? json_decode( file_get_contents( $deps_file ) ) : [];
        wp_register_script( 'wp-console', WP_CONSOLE_ASSETS . '/js/wp-console.js', $deps, WP_CONSOLE_VERSION, true );
    }

    /**
     * Enqueue console scripts
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_enqueue_style( 'wp-console' );

        wp_enqueue_script( 'wp-console' );
        wp_enqueue_code_editor( [
            'type' => 'php',
        ] );

        $data = [
            'rest' => [
                'root'      => untrailingslashit( get_rest_url() ),
                'nonce'     => wp_create_nonce( 'wp_rest' ),
                'namespace' => 'wp-console/v1',
            ],
        ];

        wp_localize_script( 'wp-console', 'WPConsole', $data );
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

    public function load_translation() {
        wp_set_script_translations( 'wp-console', 'wp-console', plugin_dir_path( WP_CONSOLE_FILE ) . 'languages' );
    }
}
