import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import { useState, useEffect } from 'react';

import ExampleModal from 'src/components/commons/modal/example-modal';

import { useSelector, useDispatch } from 'react-redux';

import { open_modal } from 'src/redux/actions/modalActions';

import { Store as NotificationsStore } from 'react-notifications-component';
import { infoNotification } from 'src/static/notifications';

import appConfig from 'src/static/app.config';

const { appVersion } = appConfig;

const Home = () => {
    // reducers
    const { exampleReducer } = useSelector(state => state);

    const dispatch = useDispatch();

    const [msg, setMsg] = useState(exampleReducer.storage);

    const handleNotificationClick = () => {
        NotificationsStore.addNotification(infoNotification('It includes notifications!! '));
    };

    const handleModalClick = () => {
        dispatch(open_modal({ modalName: 'exampleModal', modalData: { msg: 'It includes modals as well 🙂' } }));
    };

    const handleSetVarClick = () => {
        const items = ['apple', 'banana', 'orange', 'grape', 'pear'];
        dispatch({ type: 'SET_VAR', payload: items[Math.floor(Math.random() * items.length)] });
    };

    useEffect(() => {
        setMsg(exampleReducer.storage);
    }, [exampleReducer.storage]);

    return (
        <>
            <ExampleModal />

            <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <div className="box has-background-hblue resize-manager">
                    <h1 className="title has-text-white has-text-centered mb-6">
                        Orcania Next js template v{appVersion}
                    </h1>
                    <h2 className="subtitle has-text-white has-text-centered has-text-justified">
                        Build apps faster with pre builded components, added libraries, and structured folders.
                    </h2>

                    <div className="columns is-marginless">
                        <div className="column">
                            <button
                                className="button is-fullwidth"
                                type="button"
                                onClick={handleNotificationClick}
                                aria-label="r2d2"
                            >
                                <span className="icon has-text-dark is-size-4">
                                    <i className="fa-solid fa-robot-astromech" />
                                </span>
                            </button>
                        </div>
                        <div className="column">
                            <button
                                className="button is-fullwidth"
                                type="button"
                                onClick={handleModalClick}
                                aria-label="star wars"
                            >
                                <span className="icon has-text-dark is-size-4">
                                    <i className="fa-solid fa-user-bounty-hunter" />
                                </span>
                            </button>
                        </div>
                        <div className="column">
                            <button
                                className="button is-fullwidth"
                                type="button"
                                onClick={handleSetVarClick}
                                aria-label="batman"
                            >
                                <span className="icon has-text-dark is-size-4">
                                    <i className="fa-solid fa-bat" />
                                </span>
                            </button>
                        </div>
                        <div className="column">
                            <button className="button is-fullwidth" type="button" aria-label="harry potter">
                                <span className="icon has-text-dark is-size-4">
                                    <i className="fa-solid fa-broom-ball" />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-6">
                        <h1 className="subtitle has-text-white has-text-centered ">
                            <b>reducer storage:</b> <span className="animate__animated animate__fadeInDown">{msg}</span>
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

Home.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Home');

export default Home;
