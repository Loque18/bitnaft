import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import BitnaftBanner from 'src/layouts/bitnaft-banner';
import Tabs from 'src/layouts/tabs';
import { portfolioTabList } from 'src/static/tab-list';
import LoanApplicationForm from 'src/components/internal/loan-application-form';

import styles from './styles.module.scss';

const { bordered_hr } = styles;

const BorrowPage = () => {
    return (
        <div>
            <BitnaftBanner
                title="Bitnaft loans"
                description="Lorem ipsum dolor sit amet consectetur adipiscing elit."
                background="earn-banner"
            />
            <section className="section">
                <Tabs tabs={portfolioTabList} />
            </section>
            <section className="section is-hidden-mobile pt-0">
                {/* TODO: Adjust this section to fit in screens starting from 1024px */}
                <div className="columns mb-0 is-gapless">
                    <div className="column is-narrow is-flex is-align-items-center">
                        <span className="icon pr-1 is-size-4 has-text-md-source-primary">
                            <i className="fas fa-hand-holding-usd" />
                        </span>
                    </div>
                    <div className="column is-narrow is-flex is-align-items-center">
                        <hr className={`${bordered_hr}`} />
                    </div>
                    <div className="column mx-1 is-narrow is-flex is-align-items-center">
                        <span className="icon is-size-4 has-text-md-source-primary">
                            <i className="fas fa-money-bill-transfer" />
                        </span>
                    </div>
                    <div className="column is-narrow is-flex is-align-items-center">
                        <hr className={`${bordered_hr}`} />
                    </div>
                    <div className="column mx-1 is-narrow is-flex is-align-items-center">
                        <span className="icon is-size-4 has-text-md-source-primary">
                            <i className="fas fa-arrow-right-to-bracket" />
                        </span>
                    </div>
                    <div className="column is-narrow is-flex is-align-items-center">
                        <hr className={`${bordered_hr}`} />
                    </div>
                    <div className="column mx-1 is-narrow is-flex is-align-items-center">
                        <span className="icon is-size-4 has-text-md-source-primary">
                            <i className="fa-light fa-coin-front" />
                        </span>
                    </div>
                    <div className="column is-narrow is-flex is-align-items-center">
                        <hr className={`${bordered_hr}`} />
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-flex is-align-items-center">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Create loan request
                        </h1>
                    </div>
                    <div className="column mr-5 is-flex is-align-items-center">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Assets get transfered
                        </h1>
                    </div>
                    <div className="column mr-5 is-flex is-align-items-center">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Pay off your loan
                        </h1>
                    </div>
                    <div className="column mr-6 is-flex is-align-items-center">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Get your collateral back
                        </h1>
                    </div>
                </div>
            </section>
            <section className="section pt-0">
                <LoanApplicationForm />
            </section>
        </div>
    );
};

BorrowPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Borrow');
export default BorrowPage;
