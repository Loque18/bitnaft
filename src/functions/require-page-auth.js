import { decrypt } from 'src/utils/hash';

const requirePageAuth = inner => {
    return async context => {
        const { session } = context.req.cookies;

        if (!session) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
                props: {},
            };
        }

        const sessionData = JSON.parse(decrypt(session));
        const sessionWithToken = { ...sessionData };

        delete sessionData.token;

        return inner ? inner(context, sessionWithToken) : { props: { session: sessionData } };
    };
};

export default requirePageAuth;
