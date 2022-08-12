import { toast } from 'react-toastify';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getDashboardSubPageLayout } from 'src/layouts/dashboard-sub-page';
import SavingsTable from 'src/components/tables/savings-table';

import api from 'src/api';

import requirePageAuth from 'src/functions/require-page-auth';

const SavingsPage = ({ error, errorMessage, savingsAssets }) => {
    if (error) {
        toast.error(errorMessage);
    }

    return <SavingsTable assets={savingsAssets} />;
};

SavingsPage.getLayout = page =>
    getPageTitleLayout(getMainLayout(getDashboardSubPageLayout(page, 'Savings')), 'Savings');
export default SavingsPage;

export const getServerSideProps = requirePageAuth(async (ctx, sessionWithToken) => {
    const { user, token } = sessionWithToken;
    const { email } = user;

    const session = { ...sessionWithToken };
    delete session.token;

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
            props: { error: true, errorMessage: error.message, balances: [] },
        };
    }

    return {
        props: {
            walletAssets: assets[0],
            savingsAssets: assets[1],
        },
    };
});
