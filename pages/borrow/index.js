import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import BitnaftBanner from 'src/layouts/bitnaft-banner';
import Tabs from 'src/layouts/tabs';
import { portfolioTabList } from 'src/static/tab-list';

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
        </div>
    );
};

BorrowPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Borrow');
export default BorrowPage;
