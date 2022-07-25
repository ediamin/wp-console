/**
 * WordPress dependencies
 */
import { useState, useEffect, Fragment } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
/**
 * External dependencies
 */
import { nanoid } from 'nanoid';
import jsonminify from 'jsonminify';

/**
 * Internal dependencies
 */
import withSelectDispatch from '../../store/with-select-dispatch';
import { IconCheckCircle } from '../../Icons';
let editor = null;
let snippets = [];

const Manager = ( {
    closeManager,
    setCanCloseManager,
    userSettings,
    setUserSettings,
    setNotice,
} ) => {
    const [ currentSnippetGroup, setCurrentSnippetGroup ] = useState( '' );
    const [ isSavingSnippets, setIsSavingSnippets ] = useState( false );
    const [ showUpdateMsg, setShowUpdateMsg ] = useState( false );

    useEffect( () => {
        let selectedGroup = {};

        if (
            ! Array.isArray( userSettings?.console?.snippets ) ||
            ! userSettings.console.snippets.length
        ) {
            selectedGroup = {
                id: nanoid(),
                title: __( 'Custom Snippets', 'wp-console' ),
                snippets: '{}',
            };

            snippets = [ selectedGroup ];
        } else {
            snippets = userSettings.console.snippets;
            selectedGroup = snippets[ 0 ];
        }

        initializeEditor( selectedGroup );
        setCurrentSnippetGroup( selectedGroup.id );
        setCanCloseManager( true );

        return () => {
            editor = null;
            snippets = [];
        };
    }, [] );

    const initializeEditor = ( selectedGroup ) => {
        editor = wpConsoleAce.edit( 'wp-console-snippet-manager-main' );

        // theme, mode and primary options
        editor.setTheme( 'ace/theme/xcode' );
        editor.session.setMode( 'ace/mode/json' );
        editor.setOptions( {
            enableLiveAutocompletion: true,
            tabSize: 2,
        } );

        // change line height
        editor.container.style.lineHeight = 1.6;
        editor.renderer.updateFontSize();

        // hide guide line
        editor.setShowPrintMargin( false );

        // Set the value
        editor.session.setValue(
            JSON.stringify( JSON.parse( selectedGroup.snippets ), null, 2 )
        );

        // focus editor on load
        editor.focus();
    };

    const hasJSONError = () => {
        const messages = [];

        editor.session.getAnnotations().forEach( ( annot ) => {
            if ( annot.type === 'error' ) {
                messages.push(
                    sprintf(
                        // translators: %1$s: error message, %2$s: line number, %3$s: column number
                        __( '%1$s at line %2$d, column %3$d.', 'wp-console' ),
                        annot.text,
                        annot.row + 1,
                        annot.column + 1
                    )
                );
            }
        } );

        if ( messages.length ) {
            setNotice( messages.join( ' ' ) );
        }

        return messages.length;
    };

    const saveSettings = async () => {
        if ( hasJSONError() ) {
            return;
        }

        setNotice( '' );
        setCanCloseManager( false );
        setIsSavingSnippets( true );

        const index = snippets.findIndex(
            ( group ) => group.id === currentSnippetGroup
        );

        snippets[ index ].snippets =
            jsonminify( editor.session.getValue() ) || '{}';

        const action = await setUserSettings(
            'console',
            'snippets',
            snippets,
            setNotice
        );

        const response = await action.response;

        if ( response ) {
            setShowUpdateMsg( true );

            setTimeout( () => {
                editor && setShowUpdateMsg( false );
            }, 4000 );
        }

        setIsSavingSnippets( false );
        setCanCloseManager( true );
    };

    return (
        <div
            id="wp-console-snippet-manager"
            className={ isSavingSnippets ? 'is-saving-snippets' : '' }
        >
            <div id="wp-console-snippet-manager-main" />
            <div id="wp-console-snippet-manager-footer">
                <div id="wp-conoele-snippet-manager-update-message">
                    { showUpdateMsg && (
                        <Fragment>
                            <IconCheckCircle />{ ' ' }
                            { __( 'Snippets updated', 'wp-console' ) }
                        </Fragment>
                    ) }
                </div>
                <div id="wp-console-snippet-manager-buttons">
                    <Button
                        onClick={ () => closeManager() }
                        isTertiary
                        disabled={ isSavingSnippets }
                    >
                        { __( 'Cancel', 'wp-console' ) }
                    </Button>

                    <Button
                        onClick={ () => saveSettings() }
                        isPrimary
                        disabled={ isSavingSnippets }
                        isBusy={ isSavingSnippets }
                    >
                        { isSavingSnippets
                            ? __( 'Saving Snippets', 'wp-console' )
                            : __( 'Save Snippets', 'wp-console' ) }
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default withSelectDispatch( {
    select: [ 'userSettings' ],

    dispatch: [ 'setUserSettings', 'setNotice' ],
} )( Manager );
