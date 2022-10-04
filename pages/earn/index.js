import { useRouter } from 'next/router';
import { useState } from 'react';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import BitnaftBanner from 'src/layouts/bitnaft-banner';
import SavingsOfferTable from 'src/components/tables/savings-offer-table';

import api from 'src/api';

import requirePageAuth from 'src/functions/require-page-auth';

const EarnPage = ({ savingOffers, error, errorMessage, walletAssets }) => {
    const { query } = useRouter();

    const [type] = useState(query.type || 'conventional');

    if (error) {
        return (
            <div className="container">
                <div className="notification is-danger">{errorMessage}</div>
            </div>
        );
    }

    return (
        <div>
            <BitnaftBanner
                title={`Bitnaft earn | ${type}`}
                description="Deposit and earn while you sleep"
                background="earn-banner"
            />
            <div className="container">
                <section className="section px-2">
                    <div className="columns pb-4">
                        <div className="column is-flex">
                            <h1 className="title is-size-4 has-text-md-black-o-7 has-font-roboto has-text-weight-light">
                                Savings offers
                            </h1>
                        </div>
                    </div>
                    <SavingsOfferTable assets={savingOffers} walletAssets={walletAssets} />
                </section>
            </div>
        </div>
    );
};

EarnPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Earn');

export default EarnPage;

export const getServerSideProps = requirePageAuth(async (_ctx, session) => {
    const { token, user } = session;

    const balancesFunctions = [api.get.balances, api.get.savingsBalances];

    const assets = [];
    try {
        const responses = await Promise.all(balancesFunctions.map(func => func({ email: user.email, token })));

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
            props: { error: true, errorMessage: error.message },
        };
    }

    return {
        props: {
            walletAssets: assets[0],
            savingOffers: assets[1],
        },
    };
});
