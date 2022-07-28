/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
// import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Provider } from 'react-redux';
import { ReactNotifications } from 'react-notifications-component';

import TryRecoveringSessionComponent from 'src/components/commons/recover-sesion';

import store from 'src/redux/store';

import { custom_notification_types } from 'src/static/notifications';

import appConfig from 'src/static/app.config';

import 'src/scss/main.scss';

const { FONT_AWESOME_KEY } = process.env;
const { appName } = appConfig;

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || (page => page);
    return (
        <>
            <Head>
                <title>{appName}</title>
                <meta name="description" content={appConfig.description} />
            </Head>

            <ReactNotifications types={custom_notification_types} />

            <Provider store={store}>
                <Script src={`https://kit.fontawesome.com/${FONT_AWESOME_KEY}.js`} />
                <TryRecoveringSessionComponent />

                {getLayout(<Component {...pageProps} />)}
            </Provider>
        </>
    );
}

export default MyApp;
