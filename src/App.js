/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';
import { Fragment, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import withSelectDispatch from './store/with-select-dispatch';
import NavBar from './NavBar/NavBar';
import AppNotice from './AppNotice';

const App = ( { notice, activePanel } ) => {
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
            { notice.message && <AppNotice /> }
        </Fragment>
    );
};

export default withSelectDispatch( {
    select: [ 'notice', 'activePanel' ],
} )( App );
