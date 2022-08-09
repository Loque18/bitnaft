/* eslint-disable no-console */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { clear_session, update_session } from 'src/redux/actions';

const SessionComponent = () => {
    const dispatch = useDispatch();
    const { session } = useSelector(state => state.sessionReducer);
    const { expireTimestamp } = session;

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const res = await axios({
                method: 'get',
                url: '/api/auth/session',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.status === 'success') {
                dispatch(update_session({ session: res.data.data }));
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!expireTimestamp) return undefined;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = expireTimestamp - now;

            if (diff <= 0) {
                dispatch(clear_session());
                clearInterval(interval);
                router.push('/sessionexpired');
            }
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expireTimestamp]);

    return null;
};

export default SessionComponent;
