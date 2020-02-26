/**
 * WordPress dependencies
 */
import { Notice, Spinner } from '@wordpress/components';
import { Fragment, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { select, dispatch } from '.@/global-store';
import NavBar from '.@/NavBar/NavBar';

const App = () => {
    const { notice, activePanel } = select();
    const { setNotice } = dispatch();
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

export default App;
