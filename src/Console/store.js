/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import storeSelectors from '.@/utils/store-selectors';
import bindKey from '.@/utils/bind-key';

const DEFAULT_STATE = {
    code: `<?php\n`,
    output: null,
    dump: null,
    errorTrace: null,
    isExecuting: false,
    settings: {
        horizontalSplit: true,
    },
    keyBindings: {
        execCode: bindKey( 'Ctrl-Enter', 'Cmd-Enter' ),
    },
};

const actions = {
    updateCode( code ) {
        return {
            type: 'UPDATE_CODE',
            code,
        };
    },

    setOutput( output ) {
        return {
            type: 'SET_OUTPUT',
            output,
        };
    },

    setDump( dump ) {
        return {
            type: 'SET_DUMP',
            dump,
        };
    },

    setErrorTrace( errorTrace ) {
        return {
            type: 'SET_ERROR_TRACE',
            errorTrace,
        };
    },

    reset() {
        return {
            type: 'RESET',
        };
    },

    startExecuting( reset ) {
        reset();

        return {
            type: 'START_EXECUTING',
        };
    },

    finishExecuting() {
        return {
            type: 'FINISH_EXECUTING',
        };
    },

    toggleHorizontalSplit() {
        return {
            type: 'TOGGLE_HORIZONTAL_SPLIT',
        };
    },
};

const reducer = ( state = DEFAULT_STATE, action ) => {
    switch ( action.type ) {
    case 'UPDATE_CODE':
        state = {
            ...state,
            code: action.code,
        };
        break;

    case 'SET_OUTPUT':
        state = {
            ...state,
            output: action.output,
        };
        break;

    case 'SET_DUMP':
        state = {
            ...state,
            dump: action.dump,
        };
        break;

    case 'SET_ERROR_TRACE':
        state = {
            ...state,
            errorTrace: action.errorTrace,
        };
        break;

    case 'RESET':
        state = {
            ...state,
            output: DEFAULT_STATE.output,
            dump: DEFAULT_STATE.dump,
            errorTrace: DEFAULT_STATE.errorTrace,
        };
        break;

    case 'START_EXECUTING':
        state = {
            ...state,
            isExecuting: true,
        };
        break;

    case 'FINISH_EXECUTING':
        state = {
            ...state,
            isExecuting: false,
        };
        break;

    case 'TOGGLE_HORIZONTAL_SPLIT':
        state = {
            ...state,
            settings: {
                ...state.settings,
                horizontalSplit: ! state.settings.horizontalSplit,
            },
        };
        break;

    default:
        break;
    }

    return state;
};

const selectors = {
    getCode( state ) {
        return state.code;
    },

    getOutput( state ) {
        return state.output;
    },

    getDump( state ) {
        return state.dump;
    },

    getErrorTrace( state ) {
        return state.errorTrace;
    },

    getIsExecuting( state ) {
        return state.isExecuting;
    },

    getHorizontalSplit( state ) {
        return state.settings.horizontalSplit;
    },

    getKeyBindings( state ) {
        return state.keyBindings;
    },
};

export const store = {
    actions,
    reducer,
    selectors,
};

export const select = () => {
    const consoleSelectors = new storeSelectors( 'wp-console/console' );

    return {
        code: consoleSelectors.get( 'getCode' ),
        output: consoleSelectors.get( 'getOutput' ),
        dump: consoleSelectors.get( 'getDump' ),
        errorTrace: consoleSelectors.get( 'getErrorTrace' ),
        isExecuting: consoleSelectors.get( 'getIsExecuting' ),
        horizontalSplit: consoleSelectors.get( 'getHorizontalSplit' ),
        keyBindings: consoleSelectors.get( 'getKeyBindings' ),
    };
};

export const dispatch = () => useDispatch( 'wp-console/console' ); // eslint-disable-line
