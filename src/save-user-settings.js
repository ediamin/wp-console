/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

async function saveUserSettings( section, option, value, setNotice ) {
    try {
        await apiFetch( {
            path: '/wp-console/v1/user-settings',
            method: 'post',
            data: {
                [ section ]: {
                    [ option ]: value,
                },
            },
            headers: {
                'X-WP-Console': true,
            },
        } );
    } catch ( error ) {
        if ( error.message ) {
            setNotice( error.message );
        }
    }
}

export default saveUserSettings;
