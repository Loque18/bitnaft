import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import BitnaftBanner from 'src/layouts/bitnaft-banner';
import PortfolioCard from 'src/components/internal/assets-cards/portfolio-card';
import SavingsOfferTable from 'src/components/tables/savings-offer-table';

const EarnPage = () => {
    return (
        <div>
            <BitnaftBanner title="Bitnaft earn" description="Lorem ipsum dolor sit amet consectetur adipiscing elit." />
            <div className="columns is-centered">
                <div className="column">
                    <PortfolioCard />
                </div>
            </div>
            <section className="section">
                <h1 className="title has-text-centered has-text-md-black-o-7 has-font-roboto">Savings offers</h1>
                <SavingsOfferTable />
            </section>
        </div>
    );
};

EarnPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Earn');
export default EarnPage;
