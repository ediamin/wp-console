<?php

namespace WPConsole;

use WPConsole\Traits\Singleton;

/**
 * Main plugin class
 *
 * @since 1.0.0
 */
final class WPConsole {

    use Singleton;

    /**
     * Plugin version.
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $version = '2.5.1';

    /**
     * Minimum PHP version required
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $min_php = '5.6.0';

    /**
     * Admin notice messages
     *
     * @since 1.0.0
     *
     * @var array
     */
    private $admin_notices = [];

    /**
     * Contains chainable class instance
     *
     * Can be called via wp_console()->controller_name->feature.
     *
     * @since 1.0.0
     *
     * @var object
     */
    private $controllers = null;

    /**
     * Contains REST controller class instances
     *
     * Can be called via wp_console()->controller_name->feature.
     *
     * @since 1.0.0
     *
     * @var object
     */
    public $rest_controllers = null;

    /**
     * Bootstrap the plugin
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function boot() {
        if ( ! $this->met_requirements() ) {
            add_action( 'admin_notices', [ $this, 'admin_notices' ] );
            return;
        }

        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Getter to call the controller classes
     *
     * @since 1.0.0
     *
     * @param string $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( isset( $this->controllers->$prop ) ) {
            return $this->controllers->$prop;
        }
    }

    /**
     * Validate plugin requirements
     *
     * @since 1.0.0
     *
     * @return bool
     */
    private function met_requirements() {
        if ( version_compare( PHP_VERSION, $this->min_php, '<' ) ) {
            $this->admin_notices['unmet_php_version'] = sprintf(
                '<strong>%s</strong> requires PHP version <strong>%s</strong> but you are using version <strong>%s</strong>',
                'WP Console',
                $this->min_php,
                PHP_VERSION
            );

            return false;
        }

        return true;
    }

    /**
     * Show admin notices
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function admin_notices() {
        foreach ( $this->admin_notices as $notice ) {
            printf( '<div class="error"><p>' . $notice . '</p></div>' );
        }
    }

    /**
     * Initialize plugin logics
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init_plugin() {
        /**
         * Fires right before plugin loads its logics
         *
         * @since 1.0.0
         */
        do_action( 'wp_console_before_init' );

        $this->define_constants();
        $this->load_core();
        $this->load_controllers();

        add_action( 'init', [ $this, 'load_plugin_textdomain' ] );
        add_action( 'rest_api_init', [ $this, 'load_rest_controllers' ] );

        /**
         * Fires after plugin finished loding its logics
         *
         * @since 1.0.0
         */
        do_action( 'wp_console_init' );
    }

    /**
     * Define plugin constants
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function define_constants() {
        define( 'WP_CONSOLE_VERSION', $this->version );
        define( 'WP_CONSOLE_INCLUDES', WP_CONSOLE_ABSPATH . '/includes' );
        define( 'WP_CONSOLE_URL', plugins_url( '', WP_CONSOLE_FILE ) );
        define( 'WP_CONSOLE_ASSETS', WP_CONSOLE_URL . '/assets' );
        define( 'WP_CONSOLE_VIEWS', WP_CONSOLE_ABSPATH . '/views' );
    }

    /**
     * Load plugin core
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function load_core() {
        new \WPConsole\Hooks();
        new \WPConsole\Scripts();
        new \WPConsole\AdminBar();
        new \WPConsole\Core\Console\Console();
        new \WPConsole\Core\DebugLog\DebugLog();
        new \WPConsole\Core\UserSettings\UserSettings();

        /**
         * Fires after finished loading the plugin core
         *
         * @since 1.0.0
         */
        do_action( 'wp_console_core_loaded' );
    }

    /**
     * Load plugin controllers
     *
     * These controllers are chainable and could be called
     * like wp_console()->controller_name->feature.
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function load_controllers() {
        /**
         * Add chainable controllers
         *
         * @since 1.0.0
         *
         * @var array
         */
        $this->controllers = apply_filters( 'wp_console_controllers', (object) [] );
    }

    /**
     * Load plugin textdomain
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function load_plugin_textdomain() {
        load_plugin_textdomain( 'wp-console', false, dirname( plugin_basename( WP_CONSOLE_FILE ) ) . '/languages/' );
    }

    /**
     * Load the REST API controllers
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function load_rest_controllers() {
        /**
         * WP Console REST API controllers
         *
         * @since 1.0.0
         */
        $this->rest_controllers = apply_filters( 'wp_console_rest_controllers', (object) [] );
    }
}
