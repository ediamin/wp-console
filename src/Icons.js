/**
 * WordPress dependencies
 */
import { SVG, Path, G } from '@wordpress/components';

/**
 * External dependencies
 */
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
import { faClone } from '@fortawesome/free-solid-svg-icons/faClone';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons/faHourglassHalf';

const SVGIcon = ( props ) => {
    const width = props.width || 13;
    const height = props.height || 13;

    return (
        <SVG
            className={ `wp-console-icon icon-${ props.iconName }` }
            xmlns="http://www.w3.org/2000/svg"
            viewBox={ `0 0 ${ props.icon[ 0 ] } ${ props.icon[ 1 ] }` }
            style={ {
                width: `${ width }px`,
                height: `${ height }px`,
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
export const IconClone = ( props ) => SVGIcon( { ...props, ...faClone } );
export const IconCheckCircle = ( props ) =>
    SVGIcon( { ...props, ...faCheckCircle } );
export const IconHourGlassHalf = ( props ) =>
    SVGIcon( { ...props, ...faHourglassHalf } );

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

export const IconCurlyBraces = ( { width = 13, height = 13 } ) => (
    <SVG
        className="wp-console-icon icon-curly-braces"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1652 1478"
        style={ {
            width: `${ width }px`,
            height: `${ height }px`,
        } }
    >
        <G
            transform="translate(0.000000,1478.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
        >
            <Path d="M4350 14769 c-349 -13 -704 -56 -895 -108 -584 -159 -1003 -401 -1270 -731 -251 -310 -377 -667 -439 -1235 -47 -435 -61 -790 -71 -1780 -9 -935 -35 -1173 -171 -1585 -96 -288 -273 -560 -464 -713 -209 -167 -516 -262 -943 -293 l-97 -7 2 -921 3 -920 45 -3 c107 -8 304 -36 410 -59 313 -68 520 -171 684 -338 160 -165 284 -390 385 -696 102 -314 137 -738 146 -1800 9 -985 36 -1446 106 -1805 93 -475 302 -855 631 -1142 544 -475 1170 -632 2524 -633 l312 0 6 22 c8 30 8 1792 0 1812 -5 14 -30 16 -174 16 -278 0 -596 27 -766 66 -229 52 -424 186 -513 353 -84 158 -105 308 -116 841 -7 306 -21 732 -35 1040 -19 415 -30 645 -35 690 -65 621 -138 977 -270 1315 -188 480 -520 870 -997 1170 l-108 67 33 22 c626 427 865 702 1080 1241 154 387 235 843 267 1495 17 351 20 412 26 515 15 291 35 815 39 1070 11 542 40 709 152 872 82 120 242 229 391 267 150 38 497 66 828 66 l191 0 7 46 c8 60 8 1757 0 1778 -5 14 -45 16 -353 14 -190 0 -438 -5 -551 -9z" />
            <Path d="M11260 13862 l0 -922 173 0 c406 -1 756 -31 907 -80 150 -48 329 -188 383 -300 72 -150 99 -388 112 -1005 12 -556 44 -1306 71 -1650 48 -625 151 -1051 348 -1450 166 -333 361 -569 665 -805 91 -70 136 -102 300 -215 l63 -44 -47 -28 c-437 -256 -741 -570 -952 -984 -152 -296 -207 -448 -267 -729 -84 -397 -112 -711 -146 -1615 -5 -148 -12 -326 -15 -395 -3 -69 -10 -307 -15 -530 -10 -432 -21 -553 -66 -706 -30 -104 -43 -132 -102 -209 -100 -133 -249 -224 -450 -276 -154 -39 -495 -69 -794 -69 l-168 0 0 -925 0 -925 368 1 c935 3 1371 62 1845 250 186 74 286 125 457 233 294 185 484 407 632 741 139 314 201 634 242 1245 23 351 25 413 31 888 12 1029 19 1251 45 1492 34 302 118 615 224 829 144 292 339 511 553 619 116 59 333 120 503 141 52 7 122 16 156 22 33 5 83 9 110 9 27 0 59 3 72 6 l22 6 0 919 0 919 -43 0 c-66 0 -281 27 -397 50 -295 59 -592 205 -740 366 -147 159 -269 388 -359 676 -62 200 -101 475 -116 828 -4 80 -8 163 -10 185 -2 22 -7 261 -10 530 -10 960 -17 1184 -45 1510 -44 498 -104 769 -240 1070 -181 403 -517 743 -930 942 -434 210 -917 286 -1902 300 l-468 6 0 -921z" />
            <Path d="M7150 10410 l0 -1080 1080 2 1080 3 0 870 c0 479 0 963 0 1078 l0 207 -1080 0 -1080 0 0 -1080z" />
            <Path d="M7157 5473 c-4 -3 -7 -489 -7 -1080 l1 -1073 447 -1 c246 0 480 0 521 1 l74 1 -6 -138 c-16 -368 -129 -705 -312 -932 -130 -160 -296 -285 -540 -405 -93 -46 -212 -99 -263 -116 -104 -37 -102 -32 -57 -120 31 -61 195 -402 195 -406 0 -2 39 -83 86 -181 47 -98 90 -188 95 -200 8 -21 10 -22 46 -9 189 69 487 216 672 331 75 47 289 205 346 255 163 144 327 330 427 485 73 113 174 311 222 435 98 259 175 701 201 1158 4 73 8 1596 5 1989 0 10 -223 13 -1073 13 -591 0 -1077 -3 -1080 -7z" />
        </G>
    </SVG>
);
