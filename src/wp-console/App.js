/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CodeEditor from './CodeEditor';
import Output from './Output';

class App extends Component {
    state = {
        output: null,
        errorMessage: null,
    };

    reset() {
        this.setState( {
            output: null,
            errorMessage: null,
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
        } ).then( ( response ) => {
            if ( response.output ) {
                this.setState( {
                    output: response.output,
                } );
            }
        } ).catch( ( response ) => {
            if ( response.message ) {
                this.setState( {
                    errorMessage: response.message,
                } );
            }
        } );
    }

    output() {
        return !! this.state.output ? ( <Output output={ this.state.output } /> ) : null;
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
                    <h4 className="wp-console-title">{ __( 'Dashboard', 'wp-console' ) }</h4>
                    <ul className="wp-console-header-buttons list-inline float-right">
                        <li className="list-inline-item">
                            <a href="#close-wp-console" className="close">&times;</a>
                        </li>
                    </ul>
                </header>
                <CodeEditor onExecute={ this.onExecute } />
                <section id={ 'wp-console-outputs' }>
                    { this.output() }
                </section>
            </section>
        );
    }
}

export default App;
