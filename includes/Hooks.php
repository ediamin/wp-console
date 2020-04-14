<?php

namespace WPConsole;

class Hooks {

    /**
     * Class constructor
     *
     * @since 2.1.0
     *
     * @return void
     */
    public function __construct() {
        add_filter( 'body_class', [ self::class, 'add_body_class' ] );
        add_filter( 'admin_body_class', [ self::class, 'add_body_class' ] );
    }

    /**
     * Add additional body classes
     *
     * @since 2.1.0
     *
     * @param array|string $classes array for frontend, string for backend
     *
     * @return array|string array for frontend, string for backend
     */
    public static function add_body_class( $classes ) {
        $additional_classes = [];

        if ( version_compare( get_bloginfo( 'version' ), '5.4', '<' ) ) {
            $additional_classes[] = 'wp-console-wp-lt-5-4'; // wp version less than 5.4
        }

        if ( is_admin() ) {
            $classes .= ' ' . implode( ' ', $additional_classes );
        } else {
            $classes = array_merge( $classes, $additional_classes );
        }

        return $classes;
    }
}
