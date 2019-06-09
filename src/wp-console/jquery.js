/**
 * External dependencies
 */
import $ from 'jquery';

$( document ).ready( function() {
    $( '.ab-item', '#wp-admin-bar-wp-console' ).on( 'click', ( e ) => {
        e.preventDefault();
        $( '#wp-console' ).addClass( 'active' ).trigger( 'wp-console:open' );
    } );

    $( 'body' ).on( 'click', '#wp-console .close', ( e ) => {
        e.preventDefault();
        $( '#wp-console' ).removeClass( 'active' ).trigger( 'wp-console:closed' );
    } );
} );
