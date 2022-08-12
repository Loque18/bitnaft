/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
// import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';

import Loading from 'src/components/commons/loading';

import CoinManagerModal from 'src/components/modals/coin-manager-modal';
import QRCodeGeneratorModal from 'src/components/modals/qr-code-generator-modal';
import SubscribeToSavingOfferModal from 'src/components/modals/subscribe-to-saving-offer-modal';
import SubscribedSuccesfullyModal from 'src/components/modals/subscribed-succesfully';
import RedeemSavingModal from 'src/components/modals/redeem-saving-modal';
import RedeemSuccessfullModal from 'src/components/modals/redeemed-successfully';

import SessionComponent from 'src/components/commons/session-service';

import store from 'src/redux/store';

import appConfig from 'src/static/app.config';

import 'src/scss/main.scss';

const { FONT_AWESOME_KEY } = process.env;
const { appName } = appConfig;

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || (page => page);

    const [state, setState] = useState({
        isRouteChanging: false,
        loadingKey: 0,
    });

    const router = useRouter();

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setState(prevState => ({
                ...prevState,
                isRouteChanging: true,
                // eslint-disable-next-line no-bitwise
                loadingKey: prevState.loadingKey ^ 1,
            }));
        };

        const handleRouteChangeEnd = () => {
            setState(prevState => ({
                ...prevState,
                isRouteChanging: false,
            }));
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeEnd);
        router.events.on('routeChangeError', handleRouteChangeEnd);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeEnd);
            router.events.off('routeChangeError', handleRouteChangeEnd);
        };
    }, [router.events]);

    return (
        <>
            <Head>
                <title>{appName}</title>
                <meta name="description" content={appConfig.description} />
            </Head>

            <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />

            <ToastContainer />
            <Provider store={store}>
                <Script src={`https://kit.fontawesome.com/${FONT_AWESOME_KEY}.js`} />
                <SessionComponent />

                <CoinManagerModal />
                <QRCodeGeneratorModal />
                <SubscribeToSavingOfferModal />
                <SubscribedSuccesfullyModal />
                <RedeemSavingModal />
                <RedeemSuccessfullModal />

                {getLayout(<Component {...pageProps} />)}
            </Provider>
        </>
    );
}

export default MyApp;
