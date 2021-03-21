/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { ClipboardButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { IconClone, IconCheckCircle, IconHourGlassHalf } from '../Icons';

function formatOutput( output ) {
    // Strip all html tags.
    output = output.replace( /(<([^>]+)>)/gi, '' );
    // Replace new line
    output = output.replace( /⏎/gi, '\n' );

    return output;
}

const Output = ( { output, dump, executionTime, errorTrace } ) => {
    const [ hasCopied, setHasCopied ] = useState( false );
    let textToCopy = '';

    if ( output ) {
        textToCopy = formatOutput( output );
    }

    return (
        <div id="wp-console-editor-output">
            { errorTrace ? (
                <Fragment>
                    <h4 className="panel-title">
                        { __( 'Error Traceback', 'wp-console' ) }
                    </h4>
                    <pre
                        className="wp-console-output wp-console-error-trace"
                        dangerouslySetInnerHTML={ { __html: errorTrace } }
                    />
                </Fragment>
            ) : (
                <Fragment>
                    <div className="panel-title">
                        <h4>{ __( 'Output', 'wp-console' ) }</h4>
                        <ul className="panel-buttons list-inline">
                            <li className="list-inline-item">
                                <ClipboardButton
                                    isPrimary
                                    text={ textToCopy }
                                    onCopy={ () => setHasCopied( true ) }
                                    onFinishCopy={ () => setHasCopied( false ) }
                                    isSmall
                                    className="wp-console-button-no-style"
                                >
                                    { hasCopied ? (
                                        <Fragment>
                                            <IconCheckCircle
                                                width="10"
                                                height="10"
                                            />{ ' ' }
                                            { __(
                                                'Output Copied!',
                                                'wp-console'
                                            ) }
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <IconClone width="10" height="10" />{ ' ' }
                                            { __(
                                                'Copy Output',
                                                'wp-console'
                                            ) }
                                        </Fragment>
                                    ) }
                                </ClipboardButton>
                            </li>
                        </ul>

                        <div className="execution-time">
                            <IconHourGlassHalf width="16" height="16" />{ ' ' }
                            { __( 'Execution Time', 'wp-console' ) }
                            <span>{ executionTime }</span>
                        </div>
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
