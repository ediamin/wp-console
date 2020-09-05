/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

async function saveUserSettings( section, option, value, setNotice ) {
    try {
        const response = await apiFetch( {
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

        wpConsole.hooks.doAction(
            `wp_console_after_save_user_settings_${ section }_${ option }`,
            value,
            response
        );

        return response;
    } catch ( error ) {
        if ( error.message ) {
            setNotice( error.message );
        }
    }

    return null;
}

export default saveUserSettings;
