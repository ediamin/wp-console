/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { IconTerminal } from '.@/Icons';
import PanelButtons from './PanelButtons';
import Panel from './Panel';

export default {
    id: 'console',
    name: __( 'Console', 'wp-console' ),
    icon: <IconTerminal />,
    PanelButtons,
    Panel,
};
