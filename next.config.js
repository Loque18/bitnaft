module.exports = {
    reactStrictMode: false,
    images: {
        domains: ['bitcoin.org', 'img.freepik.com', 'flagcdn.com', 'chart.googleapis.com'],
    },
    // i18n: {
    //     locales: ['en'],
    //     defaultLocale: null,
    // },
    env: {
        FONT_AWESOME_KEY: '8d70729523',
        ENDPOINT: 'https://orcanialabs.com',
        KEY_HEX: '20b5f8969c326141a12dd954076091ae6b8ea5843cf6154b443fa367035ae37c',
        IV_HEX: '9e8c8cc70430a6939fb30914e32caebb',
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
