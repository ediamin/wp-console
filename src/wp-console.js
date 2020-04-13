/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import { createHooks } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './store';
import './scss/main.scss';
import App from './App';

__webpack_public_path__ = `${ wpConsole.url.assests }/js/`; // eslint-disable-line camelcase, no-undef

wpConsole.hooks = createHooks();

$( document ).ready( function() {
    if ( ! $( '#wp-console' ).length ) {
        return;
    }

    $( '.ab-item', '#wp-admin-bar-wp-console' ).on( 'click', ( e ) => {
        e.preventDefault();
        $( 'body' ).addClass( 'wp-console-active' );
        $( '#wp-console' ).addClass( 'active' );

        if ( $( '#wp-console' ).children().length ) {
            return;
        }

        render( <App />, document.getElementById( 'wp-console' ) );
    } );
} );
