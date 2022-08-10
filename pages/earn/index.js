import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import BitnaftBanner from 'src/layouts/bitnaft-banner';
import PortfolioCard from 'src/components/internal/assets-cards/portfolio-card';
import SavingsOfferTable from 'src/components/tables/savings-offer-table';

const EarnPage = () => {
    return (
        <div>
            <BitnaftBanner
                title="Bitnaft earn"
                description="Lorem ipsum dolor sit amet consectetur adipiscing elit."
                background="earn-banner"
            />
            <div className="columns is-centered">
                <div className="column">
                    <PortfolioCard />
                </div>
            </div>
            <section className="section pt-0">
                <div className="columns pb-4">
                    <div className="column is-flex">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Savings offers
                        </h1>
                    </div>
                </div>
                <SavingsOfferTable />
            </section>
        </div>
    );
};

EarnPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Earn');
export default EarnPage;
