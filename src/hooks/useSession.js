import { useSelector } from 'react-redux';

const useSession = () => {
    const { session } = useSelector(state => state.sessionReducer);

    if (!session) {
        return {
            isLoggedIn: false,
        };
    }

    const sessionData = { ...session };
    delete sessionData.token;

    return {
        ...sessionData,
    };
};

export default useSession;
