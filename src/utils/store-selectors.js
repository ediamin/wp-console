/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

class storeSelectors {
    constructor( reducerKey ) {
        this.reducerKey = reducerKey;
    }

    get( selector ) {
        const reducerKey = this.reducerKey;

        return useSelect( ( select ) => {
            const selectors = select( reducerKey );
            return selectors[ selector ]();
        } );
    }
}

export default storeSelectors;
