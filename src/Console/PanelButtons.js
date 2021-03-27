/**
 * WordPress dependencies
 */
import { useState, Fragment } from '@wordpress/element';
import { Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import withSelectDispatch from '../store/with-select-dispatch';
import {
    IconPlay,
    IconSplitWindowHorizontal,
    IconSplitWindowVertical,
    IconCurlyBraces,
} from '../Icons';
import executeCode from './executeCode';
import SnippetManager from './Snippet/Manager';

const PanelButtons = ( props ) => {
    const [ isOpenModal, setIsOpenModal ] = useState( false );
    const [ canCloseManager, setCanCloseManager ] = useState( true );
    const {
        userSettings,
        code,
        isExecuting,
        setUserSettings,
        setNotice,
    } = props;

    const windowSplit = userSettings.console.window_split;
    const IconSplit =
        windowSplit === 'horizontal'
            ? IconSplitWindowHorizontal
            : IconSplitWindowVertical;

    const toggleWindowSplit = async () => {
        const newSplitSetting =
            windowSplit === 'horizontal' ? 'vertical' : 'horizontal';
        await setUserSettings(
            'console',
            'window_split',
            newSplitSetting,
            setNotice
        );
        wpConsole.hooks.doAction(
            'wp_console_console_toggle_window_split',
            newSplitSetting
        );
    };

    return (
        <Fragment>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <Button
                        className="wp-console-panel-button wp-console-button-no-style"
                        isSmall
                        onClick={ () => setIsOpenModal( true ) }
                    >
                        <IconCurlyBraces /> { __( 'Snippets', 'wp-console' ) }
                    </Button>
                </li>
                <li className="list-inline-item">
                    <Button
                        className="wp-console-panel-button wp-console-button-no-style"
                        isSmall
                        onClick={ () => toggleWindowSplit() }
                    >
                        <IconSplit /> { __( 'Split', 'wp-console' ) }
                    </Button>
                </li>
                <li className="list-inline-item">
                    <Button
                        className="wp-console-panel-button wp-console-button-no-style"
                        isSmall
                        isBusy={ isExecuting }
                        disabled={ isExecuting }
                        onClick={ () => executeCode( code, props ) }
                    >
                        <IconPlay /> { __( 'Run', 'wp-console' ) }
                    </Button>
                </li>
            </ul>
            { isOpenModal && (
                <Modal
                    className="wp-console-snippet-manager-modal"
                    title={ __( 'WP Console Snippets', 'wp-console' ) }
                    onRequestClose={ () =>
                        canCloseManager && setIsOpenModal( false )
                    }
                >
                    <SnippetManager
                        closeManager={ () =>
                            canCloseManager && setIsOpenModal( false )
                        }
                        setCanCloseManager={ setCanCloseManager }
                    />
                </Modal>
            ) }
        </Fragment>
    );
};

export default withSelectDispatch( {
    select: [ 'userSettings', 'code', 'isExecuting' ],

    dispatch: [
        'setUserSettings',
        'setNotice',
        'setOutput',
        'setDump',
        'setErrorTrace',
        'resetConsoleResponses',
        'startExecuting',
        'finishExecuting',
        'setExecutionTime',
    ],
} )( PanelButtons );
