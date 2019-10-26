/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Notice, Spinner, Tooltip, ButtonGroup, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CodeEditor from './CodeEditor';
import Output from './Output';
import Dump from './Dump';
import DebugLog from './DebugLog';
import { terminalIcon, bugIcon } from './Icons';

class App extends Component {
    state = {
        output: null,
        dump: null,
        errorMessage: null,
        errorTrace: null,
        showDebugLog: false,
        activePanel: null,
        isFetching: false,
    };

    componentDidMount() {
        $( '#wp-console' ).on( 'wp-console:open', () => {
            this.setState( {
                activePanel: 'console',
            } );
        } );
    }

    reset() {
        this.setState( {
            output: null,
            dump: null,
            errorMessage: null,
            errorTrace: null,
            showDebugLog: false,
        } );
    }

    onExecute = ( code ) => {
        code = code.replace( /^\<\?php/, '' ).trim();

        this.reset();

        this.setState( {
            isFetching: true,
        } );

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
        } ).then( () => {
            this.setState( {
                isFetching: false,
            } );
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

    codeEditor = () => {
        let content = null;

        if ( this.state.isFetching ) {
            content = (
                <div className="wp-console-spinner">
                    <Spinner />
                </div>
            );
        } else if ( ! ( this.state.output || this.state.dump || this.state.errorTrace ) ) {
            content = (
                <p className="empty-content">
                    <span>{ terminalIcon } { sprintf( __( 'press `%s` to run', 'wp-console' ), 'shift+enter' ) }</span>
                </p>
            );
        }

        return (
            <section>
                <CodeEditor onExecute={ this.onExecute } />
                <section id={ 'wp-console-outputs' }>
                    { this.stackTrace() }
                    { this.output() }
                    { this.dump() }
                    { content }
                </section>
            </section>
        );
    }

    showDebugLog = () => {
        this.setState( {
            showDebugLog: ! this.state.showDebugLog,
        } );
    }

    activatePanel = ( panel ) => {
        this.setState( {
            activePanel: panel,
        } );
    }

    render() {
        let notice;
        let activePanel = null;

        if ( this.state.errorMessage ) {
            notice = <Notice status="error" onRemove={ this.onDismiss }>{ this.state.errorMessage }</Notice>;
        }

        if ( this.state.activePanel === 'console' ) {
            activePanel = this.codeEditor();
        } else if ( this.state.activePanel === 'debug-log' ) {
            activePanel = <DebugLog />;
        }

        return (
            <section className="wp-console-inner">
                { notice }
                <header className="wp-console-header clearfix">
                    <h4 className="wp-console-title">{ __( 'WP Console', 'wp-console' ) }</h4>
                    <ul className="wp-console-header-buttons list-inline float-right">
                        <li className="list-inline-item panel-buttons">
                            <ButtonGroup>
                                <Tooltip text={ __( 'Console', 'wp-console' ) }>
                                    <Button isDefault isSmall className={ this.state.activePanel === 'console' ? 'active' : '' } onClick={ this.activatePanel.bind( this, 'console' ) }>
                                        { terminalIcon }
                                    </Button>
                                </Tooltip>

                                <Tooltip text={ __( 'Debug Log', 'wp-console' ) }>
                                    <Button isDefault isSmall className={ this.state.activePanel === 'debug-log' ? 'active' : '' } onClick={ this.activatePanel.bind( this, 'debug-log' ) }>
                                        { bugIcon }
                                    </Button>
                                </Tooltip>
                            </ButtonGroup>
                        </li>
                        <li className="list-inline-item">
                            <a href="#close-wp-console" className="close">&times;</a>
                        </li>
                    </ul>
                </header>

                { activePanel }
            </section>
        );
    }
}

export default App;
