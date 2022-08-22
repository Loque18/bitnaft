import { useRef } from 'react';
import { Element } from 'react-scroll';

import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import OwnedAssetsCard from 'src/components/internal/assets-cards/owned-assests-card';
import LoanedAssetsCard from 'src/components/internal/assets-cards/assests-loan-card';

import api from 'src/api';

import requirePageAuth from 'src/functions/require-page-auth';

import getBalances from 'src/utils/get-balances/indes';

import AssetsTable from 'src/components/tables/assets-table';
import SavingsTable from 'src/components/tables/savings-table';
import LoansTable from 'src/components/tables/loans-table';
import Link from 'next/link';

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

    const walletRef = useRef(null);
    const savingsRef = useRef(null);
    const loansRef = useRef(null);

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
                            to="walletelement"
                            icon="fas fa-wallet"
                            amount={userWalletBalance}
                            cryptoIcons={noneZeroBalancesWallet.slice(0, 4).map(asset => asset.icon)}
                            numberOfAssets={noneZeroBalancesWallet.length}
                        />
                    </div>
                    <div className="column is-narrow">
                        <OwnedAssetsCard
                            title="Savings"
                            to="savingselement"
                            icon="fa-solid fa-sack-dollar"
                            amount={userSavingsBalance}
                            cryptoIcons={noneZeroSavingAssets.slice(0, 4).map(asset => asset.icon)}
                            numberOfAssets={noneZeroSavingAssets.length}
                            ref={savingsRef}
                            element={savingsRef.current}
                        />
                    </div>
                    <div className="column is-narrow">
                        <LoanedAssetsCard
                            title="Loans"
                            to="loanselement"
                            icon="fa-solid fa-hand-holding-dollar"
                            lastLoan={loansAssets[0]}
                            // amount={1.5}
                            // cryptoIcon="https://bitcoin.org/img/icons/opengraph.png?1657703267"
                            numberOfLoanedAssets={loansAssets.length}
                            // payBeforeDate={1659603600}
                        />
                    </div>
                </div>

                <br />

                {/* asd */}
                <section className="mb-6">
                    <Element
                        name="walletelement"
                        className="title is-size-5 has-text-md-source-primary has-font-roboto-medium"
                    >
                        Wallet
                    </Element>

                    <AssetsTable assets={walletAssets} />
                </section>

                <section className="mb-6">
                    <Element
                        name="savingselement"
                        className="is-flex is-flex-direction-row is-justify-content-space-between"
                    >
                        <h1 className="title is-size-5 has-text-md-source-primary has-font-roboto-medium">Savings</h1>
                        <h1 className="title is-size-5 has-text-md-source-primary has-font-roboto-medium is-clickable">
                            <Link
                                className='className="title is-size-5 has-text-md-source-primary has-font-roboto-medium'
                                href="/earn"
                            >
                                <span>
                                    Savings offers{' '}
                                    <span className="icon">
                                        <i className="fa-solid fa-arrow-up-right-from-square" />
                                    </span>
                                </span>
                            </Link>
                        </h1>
                    </Element>
                    <SavingsTable assets={savingsAssets} walletAssets={walletAssets} />
                </section>

                <section id="loans" className="mb-6">
                    <Element
                        name="loanselement"
                        className="is-flex is-flex-direction-row is-justify-content-space-between"
                    >
                        <h1 className="title is-size-5 has-text-md-source-primary has-font-roboto-medium">Loans</h1>
                        <h1 className="title is-size-5 has-text-md-source-primary has-font-roboto-medium is-clickable">
                            <Link
                                className='className="title is-size-5 has-text-md-source-primary has-font-roboto-medium'
                                href="/borrow"
                            >
                                <span>
                                    Loan application{' '}
                                    <span className="icon">
                                        <i className="fa-solid fa-arrow-up-right-from-square" />
                                    </span>
                                </span>
                            </Link>
                        </h1>
                    </Element>
                    <LoansTable walletAssets={walletAssets} assets={loansAssets} />
                </section>
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
