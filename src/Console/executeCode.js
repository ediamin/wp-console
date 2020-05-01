/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

const executeCode = async ( code, props ) => {
    const {
        setNotice,
        setOutput,
        setDump,
        setErrorTrace,
        resetConsoleResponses,
        startExecuting,
        finishExecuting,
    } = props;

    code = code.replace( /^\<\?php/, '//' ).trim();

    startExecuting( resetConsoleResponses );
    setNotice( '' );

    try {
        const response = await apiFetch( {
            path: '/wp-console/v1/console',
            method: 'post',
            data: {
                input: code,
            },
            headers: {
                'X-WP-Console': true,
            },
        } );

        if ( response.output ) {
            setOutput( response.output );
        }

        if ( response.dump ) {
            setDump( response.dump );
        }
    } catch ( error ) {
        if ( error.message ) {
            setNotice( error.message );
        }

        if ( error?.data?.trace ) {
            setErrorTrace( error.data.trace );
        }
    } finally {
        finishExecuting();
    }
};

export default executeCode;
