/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { try_recovering_session } from 'src/redux/actions';

let executed = false;

const RecoverSessionComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (executed) return;
        dispatch(try_recovering_session());
        executed = true;
    }, [dispatch]);

    return null;
};

export default RecoverSessionComponent;
