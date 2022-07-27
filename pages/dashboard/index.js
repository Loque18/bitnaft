import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import OwnedAssetsCard from 'src/components/internal/assets-cards/owned-assests-card';
import AssetsTable from 'src/components/tables/assets-table';

const Dashboard = () => {
    return (
        <section className="hero p-5">
            <div className="hero-body">
                <h1 className="subtitle is-size-3 has-text-md-source-primary has-font-roboto-medium">
                    Welcome back, user@email.com !
                </h1>
                <div className="columns">
                    <div className="column">
                        <p className="is-size-5 has-text-md-black has-font-roboto-medium" style={{ opacity: '75%' }}>
                            Overview
                        </p>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-3">
                        <OwnedAssetsCard
                            title="Wallet"
                            to="/dashboard/wallet"
                            icon="fas fa-wallet"
                            amount={8800.003}
                            cryptoIcons={[
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                            ]}
                            numberOfAssets={15}
                        />
                    </div>
                    <div className="column is-3">
                        <OwnedAssetsCard
                            title="Savings"
                            to="/dashboard/savings"
                            icon="fa-solid fa-sack-dollar"
                            amount={50523.001}
                            cryptoIcons={[
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                            ]}
                            numberOfAssets={4}
                        />
                    </div>
                </div>
                <div className="columns pt-5">
                    <div className="column">
                        <AssetsTable />
                    </div>
                </div>
            </div>
        </section>
    );
};

Dashboard.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Dashboard');
export default Dashboard;
