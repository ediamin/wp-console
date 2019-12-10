/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { IconPlay } from '.@/Icons';
import { dispatch as globalDispatch } from '.@/global-store';
import { select, dispatch } from './store';
import executeCode from './executeCode';

const PanelButtons = () => {
    const { code, isExecuting } = select();
    const dispatches = dispatch();
    const { setNotice } = globalDispatch();

    return (
        <ul className="list-inline">
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
