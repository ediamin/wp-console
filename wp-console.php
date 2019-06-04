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

use WPConsole\Core\Console\VarDumper\VarDumper;
use WPConsole\WPConsole;

define( 'WP_CONSOLE_FILE', __FILE__ );
define( 'WP_CONSOLE_ABSPATH', dirname( WP_CONSOLE_FILE ) );

/**
 * An override version of Symfony's dump function
 *
 * @since WP_CONSOLE_SINCE
 *
 * @param mixed $var
 * @param mixed $moreVars
 *
 * @return mixed
 */
function dump( $var, ...$moreVars ) {
    VarDumper::dump($var);

    foreach ( $moreVars as $v ) {
        VarDumper::dump( $v );
    }

    if ( 1 < func_num_args() ) {
        return func_get_args();
    }

    return $var;
}

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
