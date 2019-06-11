/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class Dump extends Component {
    render() {
        return (
            <div className="wp-console-dump" dangerouslySetInnerHTML={ { __html: this.props.dump } } />
        );
    }
}

export default Dump;
