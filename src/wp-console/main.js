/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './scss/main.scss';

render(
    <section className="wp-console-inner">
        <header className="wp-console-header clearfix">
            <span className="wp-console-title">WP Console</span>
            <ul className="wp-console-header-buttons float-right">
                <li>
                    <a href="#close-wp-console" className="close">&times;</a>
                </li>
            </ul>
        </header>
    </section>,
    document.getElementById( 'wp-console' )
);

$( '.ab-item', '#wp-admin-bar-wp-console' ).on( 'click', ( e ) => {
    e.preventDefault();
    $( '#wp-console' ).addClass( 'active' );
} );
