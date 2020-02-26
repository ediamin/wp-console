/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './scss/main.scss';
import { store as globalStore } from '.@/global-store';
import { store as consoleStore } from '.@/Console/store';
import { store as debugLogStore } from '.@/DebugLog/store';
import App from './App';

registerStore( 'wp-console/global', globalStore );
registerStore( 'wp-console/console', consoleStore );
registerStore( 'wp-console/debug-log', debugLogStore );

__webpack_public_path__ = `${ wpConsole.url.assests }/js/`; // eslint-disable-line camelcase, no-undef

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

        render(
            <App />,
            document.getElementById( 'wp-console' )
        );
    } );
} );
