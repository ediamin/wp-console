/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import phpConstants from './data/php-constants';
import phpFunctions from './data/php-functions';
import phpKeywords from './data/php-keywords';
import wpFunctions from './data/wp-functions';
import phpBooleans from './data/php-booleans';
import misc from './data/misc';

class CodeEditor extends Component {
    editor = null;
    editorData = {};
    hintTriggers = {};

    componentDidMount() {
        this.initializeCodeMirror();
    }

    render() {
        return (
            <section id={ 'wp-console-code-editor-wrapper' }>
                <textarea id={ 'wp-console-code-editor' }></textarea>
            </section>
        );
    }

    initializeCodeMirror = () => {
        if ( this.editor ) {
            return;
        }

        this.editor = wp.codeEditor.initialize( 'wp-console-code-editor' );

        this.editor.codemirror.setOption( 'mode', 'php' );
        this.editor.codemirror.setOption( 'matchBrackets', true );
        this.editor.codemirror.setOption( 'autoCloseBrackets', true );
        this.editor.codemirror.setOption( 'lint', false );

        this.editor.codemirror.setValue( `<?php\n` );

        this.editor.codemirror.getDoc().markText(
            { line: 0, ch: 0 },
            { line: 0, ch: 5 },
            { readOnly: true, atomic: true }
        );

        this.editor.codemirror.addKeyMap( {
            name: __( 'Execute code', 'wp-console' ),
            'Shift-Enter': ( cm ) => {
                this.props.onExecute( cm.getValue() );
            },
        } );

        wp.CodeMirror.hintWords.php = [].concat(
            phpConstants,
            phpFunctions,
            phpKeywords,
            wpFunctions,
            phpBooleans,
            misc
        ).map( ( hintWord ) => {
            if ( hintWord.prefix && hintWord.body ) {
                const prefix = hintWord.description ? `${ hintWord.prefix }\t${ hintWord.description }` : hintWord.prefix;
                this.hintTriggers[ prefix ] = hintWord.body;
                return prefix;
            }

            return hintWord;
        } ).sort();

        this.editor.codemirror.on( 'inputRead', ( codemirror ) => {
            if ( codemirror.state.completionActive ) {
                return;
            }

            const cur = codemirror.getCursor();
            const token = codemirror.getTokenAt( cur );

            if ( token.type && token.type !== 'comment' ) {
                codemirror.showHint( {
                    completeSingle: false,
                    hint: this.hint,
                } );
            }
        } );

        if ( window.localStorage ) {
            this.editor.codemirror.on( 'change', ( codemirror ) => {
                localStorage.setItem( 'wp_console_code', codemirror.getValue() );
            } );

            const consoleCode = localStorage.getItem( 'wp_console_code' );

            if ( consoleCode ) {
                this.editor.codemirror.setValue( consoleCode );
            }
        }
    }

    hint = ( codemirror ) => {
        const cursor = codemirror.getCursor();
        const token = codemirror.getTokenAt( cursor );
        const start = token.start;
        const end = cursor.ch;
        const line = cursor.line;
        const currentWord = token.string;
        const from = wp.CodeMirror.Pos( line, start );
        const to = wp.CodeMirror.Pos( line, end );

        const list = wp.CodeMirror.hintWords.php.filter( function( item ) {
            if ( item.trigger ) {
                return item.trigger.startsWith( currentWord );
            }

            return item.startsWith( currentWord );
        } );

        const data = {
            list,
            from,
            to,
        };

        wp.CodeMirror.on( data, 'pick', this.replaceWithTriggerContents );

        this.editorData = {
            list,
            cursor,
            token,
            start,
            end,
            line,
            currentWord,
            from,
            to,
        };

        return data;
    }

    replaceWithTriggerContents = ( completion ) => {
        if ( ! this.hintTriggers[ completion ] ) {
            return;
        }

        const to = wp.CodeMirror.Pos( this.editorData.line, completion.length );

        this.editor.codemirror.replaceRange(
            this.hintTriggers[ completion ],
            this.editorData.from,
            to,
            'complete'
        );
    }
}

export default CodeEditor;
