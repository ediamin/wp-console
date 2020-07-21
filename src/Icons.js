/**
 * WordPress dependencies
 */
import { SVG, Path } from '@wordpress/components';

/**
 * External dependencies
 */
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';

const SVGIcon = ( props ) => {
    const width = props.width || 13;
    const height = props.height || 13;

    return (
        <SVG
            className={ `wp-console-icon icon-${ props.iconName }` }
            xmlns="http://www.w3.org/2000/svg"
            viewBox={ `0 0 ${ props.icon[ 0 ] } ${ props.icon[ 1 ] }` }
            style={ {
                width: `${width}px`,
                height: `${height}px`,
            } }
        >
            <Path d={ props.icon[ 4 ] }></Path>
        </SVG>
    );
};

export const IconTerminal = ( props ) => SVGIcon( { ...props, ...faTerminal } );
export const IconBug = ( props ) => SVGIcon( { ...props, ...faBug } );
export const IconTimes = ( props ) => SVGIcon( { ...props, ...faTimes } );
export const IconPlay = ( props ) => SVGIcon( { ...props, ...faPlay } );
export const IconHistory = ( props ) => SVGIcon( { ...props, ...faHistory } );
export const IconEraser = ( props ) => SVGIcon( { ...props, ...faEraser } );

export const IconSplitWindowHorizontal = ( props ) =>
    SVGIcon( {
        ...props,
        ...{
            iconName: 'split-window-horizontal',
            icon: [
                '468.062',
                '468.062',
                null,
                null,
                'M431.379,0.222h-394.7C16.456,0.222,0,16.671,0,36.895v394.268c0,20.221,16.456,36.677,36.679,36.677h394.7 c20.228,0,36.683-16.456,36.683-36.677V36.895C468.062,16.665,451.606,0.222,431.379,0.222z M406.519,41.966 c8.689,0,15.723,7.04,15.723,15.72c0,8.683-7.033,15.717-15.723,15.717c-8.688,0-15.723-7.04-15.723-15.717 C390.796,49.006,397.83,41.966,406.519,41.966z M350.189,41.966c8.688,0,15.723,7.04,15.723,15.72 c0,8.683-7.034,15.717-15.723,15.717c-8.684,0-15.711-7.04-15.711-15.717C334.479,49.006,341.506,41.966,350.189,41.966z M41.913,112.426h184.055v313.495H41.913V112.426z M426.148,425.921H242.104V112.426h184.044V425.921z',
            ],
        },
    } );

export const IconSplitWindowVertical = ( props ) =>
    SVGIcon( {
        ...props,
        ...{
            iconName: 'split-window-vertical',
            icon: [
                '468.067',
                '468.067',
                null,
                null,
                'M431.38,0.225H36.685C16.458,0.225,0,16.674,0,36.898v394.268c0,20.221,16.458,36.677,36.685,36.677H431.38 c20.232,0,36.688-16.456,36.688-36.677V36.898C468.062,16.668,451.606,0.225,431.38,0.225z M406.519,41.969 c8.678,0,15.711,7.04,15.711,15.72c0,8.683-7.033,15.717-15.711,15.717c-8.688,0-15.723-7.04-15.723-15.717 C390.796,49.009,397.83,41.969,406.519,41.969z M350.189,41.969c8.688,0,15.723,7.04,15.723,15.72 c0,8.683-7.034,15.717-15.723,15.717c-8.684,0-15.711-7.04-15.711-15.717C334.479,49.009,341.513,41.969,350.189,41.969z M426.143,112.429v143.519H41.919V112.429H426.143z M41.919,425.924V272.09h384.224v153.84H41.919V425.924z',
            ],
        },
    } );
