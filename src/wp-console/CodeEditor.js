/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class CodeEditor extends Component {
    componentDidMount() {
        const editor = wp.codeEditor.initialize( 'wp-console-textarea' );

        editor.codemirror.setValue( `<?php\n` );

        editor.codemirror.getDoc().markText(
            { line: 0, ch: 0 },
            { line: 0, ch: 5 },
            { readOnly: true }
        );

        editor.codemirror.addKeyMap( {
            'Cmd-Enter': ( cm ) => {
                this.props.onExecute( cm.getValue() );
            },
        } );
    }

    render() {
        return (
            <textarea id={ 'wp-console-textarea' }></textarea>
        );
    }
}

export default CodeEditor;
