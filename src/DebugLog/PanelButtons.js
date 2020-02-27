/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import withSelectDispatch from '../store/with-select-dispatch';
import { IconBug, IconEraser } from '.@/Icons';
import fetchLog from './fetchLog';
import clearLog from './clearLog';

const PanelButtons = ( props ) => {
    const { clearingLog, fetchingLog } = props;

    const clearLogButtonTxt = clearingLog ? `${ __( 'Clearing Log', 'wp-console' ) }...` : __( 'Clear Log', 'wp-console' );
    const fetchLogButtonTxt = fetchingLog ? `${ __( 'Fetching Log', 'wp-console' ) }...` : __( 'Fetch Log', 'wp-console' );

    return (
        <ul className="list-inline">
            <li className="list-inline-item">
                <Button
                    className="wp-console-panel-button wp-console-button-no-style"
                    isSmall
                    isBusy={ clearingLog }
                    disabled={ clearingLog || fetchingLog }
                    onClick={ () => clearLog( props ) }
                ><IconEraser /> { clearLogButtonTxt }</Button>
            </li>
            <li className="list-inline-item">
                <Button
                    className="wp-console-panel-button wp-console-button-no-style"
                    isSmall
                    isBusy={ fetchingLog }
                    disabled={ fetchingLog || clearingLog }
                    onClick={ () => fetchLog( props ) }
                ><IconBug /> { fetchLogButtonTxt }</Button>
            </li>
        </ul>
    );
};

export default withSelectDispatch( {
    select: [
        'clearingLog',
        'fetchingLog',
    ],

    dispatch: [
        'setNotice',
        'startFetchingLog',
        'finishFetchingLog',
        'setLog',
        'setExtraInfo',
        'startClearingLog',
        'finishClearingLog',
    ],
} )( PanelButtons );
