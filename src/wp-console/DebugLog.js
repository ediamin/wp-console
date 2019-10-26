/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { Notice, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { bugIcon } from './Icons';

class DebugLog extends Component {
    state = {
        isFetching: false,
        debugLog: null,
        errorMessage: null,
    };

    componentDidMount() {
        this.setState( {
            isFetching: true,
        } );

        this.fetchLog();
    }

    fetchLog = () => {
        apiFetch( {
            path: '/wp-console/v1/debug-log',
            method: 'GET',
            headers: {
                'X-WP-Console': true,
            },
        } ).then( ( response ) => {
            this.setState( {
                debugLog: response,
            } );
        } ).catch( ( response ) => {
            if ( response.message ) {
                this.setState( {
                    errorMessage: response.message,
                } );
            }
        } ).then( () => {
            this.setState( {
                isFetching: false,
            } );
        } );
    }

    onDismiss = () => {
        this.setState( {
            errorMessage: null,
        } );
    }

    render() {
        let notice;
        let content;

        if ( this.state.errorMessage ) {
            notice = <Notice status="error" onRemove={ this.onDismiss }>{ this.state.errorMessage }</Notice>;
        }

        if ( this.state.isFetching ) {
            content = (
                <div className="wp-console-spinner">
                    <Spinner />
                    { __( 'Loading debug.log', 'wp-console' ) }...
                </div>
            );
        } else if ( this.state.debugLog ) {
            content = <pre>{ this.state.debugLog }</pre>;
        } else {
            content = (
                <p className="empty-content">
                    <span>{ bugIcon } { __( 'Your debug.log is empty', 'wp-console' ) }</span>
                </p>
            );
        }

        return (
            <div id={ 'wp-console-debug-log' }>
                { notice }
                { content }
            </div>
        );
    }
}

export default DebugLog;
