import { useRouter } from 'next/router';
import Tabs from 'src/layouts/tabs';
import { dashboardTabList } from 'src/static/tab-list';
import BalanceDisplayer from 'src/components/internal/balance-displayer';

import getBalances from 'src/utils/get-balances/indes';

const DashboardSubPage = ({ title, children, walletAssets, savingsAssets }) => {
    const balance = getBalances(walletAssets);
    const totalBalance = getBalances(savingsAssets) + balance;

    const router = useRouter();

    const redirectToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <section className="section pt-4">
            <div className="container">
                <div className="is-flex is-align-items-center">
                    <button type="button" className="unstyled-button" onClick={redirectToDashboard}>
                        <span className="icon is-small has-text-md-black">
                            <i className="is-clickable fas fa-chevron-left" />
                        </span>
                    </button>
                    <h1 className="is-size-6 has-text-md-black has-font-roboto has-text-weight-medium pl-2">
                        Dashboard / {title}
                    </h1>
                </div>
                <div className="columns is-gapless pt-4">
                    <div className="column is-clipped is-flex is-align-items-flex-start is-justify-content-flex-start">
                        <BalanceDisplayer balance={balance} totalBalance={totalBalance} />
                    </div>
                    <div className="column is-flex is-align-items-flex-start is-justify-content-flex-end">
                        {/* <AssetsPieChart /> */}
                    </div>
                </div>
                <div className="columns py-4">
                    <div className="column">
                        <Tabs tabs={dashboardTabList} />
                    </div>
                </div>
                <div className="columns">
                    <div className="column">{children}</div>
                </div>
            </div>
        </section>
    );
};

export const getLayout = (page, title) => {
    const { walletAssets, savingsAssets } = page.props;
    return (
        <DashboardSubPage title={title} walletAssets={walletAssets} savingsAssets={savingsAssets}>
            {page}
        </DashboardSubPage>
    );
};

export default DashboardSubPage;
