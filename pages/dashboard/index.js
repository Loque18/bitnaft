import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import OwnedAssetsCard from 'src/components/internal/assets-cards/owned-assests-card';
import LoanedAssetsCard from 'src/components/internal/assets-cards/assests-loan-card';

import api from 'src/api';

import requirePageAuth from 'src/functions/require-page-auth';

import getBalances from 'src/utils/get-balances/indes';

// eslint-disable-next-line no-unused-vars
const Dashboard = ({ session, walletAssets, savingsAssets, loansAssets }) => {
    const { user } = session;

    const noneZeroBalancesWallet = walletAssets.filter(asset => asset.usdValue > 0);
    const noneZeroSavingAssets = savingsAssets.filter(asset => asset.usdValue > 0);
    const userWalletBalance = getBalances(noneZeroBalancesWallet);
    const userSavingsBalance = getBalances(savingsAssets.filter(asset => asset.savingsBalance > 0));
    // const sbalances = getUserBalances(savingsAssets);
    // const lbalances = getUserBalances(loansAssets);

    // console.log(loansAssets);

    return (
        <section className="section">
            <div className="container">
                <h1 className="subtitle is-size-3 has-text-md-source-primary has-font-roboto-medium">
                    Welcome back, {user.email} !
                </h1>
                <div className="columns">
                    <div className="column">
                        <p className="is-size-5 has-text-md-black-o-7 has-font-roboto-medium">Overview</p>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-narrow">
                        <OwnedAssetsCard
                            title="Wallet"
                            to="/dashboard/wallet"
                            icon="fas fa-wallet"
                            amount={userWalletBalance}
                            cryptoIcons={noneZeroBalancesWallet.slice(0, 4).map(asset => asset.icon)}
                            numberOfAssets={noneZeroBalancesWallet.length}
                        />
                    </div>
                    <div className="column is-narrow">
                        <OwnedAssetsCard
                            title="Savings"
                            to="/dashboard/savings"
                            icon="fa-solid fa-sack-dollar"
                            amount={userSavingsBalance}
                            cryptoIcons={noneZeroSavingAssets.slice(0, 4).map(asset => asset.icon)}
                            numberOfAssets={noneZeroSavingAssets.length}
                        />
                    </div>
                    <div className="column is-narrow">
                        <LoanedAssetsCard
                            title="Loans"
                            to="/dashboard/loans"
                            icon="fa-solid fa-hand-holding-dollar"
                            lastLoan={loansAssets[0]}
                            // amount={1.5}
                            // cryptoIcon="https://bitcoin.org/img/icons/opengraph.png?1657703267"
                            numberOfLoanedAssets={loansAssets.length}
                            // payBeforeDate={1659603600}
                        />
                    </div>
                </div>

                {/* asd */}
                {/* <section className="mb-6">
                    <AssetsTable assets={walletAssets} />
                </section>

                <section className="mb-6">
                    <SavingsTable assets={savingsAssets} walletAssets={walletAssets} />
                </section>

                <section className="mb-6">
                    <LoansTable walletAssets={walletAssets} assets={loansAssets} />;
                </section> */}
            </div>
        </section>
    );
};

Dashboard.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Dashboard');

export default Dashboard;

export const getServerSideProps = requirePageAuth(async (ctx, sessionWithToken) => {
    const { user, token } = sessionWithToken;
    const { email } = user;

    const session = { ...sessionWithToken };
    delete session.token;

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
            props: { error: true, errorMessage: error.message, balances: [] },
        };
    }

    return {
        props: {
            session,
            walletAssets: assets[0],
            savingsAssets: assets[1],
            loansAssets: assets[2],
        },
    };
});
