import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getDashboardSubPageLayout } from 'src/layouts/dashboard-sub-page';
import LoansTable from 'src/components/tables/loans-table';

import api from 'src/api';

import requirePageAuth from 'src/functions/require-page-auth';

const LoansPage = ({ balances }) => {
    return <LoansTable assets={balances} />;
};

LoansPage.getLayout = page => getPageTitleLayout(getMainLayout(getDashboardSubPageLayout(page, 'Loans')), 'Loans');
export default LoansPage;

export const getServerSideProps = requirePageAuth(async (context, session) => {
    const { token, user } = session;

    let balances = [];
    try {
        const res = await api.get.loansBalances({ email: user.email, token });

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
        console.log(err);
        return {
            props: { error: true, errorMessage: err.message, balances: [] },
            // redirect: {
            //     destination: '/sessionexpired',
            //     permanent: false,
            // },
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
