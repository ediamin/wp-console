/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { lazy } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { IconTerminal } from '.@/Icons';
import PanelButtons from './PanelButtons';
const Panel = lazy( () => import( './Panel' ) );

export default {
    id: 'console',
    name: __( 'Console', 'wp-console' ),
    icon: <IconTerminal width="16" height="16" />,
    PanelButtons,
    Panel,
};
