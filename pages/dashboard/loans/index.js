/* eslint-disable no-unused-vars */
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getDashboardSubPageLayout } from 'src/layouts/dashboard-sub-page';
import LoansTable from 'src/components/tables/loans-table';

import api from 'src/api';

import requirePageAuth from 'src/functions/require-page-auth';
import { toast } from 'react-toastify';

const LoansPage = ({ error, errorMessage, walletAssets, savingsAssets, loansAssets }) => {
    if (error) toast.error(errorMessage);
    return <LoansTable walletAssets={walletAssets} assets={loansAssets} />;
};

LoansPage.getLayout = page => getPageTitleLayout(getMainLayout(getDashboardSubPageLayout(page, 'Loans')), 'Loans');
export default LoansPage;

export const getServerSideProps = requirePageAuth(async (ctx, sessionWithToken) => {
    const { user, token } = sessionWithToken;
    const { email } = user;

    const balancesFunctions = [api.get.balances, api.get.savingsBalances, api.get.loansBalances];

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
            props: { error: true, errorMessage: error.message, walletAssets: [], savingsAssets: [], loansAssets: [] },
        };
    }

    return {
        props: {
            walletAssets: assets[0],
            savingsAssets: assets[1],
            loansAssets: assets[2],
        },
    };
});
