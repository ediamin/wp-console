/**
 * Internal dependencies
 */
import Console from '.@/Console/Console';
import DebugLog from '.@/DebugLog/DebugLog';
import saveUserSettings from '../utils/save-user-settings';

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
    userSettings( { globalStore } ) {
        return globalStore.userSettings;
    },

    panels( { globalStore } ) {
        return globalStore.panels;
    },

    activePanelId( { globalStore } ) {
        return globalStore.activePanelId;
    },

    activePanel( { globalStore } ) {
        return globalStore.panels.filter(
            ( panel ) => panel.id === globalStore.activePanelId
        )[ 0 ];
    },

    notice( { globalStore } ) {
        return globalStore.notice;
    },
};

export const store = {
    actions,
    reducer,
    selectors,
};
