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
        isLoggedIn: true,
        ...sessionData,
    };
};

export default useSession;
