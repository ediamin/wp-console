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
import './jquery';
import App from './App';

$( document ).ready( function() {
    render(
        <App />,
        document.getElementById( 'wp-console' )
    );
} );
