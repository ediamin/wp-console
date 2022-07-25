/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import withSelectDispatch from '../store/with-select-dispatch';
import executeCode from './executeCode';
import './autocompletions/mode-php';

let editor = null;

function protectFirstLine() {
    const whitelistCommands = [
        'golineup',
        'gotoright',
        'golinedown',
        'gotoleft',
    ];

    editor.commands.on( 'exec', function ( e ) {
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
    const { code, keyBindings, userSettings, updateCode } = props;

    useEffect( () => {
        initializeEditor( code );

        userSettings?.console?.snippets &&
            addCustomSnippets( userSettings.console.snippets );

        wpConsole.hooks.addAction(
            'wp_console_console_toggle_window_split',
            'Console/CodeEditor',
            () => editor.resize()
        );

        wpConsole.hooks.addAction(
            'wp_console_after_save_user_settings_console_snippets',
            'Console/CodeEditor',
            async ( snippets ) => {
                editor.destroy();
                editor = null;
                initializeEditor( select( 'wp-console' ).code() );
                addCustomSnippets( snippets );
            }
        );

        return () => {
            editor.destroy();
            editor = null;

            wpConsole.hooks.removeAction(
                'wp_console_console_toggle_window_split',
                'Console/CodeEditor'
            );

            wpConsole.hooks.removeAction(
                'wp_console_after_save_user_settings_console_snippets',
                'Console/CodeEditor'
            );
        };
    }, [] );

    const initializeEditor = ( consoleCode ) => {
        // instances
        editor = wpConsoleAce.edit( 'wp-console-code-editor' );
        wpConsoleAce.require( 'ace/ext/language_tools' );

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
        editor.session.setValue( consoleCode );
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
        protectFirstLine();

        // focus editor on load
        editor.focus();
        editor.gotoLine( 2 );
    };

    const addCustomSnippets = ( snippets ) => {
        const allSnippets = [];

        snippets.forEach( ( group ) => {
            const snippetGroup = JSON.parse( group.snippets );
            let key = null;

            if ( typeof snippetGroup !== 'object' ) {
                return;
            }

            for ( key in snippetGroup ) {
                const snippet = snippetGroup[ key ].body;

                allSnippets.push( {
                    caption: snippetGroup[ key ].prefix,
                    snippet: Array.isArray( snippet )
                        ? snippet.join( '\n' )
                        : snippet,
                    meta: snippetGroup[ key ].description,
                    score: 1000001,
                } );
            }
        } );

        // First remove existing snippets
        const index = editor.completers.findIndex(
            ( item ) => item.id === 'wp-console-custom-snippets'
        );

        if ( index >= 0 ) {
            editor.completers.splice( index, 1 );
        }

        // Now add our snippets
        editor.completers.push( {
            id: 'wp-console-custom-snippets',
            getCompletions( aceEditor, session, pos, prefix, callback ) {
                callback( null, allSnippets );
            },
        } );
    };

    return (
        <div id="wp-console-code-editor-wrapper">
            <div id="wp-console-code-editor"></div>
        </div>
    );
};

export default withSelectDispatch( {
    select: [ 'code', 'keyBindings', 'userSettings' ],

    dispatch: [
        'setNotice',
        'updateCode',
        'setOutput',
        'setDump',
        'setErrorTrace',
        'resetConsoleResponses',
        'startExecuting',
        'finishExecuting',
        'setExecutionTime',
    ],
} )( CodeEditor );
