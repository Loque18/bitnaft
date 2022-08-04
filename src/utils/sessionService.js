const getServerSideSession = context => {
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

    return {
        props: {
            session: JSON.parse(session),
        },
    };
};

export default getServerSideSession;
