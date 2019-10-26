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
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    protected $namespace = 'wp-console/v1';

    /**
     * Route name
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    protected $base = 'debug-log';

    /**
     * Class constructor
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function __construct() {
        $this->register_routes();
    }

    /**
     * Register REST routes
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->base, [
            [
                'methods'  => WP_REST_Server::READABLE,
                'callback' => [ $this, 'get_item' ],
            ],
        ] );
    }

    /**
     * Get debug log
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function get_item( $request ) {
        try {
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
                    sprintf( __( 'Log file: `%s` not found in your system.', 'wp-console' ), $log_file  )
                );
            }

            $debug_log = file_get_contents( $log_file );

            return rest_ensure_response( $debug_log );

        } catch ( Exception $e ) {
            return $this->send_response_error( $e, __( 'Something went wrong', 'wp-console' ) );
        }
    }
}
