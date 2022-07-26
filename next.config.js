module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['bitcoin.org', 'img.freepik.com'],
    },
    // i18n: {
    //     locales: ['en'],
    //     defaultLocale: null,
    // },
    env: {
        FONT_AWESOME_KEY: '8d70729523',
        ENDPOINT: 'https://orcanialabs.com',
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
};
