/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Tooltip } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { IconExecutionTime } from '../Icons';
import CopyOutputButton from './CopyOutputButton';

function formatOutput( output ) {
    // Strip all html tags.
    output = output.replace( /(<([^>]+)>)/gi, '' );
    // Replace new line
    output = output.replace( /⏎/gi, '\n' );

    return output;
}

const Output = ( { output, dump, executionTime, errorTrace } ) => {
    let textToCopy = '';

    if ( output ) {
        textToCopy = formatOutput( output );
    }

    return (
        <div id="wp-console-editor-output">
            { errorTrace ? (
                <Fragment>
                    <div className="panel-header">
                        <span className="panel-title">
                            { __( 'Error Traceback', 'wp-console' ) }
                        </span>
                    </div>
                    <pre
                        className="wp-console-output wp-console-error-trace"
                        dangerouslySetInnerHTML={ { __html: errorTrace } }
                    />
                </Fragment>
            ) : (
                <Fragment>
                    <div className="panel-header clearfix">
                        <span className="panel-title">
                            { __( 'Output', 'wp-console' ) }
                        </span>
                        <ul className="panel-buttons list-inline">
                            <li className="list-inline-item opacity-70">
                                <CopyOutputButton text={ textToCopy } />
                            </li>
                        </ul>
                        <ul className="panel-buttons list-inline float-right">
                            <Tooltip
                                text={ __( 'Execution Time', 'wp-console' ) }
                                position="middle left"
                            >
                                <li className="list-inline-item">
                                    <span className="opacity-70 font-size-11">
                                        <IconExecutionTime
                                            width="16"
                                            height="16"
                                            top="4"
                                        />{ ' ' }
                                        { executionTime }s
                                    </span>
                                </li>
                            </Tooltip>
                        </ul>
                    </div>
                    { dump ? (
                        <div
                            className="wp-console-dump"
                            dangerouslySetInnerHTML={ { __html: dump } }
                        />
                    ) : (
                        <pre
                            className="wp-console-output"
                            dangerouslySetInnerHTML={ { __html: output } }
                        />
                    ) }
                </Fragment>
            ) }
        </div>
    );
};

export default Output;
