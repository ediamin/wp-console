/**
 * WordPress dependencies
 */
import { Notice, Spinner } from '@wordpress/components';
import { Fragment, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import withSelectDispatch from './store/with-select-dispatch';
import NavBar from '.@/NavBar/NavBar';

const App = ( { notice, activePanel, setNotice } ) => {
    const Panel = activePanel.Panel;
    const suspenseLoader = (
        <div className="wp-console-spinner">
            <Spinner />
        </div>
    );

    return (
        <Fragment>
            <NavBar />
            <div id="wp-console-panel">
                <Suspense fallback={ suspenseLoader }>
                    <Panel />
                </Suspense>
            </div>
            { notice.message && <Notice status={ notice.type } onRemove={ () => setNotice( '' ) }>{ notice.message }</Notice> }
        </Fragment>
    );
};

export default withSelectDispatch( {
    select: [
        'notice',
        'activePanel',
    ],

    dispatch: [
        'setNotice',
    ],
} )( App );
