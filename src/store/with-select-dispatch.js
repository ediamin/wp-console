/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

function withSelectDispatch( { select: _select = [], dispatch: _dispatch = [] } ) {
    return compose(
        withSelect( ( select ) => {
            const selects = {};
            const wpConsoleSelectors = select( 'wp-console' );

            for ( let i = 0; i < _select.length; i++ ) {
                const state = _select[ i ];
                selects[ state ] = wpConsoleSelectors[ state ]();
            }

            return selects;
        } ),

        withDispatch( ( dispatch ) => {
            const dispatches = {};
            const wpConsoleDispatches = dispatch( 'wp-console' );

            for ( let i = 0; i < _dispatch.length; i++ ) {
                dispatches[ _dispatch[ i ] ] = wpConsoleDispatches[ _dispatch[ i ] ];
            }

            return dispatches;
        } )
    );
}

export default withSelectDispatch;
