<?php

namespace WPConsole\Core\Console;

class Scripts {

    /**
     * Class constructor
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function __construct() {
        add_action( 'init', [ $this, 'register_scripts' ] );
        add_action( 'init', [ $this, 'load_translation' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    /**
     * Register scripts
     *
     * @since 1.0.0
     * @since WP_CONSOLE_SINCE Add codemirror closebrackets, matchbrackets addon scripts
     *
     * @return void
     */
    public function register_scripts() {
        wp_register_style( 'wp-console', WP_CONSOLE_ASSETS . '/css/wp-console.css', [], WP_CONSOLE_VERSION );

        $deps_file = WP_CONSOLE_ABSPATH . '/assets/js/wp-console.deps.json';
        $deps      = file_exists( $deps_file ) ? json_decode( file_get_contents( $deps_file ) ) : [];

        wp_register_script( 'code-editor-addon-closebrackets', WP_CONSOLE_ASSETS . '/vendor/codemirror/addon/edit/closebrackets.js', [ 'code-editor' ], '5.48.0', true );
        wp_register_script( 'code-editor-addon-matchbrackets', WP_CONSOLE_ASSETS . '/vendor/codemirror/addon/edit/matchbrackets.js', [ 'code-editor' ], '5.48.0', true );

        $deps = array_merge( $deps, [
            'code-editor-addon-closebrackets',
            'code-editor-addon-matchbrackets',
        ] );

        wp_register_script( 'wp-console', WP_CONSOLE_ASSETS . '/js/wp-console.js', $deps, WP_CONSOLE_VERSION, true );
    }

    /**
     * Load translations for JavaScript
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function load_translation() {
        wp_set_script_translations( 'wp-console', 'wp-console', plugin_dir_path( WP_CONSOLE_FILE ) . 'languages' );
    }

    /**
     * Enqueue console scripts
     *
     * @since 1.0.0
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
}
