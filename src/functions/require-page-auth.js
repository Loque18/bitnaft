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

        delete sessionData.token;

        return inner ? inner(context, sessionData) : { props: { session: sessionData } };
    };
};

export default requirePageAuth;
