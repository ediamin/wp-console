/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { lazy } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { IconBug } from '.@/Icons';
import PanelButtons from './PanelButtons';
const Panel = lazy( () => import( './Panel' ) );

export default {
    id: 'debug-log',
    name: __( 'Debug Log', 'wp-console' ),
    icon: <IconBug width="16" height="16" />,
    PanelButtons,
    Panel,
};
