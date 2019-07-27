/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CodeEditor from './CodeEditor';
import Output from './Output';
import Dump from './Dump';

class App extends Component {
    state = {
        output: null,
        dump: null,
        errorMessage: null,
        errorTrace: null,
    };

    reset() {
        this.setState( {
            output: null,
            dump: null,
            errorMessage: null,
            errorTrace: null,
        } );
    }

    onExecute = ( code ) => {
        code = code.replace( /^\<\?php/, '' ).trim();

        this.reset();

        apiFetch( {
            path: '/wp-console/v1/console',
            method: 'POST',
            data: {
                input: code,
            },
            headers: {
                'X-WP-Console': true,
            },
        } ).then( ( response ) => {
            if ( response.output ) {
                this.setState( {
                    output: response.output,
                } );
            }

            if ( response.dump ) {
                this.setState( {
                    dump: response.dump,
                } );
            }
        } ).catch( ( response ) => {
            if ( response.message ) {
                this.setState( {
                    errorMessage: response.message,
                } );
            }

            if ( response.data && response.data.trace ) {
                this.setState( {
                    errorTrace: response.data.trace,
                } );
            }
        } );
    }

    output() {
        return !! this.state.output ? ( <Output output={ this.state.output } hasDump={ !! this.state.dump } /> ) : null;
    }

    dump() {
        return !! this.state.dump ? ( <Dump dump={ this.state.dump } /> ) : null;
    }

    stackTrace() {
        return !! this.state.errorTrace ? (
            <div className="error-stacktrace">
                <h3>{ __( 'Error Traceback', 'wp-console' ) }</h3>
                <pre>{ this.state.errorTrace }</pre>
            </div>
        ) : null;
    }

    onDismiss = () => {
        this.setState( {
            errorMessage: false,
        } );
    }

    render() {
        let notice;

        if ( this.state.errorMessage ) {
            notice = <Notice status="error" onRemove={ this.onDismiss }>{ this.state.errorMessage }</Notice>;
        }

        return (
            <section className="wp-console-inner">
                { notice }
                <header className="wp-console-header clearfix">
                    <h4 className="wp-console-title">{ __( 'WP Console', 'wp-console' ) }</h4>
                    <ul className="wp-console-header-buttons list-inline float-right">
                        <li className="list-inline-item keyboard-shortcut">
                            { sprintf( __( 'press `%s` to run', 'wp-console' ), 'shift+enter' ) }
                        </li>
                        <li className="list-inline-item">
                            <a href="#close-wp-console" className="close">&times;</a>
                        </li>
                    </ul>
                </header>
                <CodeEditor onExecute={ this.onExecute } />
                <section id={ 'wp-console-outputs' }>
                    { this.stackTrace() }
                    { this.output() }
                    { this.dump() }
                </section>
            </section>
        );
    }
}

export default App;
