import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getSubPageLayout } from 'src/layouts/dashboard-sub-page';

import AssetsTable from 'src/components/tables/assets-table';

import requirePageAuth from 'src/functions/require-page-auth';

import api from 'src/api';

const WalletPage = ({ balances }) => {
    return <AssetsTable assets={balances} />;
};

WalletPage.getLayout = page => getPageTitleLayout(getMainLayout(getSubPageLayout(page, 'Wallet')), 'Wallet');

export default WalletPage;

export const getServerSideProps = requirePageAuth(async (context, session) => {
    const { token, user } = session;

    let balances = [];
    try {
        const res = await api.get.balances({ email: user.email, token });

        if (!res.data.success) {
            if (res.data.code.toString() === '603') {
                return {
                    props: {},
                    redirect: {
                        destination: '/sessionexpired',
                        permanent: false,
                    },
                };
            }

            throw new Error(res.data.message);
        }

        balances = res.data.data;
    } catch (err) {
        return {
            props: { error: true, errorMessage: err.message, balances: [] },
        };
    }

    const sessionData = { ...session };
    delete sessionData.token;

    return {
        props: {
            session: sessionData,
            balances,
        },
    };
});
