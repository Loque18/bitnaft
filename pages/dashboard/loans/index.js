import DashboardSubPage from 'src/layouts/dashboard-sub-page';
import LoansTable from 'src/components/tables/loans-table';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

const LoansPage = () => {
    return <DashboardSubPage title="Loans" children={<LoansTable />} />;
};

LoansPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Loans');
export default LoansPage;
