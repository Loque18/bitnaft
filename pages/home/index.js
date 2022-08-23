import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { toast } from 'react-toastify';

const HomePage = () => {
    const { query } = useRouter();

    useEffect(() => {
        if (query.verified) {
            toast.success('Email verified successfully');
            window.history.replaceState(null, '', '/home');
        }
    }, [query]);

    return (
        <div className="has-bg-md-source-primary" style={{ height: '100vh' }}>
            home
        </div>
    );
};

HomePage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Home');

export default HomePage;
