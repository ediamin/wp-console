import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { ClipboardButton } from '@wordpress/components';

import { IconClone, IconCheckCircle } from '../../Icons';

const CopyOutputDeprecated = ( { text } ) => {
    const [ hasCopied, setHasCopied ] = useState( false );

    return (
        <ClipboardButton
            isPrimary
            text={ text }
            onCopy={ () => setHasCopied( true ) }
            onFinishCopy={ () => setHasCopied( false ) }
            isSmall
            id="wp-console-copy-output-button"
            className="wp-console-button-no-style"
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
        </ClipboardButton>
    );
};

export default CopyOutputDeprecated;
