<?php

namespace WPConsole\Traits;

use Exception;
use WPConsole\Exceptions\WPConsoleException;
use WP_Error;

trait RESTResponseError {

    /**
     * Send REST error response
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param \Exception $e
     * @param string     $default_message
     *
     * @return \WP_Error
     */
    protected function send_response_error( Exception $e, $default_message = '' ) {
        if ( $e instanceof WPConsoleException ) {
            return new WP_Error(
                $e->get_error_code(),
                $e->get_message(),
                [ 'status' => $e->get_status_code() ]
            );
        }

        $default_message = $default_message ? $default_message : __( 'Something went wrong', 'dokan-lite' );

        return new WP_Error(
            'something_went_wrong',
            $default_message,
            [ 'status' => 422 ]
        );
    }
}
