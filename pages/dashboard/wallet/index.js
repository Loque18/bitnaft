/* eslint-disable no-unused-vars */
import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getSubPageLayout } from 'src/layouts/dashboard-sub-page';

import AssetsTable from 'src/components/tables/assets-table';

import api from 'src/api';

import { toast } from 'react-toastify';

import requirePageAuth from 'src/functions/require-page-auth';

const WalletPage = ({ error, errorMessage, walletAssets, savingsAssets }) => {
    if (error) {
        toast.error(errorMessage);
    }
    return <AssetsTable assets={walletAssets} />;
};

WalletPage.getLayout = page => getPageTitleLayout(getMainLayout(getSubPageLayout(page, 'Wallet')), 'Wallet');

export default WalletPage;

export const getServerSideProps = requirePageAuth(async (ctx, sessionWithToken) => {
    const { user, token } = sessionWithToken;
    const { email } = user;

    const balancesFunctions = [api.get.balances, api.get.savingsBalances];

    const assets = [];
    try {
        const responses = await Promise.all(balancesFunctions.map(func => func({ email, token })));

        responses.forEach((response, i) => {
            if (!response.data.success) {
                if (response.data.code.toString() === '603') {
                    return {
                        props: {},
                        redirect: {
                            destination: '/sessionexpired',
                            permanent: false,
                        },
                    };
                }

                throw new Error(response.data.message);
            }

            assets[i] = response.data.data;
            return null;
        });

        // balances = res.data.data;
    } catch (error) {
        return {
            props: { error: true, errorMessage: error.message, walletAssets: [], savingsAssets: [] },
        };
    }

    return {
        props: {
            walletAssets: assets[0],
            savingsAssets: assets[1],
        },
    };
});
