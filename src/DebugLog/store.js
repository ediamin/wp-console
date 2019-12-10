/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import storeSelectors from '.@/utils/store-selectors';

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
    getClearingLog( state ) {
        return state.clearingLog;
    },

    getFetchingLog( state ) {
        return state.fetchingLog;
    },

    getLog( state ) {
        return state.log;
    },

    getExtraInfo( state ) {
        return state.extraInfo;
    },
};

export const store = {
    actions,
    reducer,
    selectors,
};

export const select = () => {
    const debugLogSelectors = new storeSelectors( 'wp-console/debug-log' );

    return {
        clearingLog: debugLogSelectors.get( 'getClearingLog' ),
        fetchingLog: debugLogSelectors.get( 'getFetchingLog' ),
        log: debugLogSelectors.get( 'getLog' ),
        extraInfo: debugLogSelectors.get( 'getExtraInfo' ),
    };
};

export const dispatch = () => useDispatch( 'wp-console/debug-log' ); // eslint-disable-line
