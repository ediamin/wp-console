/**
 * WordPress dependencies
 */
import { createPortal } from '@wordpress/element';
import { Notice } from '@wordpress/components';
/**
 * Internal dependencies
 */
import withSelectDispatch from './store/with-select-dispatch';

const AppNotice = ( { notice, setNotice } ) => {
    return createPortal(
        <div id="wp-console-app-notice">
            <Notice status={ notice.type } onRemove={ () => setNotice( '' ) }>
                { notice.message }
            </Notice>
        </div>,
        document.body
    );
};

export default withSelectDispatch( {
    select: [ 'notice' ],
    dispatch: [ 'setNotice' ],
} )( AppNotice );
