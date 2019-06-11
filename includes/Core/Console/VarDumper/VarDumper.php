<?php

namespace WPConsole\Core\Console\VarDumper;

use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\CliDumper;
use Symfony\Component\VarDumper\Dumper\HtmlDumper;
use WPConsole\Core\Console\VarDumper\Dumper\WPConsoleDumper;

/**
 * Override version of \Symfony\Component\VarDumper\VarDumper
 *
 * The differences from original are,
 * i) if we have `HTTP_X_WP_CONSOLE` in HTTP headers then we set,
 * $dumper = WPConsoleDumper.
 * ii) Coding style
 */
class VarDumper {

    /**
     * Dumper handler
     *
     * @since 1.0.0
     *
     * @var object
     */
    private static $handler;

    /**
     * Dump variable
     *
     * @since 1.0.0
     *
     * @param mixed $var
     *
     * @return mixed
     */
    public static function dump( $var ) {
        if ( null === self::$handler ) {
            $cloner = new VarCloner();

            // Send `X-WP-Console` HTTP request header from REST API request
            if ( isset( $_SERVER['HTTP_X_WP_CONSOLE'] ) ) {
                $dumper = new WPConsoleDumper();
            } else if ( isset( $_SERVER['VAR_DUMPER_FORMAT'] ) ) {
                $dumper = 'html' === $_SERVER['VAR_DUMPER_FORMAT'] ? new HtmlDumper() : new CliDumper();
            } else {
                $dumper = \in_array( \PHP_SAPI, ['cli', 'phpdbg'] ) ? new CliDumper() : new HtmlDumper();
            }

            self::$handler = function ( $var ) use ( $cloner, $dumper ) {
                $dumper->dump( $cloner->cloneVar( $var ) );
            };
        }

        return ( self::$handler )( $var );
    }

    /**
     * Set dump handler
     *
     * @since 1.0.0
     *
     * @param callable|null $callable
     *
     * @return object
     */
    public static function setHandler( callable $callable = null ) {
        $prevHandler   = self::$handler;
        self::$handler = $callable;

        return $prevHandler;
    }
}
