<?php

namespace WPConsole\Core\UserSettings;

class Controller {

    /**
     * Settings schema
     *
     * @since 2.0.0
     *
     * @return array
     */
    public function get_settings_schema() {
        return apply_filters( 'wp_console_user_settings_schema', [] );
    }

    /**
     * Get user settings
     *
     * @since 2.0.0
     *
     * @param int $user_id
     *
     * @return array
     */
    public function get( $user_id ) {
        $user_settings  = [];
        $saved_settings = get_user_option( 'wp_console_user_settings', $user_id );
        $saved_settings = is_array( $saved_settings ) ? $saved_settings : [];

        $settings_schema = $this->get_settings_schema();

        foreach ( $settings_schema as $section => $section_props ) {
            $options = $section_props['properties'];

            foreach ( $options as $option => $schema_value ) {
                $value = $schema_value['default'];

                if ( isset( $saved_settings[ $section ][ $option ] ) ) {
                    $value = $saved_settings[ $section ][ $option ];
                }

                $user_settings[ $section ][ $option ] = $value;
            }
        }

        return $user_settings;
    }

    /**
     * Save user settings
     *
     * @since 2.0.0
     *
     * @param int $user_id
     * @param array $settings
     *
     * @return array
     */
    public function save( $user_id, $settings ) {
        $updated_settings = [];
        $current_settings = wp_console()->user_settings->get( $user_id );

        foreach ( $current_settings as $section => $options ) {
            foreach ( $options as $option => $value) {
                $updated_settings[ $section ][ $option ]
                    = isset( $settings[ $section ][ $option ] )
                    ? $settings[ $section ][ $option ]
                    : $value;
            }
        }

        update_user_option( $user_id, 'wp_console_user_settings', $updated_settings );

        return $updated_settings;
    }
}
