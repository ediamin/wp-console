/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

const fetchLog = async ( props ) => {
    const {
        setNotice,
        startFetchingLog,
        finishFetchingLog,
        setLog,
        setExtraInfo,
    } = props;

    startFetchingLog();
    setNotice( '' );
    setLog( '' );
    setExtraInfo( {} );

    try {
        const response = await apiFetch( {
            path: '/wp-console/v1/debug-log',
            method: 'get',
            parse: false,
            headers: {
                'X-WP-Console': true,
            },
        } );

        const log = await response.json();
        const extraInfo = JSON.parse( response.headers.get( 'X-WP-Console-Debug-Log-Extra-Info' ) );

        setLog( log.trim() );
        setExtraInfo( extraInfo );
    } catch ( error ) {
        const response = await error.json();

        if ( response.message ) {
            setNotice( response.message );
        }

        setLog( 'API_ERROR' );
    } finally {
        finishFetchingLog();
    }
};

export default fetchLog;
