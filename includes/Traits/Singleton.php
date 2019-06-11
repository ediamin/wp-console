<?php

namespace WPConsole\Traits;

/**
 * Singleton Trait
 *
 * @since 1.0.0
 */
trait Singleton {

    /**
     * Singleton class instance holder
     *
     * @since 1.0.0
     *
     * @var object
     */
    private static $instance;

    /**
     * Make a class instance
     *
     * @since 1.0.0
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
