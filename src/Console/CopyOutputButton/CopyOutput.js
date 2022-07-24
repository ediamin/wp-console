import { __ } from '@wordpress/i18n';
import { Fragment, useState, useRef, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';

import { IconClone, IconCheckCircle } from '../../Icons';

const TIMEOUT = 4000;

// source: https://github.com/WordPress/gutenberg/blob/d754759c45a4f882b01a78e1a2064b77e9d87370/packages/components/src/clipboard-button/index.js
const CopyOutput = ( { text } ) => {
    const [ hasCopied, setHasCopied ] = useState( false );

    const timeoutId = useRef();
    const ref = useCopyToClipboard( text, () => {
        setHasCopied( true );
        clearTimeout( timeoutId.current );

        timeoutId.current = setTimeout( () => setHasCopied( false ), TIMEOUT );
    } );

    useEffect( () => {
        clearTimeout( timeoutId.current );
    }, [] );

    // Workaround for inconsistent behavior in Safari, where <textarea> is not
    // the document.activeElement at the moment when the copy event fires.
    // This causes documentHasSelection() in the copy-handler component to
    // mistakenly override the ClipboardButton, and copy a serialized string
    // of the current block instead.
    const focusOnCopyEventTarget = ( event ) => {
        event.target.focus();
    };

    return (
        <Button
            isPrimary
            isSmall
            id="wp-console-copy-output-button"
            className="wp-console-button-no-style"
            ref={ ref }
            onCopy={ focusOnCopyEventTarget }
        >
            { hasCopied ? (
                <Fragment>
                    <IconCheckCircle width="10" height="10" />{ ' ' }
                    { __( 'Output Copied!', 'wp-console' ) }
                </Fragment>
            ) : (
                <Fragment>
                    <IconClone width="10" height="10" />{ ' ' }
                    { __( 'Copy Output', 'wp-console' ) }
                </Fragment>
            ) }
        </Button>
    );
};

export default CopyOutput;
