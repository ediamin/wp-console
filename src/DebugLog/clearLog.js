/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const clearLog = async ( props ) => {
    const {
        setNotice,
        startClearingLog,
        finishClearingLog,
        setLog,
        setExtraInfo,
    } = props;

    startClearingLog();
    setNotice( '' );
    setLog( '' );
    setExtraInfo( {} );

    try {
        await apiFetch( {
            path: '/wp-console/v1/debug-log',
            method: 'delete',
            headers: {
                'X-WP-Console': true,
            },
        } );

        setNotice( __( 'Cleared debug.log.', 'wp-console' ), 'success' );
    } catch ( error ) {
        setLog( 'API_ERROR' );

        if ( error.message ) {
            setNotice( error.message );
        }
    } finally {
        finishClearingLog();
    }
};

export default clearLog;
