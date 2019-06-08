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

render(
    <App />,
    document.getElementById( 'wp-console' )
);
