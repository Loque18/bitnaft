module.exports = {
    reactStrictMode: true,
    // i18n: {
    //     locales: ['en'],
    //     defaultLocale: null,
    // },
    env: {
        FONT_AWESOME_KEY: '8d70729523',
        ENDPOINT: 'https://orcanialabs.com',
    },
    images: {
        domains: ['img.freepik.com'],
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
