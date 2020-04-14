/**
 * WordPress dependencies
 */
import { registerStore, combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as globalStore } from './global';
import { store as consoleStore } from '../Console/store';
import { store as debugLogStore } from '../DebugLog/store';

const wpConsoleStore = {
    actions: {
        ...globalStore.actions,
        ...consoleStore.actions,
        ...debugLogStore.actions,
    },

    /**
     * Object keys must be used as selectors method param.
     * For example for console, we have `code`
     * selectors. In that case, we have to use
     * `code( { consoleStore } )` instead of
     * `code( state )`, since we're using the
     * `consoleStore` key in combineReducers.
     */
    reducer: combineReducers( {
        globalStore: globalStore.reducer,
        consoleStore: consoleStore.reducer,
        debugLogStore: debugLogStore.reducer,
    } ),

    selectors: {
        ...globalStore.selectors,
        ...consoleStore.selectors,
        ...debugLogStore.selectors,
    },
};

registerStore( 'wp-console', wpConsoleStore );
