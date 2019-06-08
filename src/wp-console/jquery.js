/**
 * External dependencies
 */
import $ from 'jquery';

$( '.ab-item', '#wp-admin-bar-wp-console' ).on( 'click', ( e ) => {
    e.preventDefault();
    $( '#wp-console' ).addClass( 'active' );
} );

$( 'body' ).on( 'click', '#wp-console .close', ( e ) => {
    e.preventDefault();
    $( '#wp-console' ).removeClass( 'active' );
} );
