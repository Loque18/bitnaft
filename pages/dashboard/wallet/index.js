import DashboardSubPage from 'src/layouts/dashboard-sub-page';
import AssetsTable from 'src/components/tables/assets-table';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

const WalletPage = () => {
    return <DashboardSubPage title="Wallet" table={<AssetsTable />} />;
};

WalletPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Wallet');
export default WalletPage;
