import Link from 'next/link';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import styles from './404.module.scss';

const { container, title, button } = styles;

const Page404 = () => {
    return (
        <div className={container}>
            <div className="container px-5" style={{ paddingTop: '3.5rem', height: '100%' }}>
                <h1 className={title}>404</h1>
                <p className="title has-text-centered">The page you are looking for does not exist.</p>
                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <Link href="/home" passHref>
                        <a href="replace" className={`button is-hblue is-large  ${button}`}>
                            Go to home
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Page404.getLayout = page => getPageTitleLayout(getMainLayout(page), '404 Not Found');

export default Page404;
