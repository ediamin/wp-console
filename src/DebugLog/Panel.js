/**
 * WordPress dependencies
 */
import { Fragment, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import withSelectDispatch from '../store/with-select-dispatch';
import fetchLog from './fetchLog';
import { IconBug } from '.@/Icons';

const Panel = ( props ) => {
    const { fetchingLog, clearingLog, log, extraInfo } = props;

    useEffect( () => {
        fetchLog( props );
    }, [] );

    return (
        <div id="wp-console-panel-debug-log">
            {
                ( fetchingLog || clearingLog ) ? (
                    <div className="wp-console-spinner">
                        <Spinner />
                        {
                            fetchingLog ?
                                sprintf( __( 'Fetching %s', 'wp-console' ), 'debug.log' ) :
                                sprintf( __( 'Clearing %s', 'wp-console' ), 'debug.log' )
                        }...
                    </div>
                ) : (
                    <Fragment>
                        { log ? (
                            <Fragment>
                                {
                                    ( log === 'API_ERROR' ) ? (
                                        <pre />
                                    ) : (
                                        <pre>{ log }</pre>
                                    )
                                }
                            </Fragment>
                        ) : (
                            <p className="empty-content">
                                <span><IconBug /> { __( 'Your debug.log is empty', 'wp-console' ) }</span>
                            </p>
                        )
                        }
                    </Fragment>
                )
            }

            {
                extraInfo.php_version && (
                    <div className="extra-info">
                        { __( 'CURRENT TIME', 'wp-console' ) }: { extraInfo.current_time } { extraInfo.timezone }
                        <span className="wp-console-separator"></span>
                        { __( 'PHP VERSION', 'wp-console' ) }: { extraInfo.php_version }
                    </div>
                )
            }
        </div>
    );
};

export default withSelectDispatch( {
    select: [
        'fetchingLog',
        'clearingLog',
        'log',
        'extraInfo',
    ],

    dispatch: [
        'setNotice',
        'startFetchingLog',
        'finishFetchingLog',
        'setLog',
        'setExtraInfo',
    ],
} )( Panel );
