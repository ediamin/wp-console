<?php

namespace WPConsole\Traits;

/**
 * Singleton Trait
 *
 * @since WP_CONSOLE_SINCE
 */
trait Singleton {

    /**
     * Singleton class instance holder
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var object
     */
    private static $instance;

    /**
     * Make a class instance
     *
     * @since WP_CONSOLE_SINCE
     *
     * @return object
     */
    public static function instance() {
        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof self ) ) {
            self::$instance = new self();

            if ( method_exists( self::$instance, 'boot' ) ) {
                self::$instance->boot();
            }
        }

        return self::$instance;
    }
}
