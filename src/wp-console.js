/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * WordPress dependencies
 */
import { render, createRoot } from '@wordpress/element';
import { createHooks } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './store';
import './scss/main.scss';
import App from './App';

__webpack_public_path__ = `${ wpConsole.url.assests }/js/`; // eslint-disable-line camelcase, no-undef

wpConsole.hooks = createHooks();

$( document ).ready( function () {
    if ( ! $( '#wp-console' ).length ) {
        return;
    }

    const openConsoleWindow = () => {
        $( 'body' ).addClass( 'wp-console-active' );
        $( '#wp-console' ).addClass( 'active' );

        if ( $( '#wp-console' ).children().length ) {
            return;
        }

        // Newer versions of @wordpress/element use createRoot.
        if ( typeof createRoot === 'function' ) {
            const root = createRoot( document.getElementById( 'wp-console' ) );
            root.render( <App /> );
            return;
        }

        // Fallback for older versions of @wordpress/element.
        render( <App />, document.getElementById( 'wp-console' ) );
    };

    $( '.ab-item', '#wp-admin-bar-wp-console' ).on( 'click', ( e ) => {
        e.preventDefault();
        openConsoleWindow();
    } );

    $( '#adminmenu a[href="tools.php?page=wp-console"]' ).on(
        'click',
        ( e ) => {
            e.preventDefault();
            openConsoleWindow();
        }
    );
} );
