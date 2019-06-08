/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class CodeEditor extends Component {
    editor = null;

    componentDidMount() {
        $( '#wp-console' ).on( 'wp-console:open', this.initializeCodeMirror );
    }

    render() {
        return (
            <textarea id={ 'wp-console-textarea' }></textarea>
        );
    }

    initializeCodeMirror = () => {
        if ( this.editor ) {
            return;
        }

        this.editor = wp.codeEditor.initialize( 'wp-console-textarea' );

        this.editor.codemirror.setValue( `<?php\n` );

        this.editor.codemirror.getDoc().markText(
            { line: 0, ch: 0 },
            { line: 0, ch: 5 },
            { readOnly: true }
        );

        this.editor.codemirror.addKeyMap( {
            'Shift-Enter': ( cm ) => {
                this.props.onExecute( cm.getValue() );
            },
        } );
    }
}

export default CodeEditor;
