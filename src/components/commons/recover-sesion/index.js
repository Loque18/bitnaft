/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { try_recovering_session } from 'src/redux/actions';

const RecoverSessionComponent = () => {
    const dispatch = useDispatch();
    const { sessionReducer } = useSelector(state => state);

    useEffect(() => {
        dispatch(try_recovering_session());
    }, [dispatch]);

    useEffect(() => {
        console.log('sessionReducer', sessionReducer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionReducer.isLoggedIn, sessionReducer.sessionData]);

    return null;
};

export default RecoverSessionComponent;
