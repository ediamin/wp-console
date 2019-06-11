/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class Output extends Component {
    containerClass() {
        return 'wp-console-output' + ( this.props.hasDump ? ' has-dump' : '' );
    }

    render() {
        return (
            <div className={ this.containerClass() }>
                <h4>{ __( 'Output', 'wp-console' ) }</h4>
                <pre dangerouslySetInnerHTML={ { __html: this.props.output } } />
            </div>
        );
    }
}

export default Output;
