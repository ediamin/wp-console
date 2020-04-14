/**
 * Internal dependencies
 */
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

    resetConsoleResponses() {
        return {
            type: 'RESET_CONSOLE_RESPONSES',
        };
    },

    startExecuting( resetConsoleResponses ) {
        resetConsoleResponses();

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

        case 'RESET_CONSOLE_RESPONSES':
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
    code( { consoleStore } ) {
        return consoleStore.code;
    },

    output( { consoleStore } ) {
        return consoleStore.output;
    },

    dump( { consoleStore } ) {
        return consoleStore.dump;
    },

    errorTrace( { consoleStore } ) {
        return consoleStore.errorTrace;
    },

    isExecuting( { consoleStore } ) {
        return consoleStore.isExecuting;
    },

    horizontalSplit( { consoleStore } ) {
        return consoleStore.settings.horizontalSplit;
    },

    keyBindings( { consoleStore } ) {
        return consoleStore.keyBindings;
    },
};

export const store = {
    actions,
    reducer,
    selectors,
};
