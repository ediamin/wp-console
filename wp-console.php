<?php
/**
 * Plugin Name: WP Console
 * Plugin URI: https://github.com/ediamin/wp-console
 * Description: An in-browser PHP console for WordPress powered by PsySH
 * Version: 2.4.0
 * Author: Edi Amin
 * Author URI: https://github.com/ediamin
 * Text Domain: wp-console
 * Domain Path: /languages/
 */

// Do not call the file directly.
defined( 'ABSPATH' ) || exit;

class_exists( 'WPConsole\WPConsole' ) || require_once __DIR__ . '/vendor/autoload.php';

if ( version_compare( PHP_VERSION, '8.0.0', '>=' ) ) {
    require_once __DIR__ . '/compat/php-8.0/nikic/php-parser/lib/PhpParser/NodeAbstract.php';
    require_once __DIR__ . '/compat/php-8.0/nikic/php-parser/lib/PhpParser/Comment.php';
    require_once __DIR__ . '/compat/php-8.0/psy/psysh/src/CodeCleaner/UseStatementPass.php';
    require_once __DIR__ . '/compat/php-8.0/psy/psysh/src/VarDumper/Dumper.php';
    require_once __DIR__ . '/compat/php-8.0/symfony/var-dumper/Cloner/Data.php';
    require_once __DIR__ . '/compat/php-8.0/symfony/var-dumper/Dumper/HtmlDumper.php';
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
