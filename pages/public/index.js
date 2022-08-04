/* eslint-disable jsx-a11y/anchor-is-valid */
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import Link from 'next/link';
import useSession from 'src/hooks/useSession';

const PublicPage = () => {
    const session = useSession();

    const { isLoggedIn, user } = session;

    return (
        <div style={{ height: '100vh' }}>
            <div className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title ">
                            Public page{' '}
                            <small className="is-size-6">
                                <Link href="/private">
                                    <a>
                                        <u>private page</u>
                                    </a>
                                </Link>
                            </small>
                        </h1>

                        {isLoggedIn ? (
                            <h2 className="subtitle has-text-wqhite">You are logged in as {user.email}</h2>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

PublicPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Public');

export default PublicPage;
