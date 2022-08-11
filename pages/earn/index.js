import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import BitnaftBanner from 'src/layouts/bitnaft-banner';
import PortfolioCard from 'src/components/internal/assets-cards/portfolio-card';
import SavingsOfferTable from 'src/components/tables/savings-offer-table';

import api from 'src/api';

import requirePageAuth from 'src/functions/require-page-auth';

const EarnPage = ({ savingOffers }) => {
    return (
        <div>
            <BitnaftBanner
                title="Bitnaft earn"
                description="Lorem ipsum dolor sit amet consectetur adipiscing elit."
                background="earn-banner"
            />
            <div className="container">
                <div className="columns is-centered">
                    <div className="column">
                        <PortfolioCard />
                    </div>
                </div>
                <section className="section pt-0 px-2">
                    <div className="columns pb-4">
                        <div className="column is-flex">
                            <h1 className="title is-size-4 has-text-md-black-o-7 has-font-roboto has-text-weight-light">
                                Savings offers
                            </h1>
                        </div>
                    </div>
                    <SavingsOfferTable assets={savingOffers} />
                </section>
            </div>
        </div>
    );
};

EarnPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Earn');

export default EarnPage;

export const getServerSideProps = requirePageAuth(async (_ctx, session) => {
    const { token, user } = session;
    let savingOffers = [];
    try {
        const res = await api.get.savingsBalances({ email: user.email, token });

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

        savingOffers = res.data.data;
    } catch (err) {
        return {
            props: { error: true, errorMessage: err.message, savingOffers: [] },
        };
    }

    return {
        props: {
            savingOffers,
        },
    };
});
