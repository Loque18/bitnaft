import DashboardSubPage from 'src/layouts/dashboard-sub-page';
import AssetsTable from 'src/components/tables/assets-table';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import requirePageAuth from 'src/functions/require-page-auth';

import api from 'src/api';

import { decrypt } from 'src/utils/hash';

import axios from 'axios';

const WalletPage = ({ session }) => {
    return <DashboardSubPage title="Wallet" table={<AssetsTable />} />;
};

WalletPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Wallet');
export default WalletPage;

export const getServerSideProps = requirePageAuth(async (context, session) => {
    const { session: sessionEncrypted } = context.req.cookies;

    const sessionDecrypted = JSON.parse(decrypt(sessionEncrypted));
    const { token, user } = sessionDecrypted;

    try {
        const res = await api.get.balances({ email: user.email, token });
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            session,
        },
    };
});
