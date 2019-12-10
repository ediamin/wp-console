/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { dispatch as globalDispatch } from '.@/global-store';
import { select, dispatch } from './store';
import { IconBug, IconEraser } from '.@/Icons';
import fetchLog from './fetchLog';
import clearLog from './clearLog';

const PanelButtons = () => {
    const dispatches = dispatch();
    const { setNotice } = globalDispatch();
    const { clearingLog, fetchingLog } = select();
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
                    onClick={ () => clearLog( dispatches, setNotice ) }
                ><IconEraser /> { clearLogButtonTxt }</Button>
            </li>
            <li className="list-inline-item">
                <Button
                    className="wp-console-panel-button wp-console-button-no-style"
                    isSmall
                    isBusy={ fetchingLog }
                    disabled={ fetchingLog || clearingLog }
                    onClick={ () => fetchLog( dispatches, setNotice ) }
                ><IconBug /> { fetchLogButtonTxt }</Button>
            </li>
        </ul>
    );
};

export default PanelButtons;
