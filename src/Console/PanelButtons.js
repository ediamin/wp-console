/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { IconPlay, IconSplitWindowHorizontal, IconSplitWindowVertical } from '.@/Icons';
import { select as globalSelect, dispatch as globalDispatch } from '.@/global-store';
import { select, dispatch } from './store';
import executeCode from './executeCode';

const PanelButtons = () => {
    const { code, isExecuting } = select();
    const dispatches = dispatch();
    const { setUserSettings, setNotice } = globalDispatch();
    const { userSettings } = globalSelect();
    const windowSplit = userSettings.console.window_split;
    const newSplitSetting = ( windowSplit === 'horizontal' ) ? 'vertical' : 'horizontal';
    const IconSplit = ( windowSplit === 'horizontal' ) ? IconSplitWindowHorizontal : IconSplitWindowVertical;

    return (
        <ul className="list-inline">
            <li className="list-inline-item">
                <Button
                    className="wp-console-panel-button wp-console-button-no-style"
                    isSmall
                    onClick={ () => setUserSettings( 'console', 'window_split', newSplitSetting, setNotice ) }
                ><IconSplit /> { __( 'Split', 'wp-console' ) }</Button>
            </li>
            <li className="list-inline-item">
                <Button
                    className="wp-console-panel-button wp-console-button-no-style"
                    isSmall
                    isBusy={ isExecuting }
                    disabled={ isExecuting }
                    onClick={ () => executeCode( code, dispatches, setNotice ) }
                ><IconPlay /> { __( 'Run', 'wp-console' ) }</Button>
            </li>
        </ul>
    );
};

export default PanelButtons;
