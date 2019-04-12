<?php

namespace WPConsole;

use WPConsole\Traits\Singleton;

/**
 * Main plugin class
 *
 * @since WP_CONSOLE_SINCE
 */
final class WPConsole {

    use Singleton;

    /**
     * Plugin version.
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    public $version = 'WP_CONSOLE_SINCE';

    /**
     * DB version
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    public $db_version = 'WP_CONSOLE_SINCE';

    /**
     * Minimum PHP version required
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    public $min_php = '5.6.0';

    /**
     * Plugin text domain
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    public $text_domain = 'wp-console';

    /**
     * Admin notice messages
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var array
     */
    private $admin_notices = [];

    /**
     * Contains chainable class instance
     *
     * Can be called via wp_console()->controller_name->feature.
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var array
     */
    private $controllers = [];

    /**
     * Bootstrap the plugin
     *
     * @since WP_CONSOLE_SINCE
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
     * @since WP_CONSOLE_SINCE
     *
     * @param string $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( isset( $this->controllers[ $prop ] ) ) {
            return $this->controllers[ $prop ];
        }
    }

    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron, frontend or rest
     *
     * @return bool
     */
    public function is_request( $type ) {
        switch ( $type ) {
            case 'admin':
                $request = is_admin();
                break;

            case 'ajax':
                $request = defined( 'DOING_AJAX' );
                break;

            case 'cron':
                $request = defined( 'DOING_CRON' );
                break;

            case 'frontend':
                $request = ! is_admin() && ! defined( 'DOING_AJAX' ) && ! defined( 'DOING_CRON' );
                break;

            case 'rest':
                $request = defined( 'REST_REQUEST' );
                break;

            default:
                $request = false;
        }

        return $request;
    }

    /**
     * Validate plugin requirements
     *
     * @since WP_CONSOLE_SINCE
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
     * @since WP_CONSOLE_SINCE
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
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function init_plugin() {
        /**
         * Fires right before plugin loads its logics
         *
         * @since WP_CONSOLE_SINCE
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
         * @since WP_CONSOLE_SINCE
         */
        do_action( 'wp_console_init' );
    }

    /**
     * Define plugin constants
     *
     * @since WP_CONSOLE_SINCE
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
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    private function load_core() {
        new \WPConsole\Core\Console\Console();

        /**
         * Fires after finished loading the plugin core
         *
         * @since WP_CONSOLE_SINCE
         */
        do_action( 'wp_console_core_loaded' );
    }

    /**
     * Load plugin controllers
     *
     * These controllers are chainable and could be called
     * like wp_console()->controller_name->feature.
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    private function load_controllers() {
        /**
         * Add chainable controllers
         *
         * @since WP_CONSOLE_SINCE
         *
         * @var array
         */
        $this->controllers = apply_filters( 'wp_console_controllers', [] );
    }

    /**
     * Load plugin textdomain
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function load_plugin_textdomain() {
        load_plugin_textdomain( 'wp-console', false, dirname( plugin_basename( WP_CONSOLE_FILE ) ) . '/i18n/languages/' );
    }

    /**
     * Load the REST API controllers
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function load_rest_controllers() {
        /**
         * WP Console REST API controllers
         *
         * @since WP_CONSOLE_SINCE
         */
        apply_filters( 'wp_console_rest_controllers', [] );
    }
}
