import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { clear_session } from 'src/redux/actions';

const SessionexpiredPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clear_session());
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Your session has expired</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

SessionexpiredPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Sessionexpired');

export default SessionexpiredPage;
