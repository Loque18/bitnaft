import DashboardSubPage from 'src/layouts/dashboard-sub-page';
import SavingsTable from 'src/components/tables/savings-table';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

const SavingsPage = () => {
    return <DashboardSubPage title="Savings" table={<SavingsTable />} />;
};

SavingsPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Savings');
export default SavingsPage;
