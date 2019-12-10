/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import storeSelectors from '.@/utils/store-selectors';
import Console from '.@/Console/Console';
import DebugLog from '.@/DebugLog/DebugLog';
import saveUserSettings from './save-user-settings';

const DEFAULT_STATE = {
    userSettings: wpConsole.user_settings,
    panels: [ Console, DebugLog ],
    activePanelId: 'console',
    notice: {
        message: '',
        type: 'error',
    },
};

const actions = {
    setUserSettings( section, option, value, setNotice ) {
        saveUserSettings( section, option, value, setNotice );

        return {
            type: 'SET_USER_SETTINGS',
            section,
            option,
            value,
        };
    },

    setActivePanelId( activePanelId ) {
        return {
            type: 'SET_ACTIVE_PANEL',
            activePanelId,
        };
    },

    setNotice( message, type = 'error' ) {
        return {
            type: 'SET_NOTICE',
            notice: {
                message,
                type,
            },
        };
    },
};

const reducer = ( state = DEFAULT_STATE, action ) => {
    switch ( action.type ) {
    case 'SET_USER_SETTINGS':
        state = {
            ...state,
            userSettings: {
                ...state.userSettings,
                [ action.section ]: {
                    ...action.section,
                    [ action.option ]: action.value,
                },
            },
        };
        break;
    case 'SET_ACTIVE_PANEL':
        state = {
            ...state,
            activePanelId: action.activePanelId,
        };
        break;

    case 'SET_NOTICE':
        state = {
            ...state,
            notice: action.notice,
        };
        break;

    default:
        break;
    }

    return state;
};

const selectors = {
    getUserSettings( state ) {
        return state.userSettings;
    },

    getPanels( state ) {
        return state.panels;
    },

    getActivePanelId( state ) {
        return state.activePanelId;
    },

    getActivePanel( state ) {
        return state.panels.filter( ( panel ) => panel.id === state.activePanelId )[ 0 ];
    },

    getNotice( state ) {
        return state.notice;
    },
};

export const store = {
    actions,
    reducer,
    selectors,
};

export const select = () => {
    const globalSelectors = new storeSelectors( 'wp-console/global' );

    return {
        userSettings: globalSelectors.get( 'getUserSettings' ),
        panels: globalSelectors.get( 'getPanels' ),
        activePanelId: globalSelectors.get( 'getActivePanelId' ),
        activePanel: globalSelectors.get( 'getActivePanel' ),
        notice: globalSelectors.get( 'getNotice' ),
    };
};

export const dispatch = () => useDispatch( 'wp-console/global' ); // eslint-disable-line
