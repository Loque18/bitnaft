import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

const HomePage = () => {
    return (
        <div className="has-bg-md-source-primary" style={{ height: '100vh' }}>
            home
        </div>
    );
};

HomePage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Home');

export default HomePage;
