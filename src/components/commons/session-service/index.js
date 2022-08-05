/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { update_session } from 'src/redux/actions';

const SessionComponent = () => {
    const dispatch = useDispatch();

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
                const session = res.data.data;
                dispatch(update_session({ session }));
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

export default SessionComponent;
