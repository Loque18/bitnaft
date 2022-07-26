module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['bitcoin.org'],
    },
    // i18n: {
    //     locales: ['en'],
    //     defaultLocale: null,
    // },
    env: {
        FONT_AWESOME_KEY: '8d70729523',
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ];
    },
};
