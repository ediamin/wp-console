<?php
/**
 * Plugin Name: WP Console
 * Plugin URI: https://github.com/ediamin/wp-console
 * Description: An in-browser PHP console for WordPress powered by PsySH
 * Version: 2.6.0
 * Author: Edi Amin
 * Author URI: https://github.com/ediamin
 * Text Domain: wp-console
 * Domain Path: /languages/
 */

// Do not call the file directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'WPConsole\WPConsole' ) ) {
    // Supported PHP versions depend on the supported PHP version by PsySH.
    $version = 'php-7.4';
    if ( version_compare( PHP_VERSION, '8.4', '>=' ) ) {
        $version = 'php-8.4';
    } elseif ( version_compare( PHP_VERSION, '8.0', '>=' ) ) {
        $version = 'php-8.0';
    }

    require_once __DIR__ . '/lib/' . $version . '/vendor/autoload.php';
}

use WPConsole\Core\Console\VarDumper\VarDumper;
use WPConsole\WPConsole;

define( 'WP_CONSOLE_FILE', __FILE__ );
define( 'WP_CONSOLE_ABSPATH', dirname( WP_CONSOLE_FILE ) );

/**
 * An override version of Symfony's dump function
 *
 * @since 1.0.0
 *
 * @param mixed $var
 * @param mixed $moreVars
 *
 * @return mixed
 */
function _dump( $var, ...$moreVars ) {
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
 * @since  1.0.0
 *
 * @return \WPConsole
 */
function wp_console() {
    return WPConsole::instance();
}

// Initialize plugin for the first time.
wp_console();
