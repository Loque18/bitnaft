module.exports = {
    reactStrictMode: false,
    images: {
        domains: [
            'bitcoin.org',
            'img.freepik.com',
            'flagcdn.com',
            'chart.googleapis.com',
            's2.coinmarketcap.com',
            'assets.coingecko.com',
        ],
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
        SESSION_KEY: '2d9a078df6cba6dd363b1af60e89bfb4235689834ce1254549530a55cb917b0c',
        DURATION_KEY: '71a71d2c9b21371453bda99ae79ea6d4980243d10ff7411539d16ab1e25409b1',
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
