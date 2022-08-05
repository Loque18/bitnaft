const requirePageAunauth = inner => {
    return async context => {
        const { session } = context.req.cookies;

        if (session) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                },
                props: {},
            };
        }

        return inner ? inner(context) : { props: {} };
    };
};

export default requirePageAunauth;
