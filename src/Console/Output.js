/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

const Output = ( { output, dump, errorTrace } ) => {
    return (
        <div id="wp-console-editor-output">
            {
                errorTrace ? (
                    <Fragment>
                        <h4 className="panel-title">{ __( 'Error Traceback', 'wp-console' ) }</h4>
                        <pre className="wp-console-output wp-console-error-trace" dangerouslySetInnerHTML={ { __html: errorTrace } } />
                    </Fragment>
                ) : (
                    <Fragment>
                        <h4 className="panel-title">{ __( 'Output', 'wp-console' ) }</h4>
                        {
                            dump ? (
                                <div className="wp-console-dump" dangerouslySetInnerHTML={ { __html: dump } } />
                            ) : (
                                <pre className="wp-console-output" dangerouslySetInnerHTML={ { __html: output } } />
                            )
                        }
                    </Fragment>
                )
            }
        </div>
    );
};

export default Output;
