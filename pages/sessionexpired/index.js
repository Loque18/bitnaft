import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { clear_session } from 'src/redux/actions';

const SessionexpiredPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clear_session());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <div className="hero is-hblue">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title has-text-centered has-text-white">Your session has expired</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="is-flex is-justify-content-center">
                    <Image src="/media/pages/sessionexpired/bg.png" alt="" width={400} height={400} />
                </div>
            </div>
        </div>
    );
};

SessionexpiredPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Sessionexpired');

export default SessionexpiredPage;
