<?php

namespace WPConsole\Core\Console\VarDumper\Dumper;

use Symfony\Component\VarDumper\Dumper\HtmlDumper;

/**
 * Capture all dumps into global $wp_console_dump
 */
class WPConsoleDumper extends HtmlDumper {

    /**
     * Echo output line
     *
     * @since 1.0.0
     *
     * @param string $line
     * @param int    $depth
     * @param int    $indentPad
     *
     * @return void
     */
    protected function echoLine(string $line, int $depth, string $indentPad): void {
        global $wp_console_dump;

        if ( -1 !== $depth ) {
            $wp_console_dump .= str_repeat( $indentPad, $depth ) . $line . "\n";
        }
    }

    /**
     * Dumps the HTML header
     *
     * Override to remove JS and CSS from REST response
     *
     * @since 2.0.0
     *
     * @return void
     */
    protected function getDumpHeader(): string {
        return '';
    }
}
