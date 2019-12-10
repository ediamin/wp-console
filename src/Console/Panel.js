/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { select } from './store';
import CodeEditor from './CodeEditor';
import Output from './Output';
import { IconTerminal } from '.@/Icons';

const Panel = () => {
    const { output, dump, errorTrace, keyBindings, isExecuting } = select();

    const editor = null;
    const platform = /mac/i.exec( navigator.platform ) ? 'mac' : 'win';
    const execKey = keyBindings.execCode[ platform ].split( '|' ).join( __( ' or ', 'wp-console' ) );

    return (
        <div id="wp-console-panel-console">
            <CodeEditor editor={ editor } />
            {
                ( output || dump || errorTrace ) ? (
                    <Output output={ output } dump={ dump } errorTrace={ errorTrace } />
                ) : (
                    <Fragment>
                        {
                            isExecuting ? (
                                <div className="wp-console-spinner">
                                    <Spinner />
                                    { __( 'Executing code', 'wp-console' ) }...
                                </div>
                            ) : (
                                <p className="empty-content">
                                    <span><IconTerminal /> { sprintf( __( 'use %s to execute code', 'wp-console' ), execKey ) }</span>
                                </p>
                            )
                        }
                    </Fragment>
                )
            }
        </div>
    );
};

export default Panel;
