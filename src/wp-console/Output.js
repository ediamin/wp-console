/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class Output extends Component {
    editor = null;

    componentDidMount() {
        this.editor = wp.codeEditor.initialize( 'wp-console-output' );
        this.editor.codemirror.setValue( `<?php \n${ this.props.output }` );
    }

    componentWillUnmount() {
        this.editor.codemirror.toTextArea();
    }

    render() {
        return (
            <div>
                <h4>{ __( 'Output', 'wp-console' ) }</h4>
                <textarea id={ 'wp-console-output' }></textarea>
            </div>
        );
    }
}

export default Output;
