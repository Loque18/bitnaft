import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { try_recovering_session } from 'src/redux/actions';

const RecoverSessionComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(try_recovering_session());
    }, [dispatch]);

    return null;
};

export default RecoverSessionComponent;
