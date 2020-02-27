const DEFAULT_STATE = {
    clearingLog: false,
    fetchingLog: false,
    log: null,
    extraInfo: {},
};

const actions = {
    startClearingLog() {
        return {
            type: 'START_CLEARING_LOG',
        };
    },

    finishClearingLog() {
        return {
            type: 'FINISH_CLEARING_LOG',
        };
    },

    startFetchingLog() {
        return {
            type: 'START_FETCHING_LOG',
        };
    },

    finishFetchingLog() {
        return {
            type: 'FINISH_FETCHING_LOG',
        };
    },

    setLog( log ) {
        return {
            type: 'SET_LOG',
            log,
        };
    },

    setExtraInfo( extraInfo ) {
        return {
            type: 'SET_EXTRA_INFO',
            extraInfo,
        };
    },
};

const reducer = ( state = DEFAULT_STATE, action ) => {
    switch ( action.type ) {
    case 'START_CLEARING_LOG':
        state = {
            ...state,
            clearingLog: true,
        };
        break;

    case 'FINISH_CLEARING_LOG':
        state = {
            ...state,
            clearingLog: false,
        };
        break;

    case 'START_FETCHING_LOG':
        state = {
            ...state,
            fetchingLog: true,
        };
        break;

    case 'FINISH_FETCHING_LOG':
        state = {
            ...state,
            fetchingLog: false,
        };
        break;

    case 'SET_LOG':
        state = {
            ...state,
            log: action.log,
        };
        break;

    case 'SET_EXTRA_INFO':
        state = {
            ...state,
            extraInfo: action.extraInfo,
        };
        break;

    default:
        break;
    }

    return state;
};

const selectors = {
    clearingLog( { debugLogStore } ) {
        return debugLogStore.clearingLog;
    },

    fetchingLog( { debugLogStore } ) {
        return debugLogStore.fetchingLog;
    },

    log( { debugLogStore } ) {
        return debugLogStore.log;
    },

    extraInfo( { debugLogStore } ) {
        return debugLogStore.extraInfo;
    },
};

export const store = {
    actions,
    reducer,
    selectors,
};
