<?php
/**
 * Plugin Name: WP Console
 * Description: WordPress PHP Console
 * Version: WP_CONSOLE_SINCE
 * Text Domain: wp-console
 * Domain Path: /i18n/languages/
 */

// Do not call the file directly.
defined( 'ABSPATH' ) || exit;

class_exists( 'WPConsole\WPConsole' ) || require_once __DIR__ . '/vendor/autoload.php';

use WPConsole\WPConsole;

define( 'WP_CONSOLE_FILE', __FILE__ );
define( 'WP_CONSOLE_ABSPATH', dirname( WP_CONSOLE_FILE ) );

/**
 * Plugin main instance
 *
 * Returns the main instance of WPConsole to
 * prevent the need to use globals.
 *
 * @since  WP_CONSOLE_SINCE
 *
 * @return \WPConsole
 */
function wp_console() {
    return WPConsole::instance();
}

// Initialize plugin for the first time.
wp_console();
