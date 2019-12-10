<?php

namespace WPConsole\Core\DebugLog;

use Exception;
use WPConsole\Exceptions\WPConsoleException;
use WPConsole\Traits\RESTResponseError;
use WP_REST_Controller;
use WP_REST_Server;

class RestController extends WP_REST_Controller {

    use RESTResponseError;

    /**
     * Endpoint namespace
     *
     * @since 1.3.0
     *
     * @var string
     */
    protected $namespace = 'wp-console/v1';

    /**
     * Route name
     *
     * @since 1.3.0
     *
     * @var string
     */
    protected $base = 'debug-log';

    /**
     * Class constructor
     *
     * @since 1.3.0
     *
     * @return void
     */
    public function __construct() {
        $this->register_routes();
    }

    /**
     * Register REST routes
     *
     * @since 1.3.0
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->base, [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_item' ],
                'permission_callback' => [ $this, 'can_manage_options' ],
            ],
            [
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => [ $this, 'delete_item' ],
                'permission_callback' => [ $this, 'can_manage_options' ],
            ],
        ] );
    }

    /**
     * Check if current user has manage_options capability
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param \WP_REST_Request $request
     *
     * @return bool
     */
    public function can_manage_options( $request ) {
        return current_user_can( 'manage_options' );
    }

    protected function get_log_file() {
        if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
            throw new WPConsoleException( 'wp_console_rest_error', __( '`WP_DEBUG` is required to be set true in wp-config.php', 'wp-console' ) );
        }

        if ( ! defined( 'WP_DEBUG_LOG' ) || ! WP_DEBUG_LOG ) {
            throw new WPConsoleException( 'wp_console_rest_error', __( '`WP_DEBUG_LOG` is required to be set true in wp-config.php', 'wp-console' ) );
        }

        $log_file = ini_get( 'error_log' );

        if ( ! $log_file ) {
            throw new WPConsoleException( 'wp_console_rest_error', __( 'Error log file not found in ini_get( "error_log" )', 'wp-console' ) );
        }

        if ( ! file_exists( $log_file ) ) {
            throw new WPConsoleException(
                'wp_console_rest_error',
                /* translators: %s: log file */
                sprintf( __( 'Log file: `%s` not found in your system.', 'wp-console' ), $log_file  )
            );
        }

        return $log_file;
    }

    /**
     * Get debug log
     *
     * @since 1.3.0
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function get_item( $request ) {
        try {
            $log_file = $this->get_log_file();

            $debug_log = file_get_contents( $log_file );

            $response = rest_ensure_response( $debug_log );

            $extra_info = json_encode( [
                'php_version'  => PHP_VERSION,
                'current_time' => current_time( 'mysql' ),
                'timezone'     => $this->wp_timezone_string(),
            ] );

            $response->header( 'X-WP-Console-Debug-Log-Extra-Info', $extra_info );

            return $response;

        } catch ( Exception $e ) {
            return $this->send_response_error( $e, __( 'Something went wrong', 'wp-console' ) );
        }
    }

    /**
     * Erase/Clear debug.log
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function delete_item( $request ) {
        try {
            $log_file = $this->get_log_file();

            file_put_contents( $log_file, '' );

            $debug_log = file_get_contents( $log_file );

            return rest_ensure_response( $debug_log );

        } catch ( Exception $e ) {
            return $this->send_response_error( $e, __( 'Something went wrong', 'wp-console' ) );
        }
    }

    /**
     * Retrieves the timezone from site settings as a string.
     *
     * Copied from `wp-includes/functions.php` to give support
     * WordPress older than Version 5.3.
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return string PHP timezone string or a ±HH:MM offset.
     */
    protected function wp_timezone_string() {
        global $wp_version;

        if ( function_exists( 'wp_timezone_string' ) ) {
            return wp_timezone_string();
        }

        $timezone_string = get_option( 'timezone_string' );

        if ( $timezone_string ) {
            return $timezone_string;
        }

        $offset  = (float) get_option( 'gmt_offset' );
        $hours   = (int) $offset;
        $minutes = ( $offset - $hours );

        $sign      = ( $offset < 0 ) ? '-' : '+';
        $abs_hour  = abs( $hours );
        $abs_mins  = abs( $minutes * 60 );
        $tz_offset = sprintf( '%s%02d:%02d', $sign, $abs_hour, $abs_mins );

        return $tz_offset;
    }
}
