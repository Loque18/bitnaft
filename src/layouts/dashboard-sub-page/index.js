import { useRouter } from 'next/router';
import Tabs from 'src/layouts/tabs';
import tabList from 'src/static/tab-list';
import BalanceDisplayer from 'src/components/internal/balance-displayer';
import AssetsDistributionPieChart from 'src/components/assets-distribution-pie-chart';

const DashboardSubPage = props => {
    const { title, table } = props;
    const router = useRouter();

    const redirectToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <section className="section pt-4">
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
            <div className="columns pt-4">
                <div className="column is-one-fifth">
                    <BalanceDisplayer />
                </div>
                {/* <div className="column is-offset-8"><AssetsDistributionPieChart /></div> */}
            </div>
            <div className="columns py-4">
                <div className="column">
                    <Tabs tabs={tabList} />
                </div>
            </div>
            <div className="columns">
                <div className="column">{table}</div>
            </div>
        </section>
    );
};

export default DashboardSubPage;
