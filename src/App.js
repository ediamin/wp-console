/**
 * WordPress dependencies
 */
import { Notice } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { select, dispatch } from '.@/global-store';
import NavBar from '.@/NavBar/NavBar';

const App = () => {
    const { notice, activePanel } = select();
    const { setNotice } = dispatch();
    const Panel = activePanel.Panel;

    return (
        <Fragment>
            <NavBar />
            <div id="wp-console-panel">
                <Panel />
            </div>
            { notice.message && <Notice status={ notice.type } onRemove={ () => setNotice( '' ) }>{ notice.message }</Notice> }
        </Fragment>
    );
};

export default App;
