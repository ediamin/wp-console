<?php

namespace WPConsole;

class Scripts {

    /**
     * Class constructor
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function __construct() {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        add_action( 'init', [ $this, 'register_scripts' ] );
        add_action( 'init', [ $this, 'load_translation' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    /**
     * Register scripts
     *
     * @since 1.0.0
     * @since 1.2.0 Add codemirror closebrackets, matchbrackets addon scripts
     * @since 2.0.0 Remove codemirror and add AceEditor.
     *
     * @return void
     */
    public function register_scripts() {
        $assets       = require_once WP_CONSOLE_ABSPATH . '/assets/js/wp-console.asset.php';
        $dependencies = array_merge( $assets['dependencies'], [
            'wp-console-ace-editor-lang',
        ] );

        wp_register_style( 'wp-console', WP_CONSOLE_ASSETS . '/css/wp-console.css', [ 'wp-components' ], $assets['version'] );
        wp_register_script( 'wp-console-ace-editor', WP_CONSOLE_ASSETS . '/vendor/ace-builds/src-min-noconflict/ace.js', [], '1.8.1', true );
        wp_register_script( 'wp-console-ace-editor-lang', WP_CONSOLE_ASSETS . '/vendor/ace-builds/src-min-noconflict/ext-language_tools.js', [ 'wp-console-ace-editor' ], '1.8.1', true );
        wp_register_script( 'wp-console', WP_CONSOLE_ASSETS . '/js/wp-console.js', $dependencies, $assets['version'], true );
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
     * @since 2.0.0 remove `rest`, add `url` and `user_settings` data
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_enqueue_style( 'wp-console' );
        wp_enqueue_script( 'wp-console' );

        $user_settings = wp_console()->user_settings->get( get_current_user_id() );

        $data = [
            'url' => [
                'assests' => WP_CONSOLE_ASSETS,
            ],
            'user_settings' => $user_settings,
            'php_version'   => PHP_VERSION,
            'wp_version'    => [
                'gte_5_8' => version_compare( get_bloginfo( 'version' ), '5.8', '>=' ),
            ],
        ];

        wp_localize_script( 'wp-console', 'wpConsole', $data );
    }
}
