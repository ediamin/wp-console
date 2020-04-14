/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import withSelectDispatch from '../store/with-select-dispatch';
import executeCode from './executeCode';
import './autocompletions/mode-php';

function protectFirstLine( editor ) {
    const whitelistCommands = [
        'golineup',
        'gotoright',
        'golinedown',
        'gotoleft',
    ];

    editor.commands.on( 'exec', function( e ) {
        const commandName = e.command.name;
        const rowCol = editor.selection.getCursor();

        if ( rowCol.row === 0 && ! whitelistCommands.includes( commandName ) ) {
            e.preventDefault();
            e.stopPropagation();

            if ( e.args === '\n' || e.args === '\r\n' ) {
                editor.navigateDown( 1 );
            }
        }
    } );
}

const CodeEditor = ( props ) => {
    const { code, keyBindings, updateCode } = props;
    let { editor } = props;

    useEffect( () => {
        initializeEditor();

        wpConsole.hooks.addAction(
            'wp_console_console_toggle_window_split',
            'wp_console',
            () => editor.resize()
        );

        return () => {
            wpConsole.hooks.removeAction(
                'wp_console_console_toggle_window_split',
                'wp_console'
            );
        };
    }, [] );

    const initializeEditor = () => {
        // instances
        editor = ace.edit( 'wp-console-code-editor' );
        ace.require( 'ace/ext/language_tools' );

        // theme, mode and primary options
        editor.setTheme( 'ace/theme/xcode' );
        editor.session.setMode( 'ace/mode/php' );
        editor.setOptions( {
            enableLiveAutocompletion: true,
        } );

        // change line height
        editor.container.style.lineHeight = 1.6;
        editor.renderer.updateFontSize();

        // hide guide line
        editor.setShowPrintMargin( false );

        // exec command
        editor.commands.addCommand( {
            name: 'execCode',
            description: __( 'Execute Code', 'wp-console' ),
            bindKey: keyBindings.execCode,
            exec: () => executeCode( editor.getValue(), props ),
        } );

        // set editor value and update store on change
        editor.session.setValue( code );
        editor.session.on( 'change', () => {
            if ( editor.session.getLength() === 1 ) {
                let value = '';

                if ( ! editor.session.getValue() ) {
                    value = `<?php\n`;
                }

                editor.session.setValue( value );
                editor.moveCursorTo( 1 );
                return;
            }

            updateCode( editor.session.getValue() );
        } );

        // protect first line from changing
        protectFirstLine( editor );

        // focus editor on load
        editor.focus();
        editor.gotoLine( 2 );
    };

    return (
        <div id="wp-console-code-editor-wrapper">
            <div id="wp-console-code-editor"></div>
        </div>
    );
};

export default withSelectDispatch( {
    select: [ 'code', 'keyBindings' ],

    dispatch: [
        'setNotice',
        'updateCode',
        'setOutput',
        'setDump',
        'setErrorTrace',
        'resetConsoleResponses',
        'startExecuting',
        'finishExecuting',
    ],
} )( CodeEditor );
