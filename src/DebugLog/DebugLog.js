/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { IconBug } from '.@/Icons';
import PanelButtons from './PanelButtons';
import Panel from './Panel';

export default {
    id: 'debug-log',
    name: __( 'Debug Log', 'wp-console' ),
    icon: <IconBug />,
    PanelButtons,
    Panel,
};
