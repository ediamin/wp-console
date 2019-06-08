/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CodeEditor from './CodeEditor';

class App extends Component {
    onExecute( code ) {
        code = code.replace( /^\<\?php/, '' ).trim();
        console.log( code );
    }

    render() {
        return (
            <section className="wp-console-inner">
                <header className="wp-console-header clearfix">
                    <h4 className="wp-console-title">{ __( 'Dashboard', 'wp-console' ) }</h4>
                    <ul className="wp-console-header-buttons list-inline float-right">
                        <li className="list-inline-item">
                            <a href="#close-wp-console" className="close">&times;</a>
                        </li>
                    </ul>
                </header>
                <CodeEditor onExecute={ this.onExecute } />
            </section>
        );
    }
}

export default App;
