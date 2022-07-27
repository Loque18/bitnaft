/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import styles from 'src/scss/common_modules/box.module.scss';

const { box_container_v } = styles;

const VerifyEmailPage = () => {
    const { query } = useRouter();

    return (
        <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
            <div
                className="container is-max-desktop py-6 px-5"
                style={{ height: '100%', display: 'grid', placeItems: 'center' }}
            >
                <div className={`box ${box_container_v}`}>
                    <section className="has-text-centered">
                        <img src="media/pages/verifyemail/email_wrong.webp" alt="" width="40%" />
                    </section>
                    <section id="verify_email_title mb-6">
                        <h1 className="title is-4 has-text-hblue has-text-centered">
                            We couldn&apos;t verify your email!
                        </h1>
                        <p className="has-text-centered">{query && query.message}</p>
                        <p className="has-text-centered">
                            <Link href="/home">
                                <a href="/">
                                    <u>Go back to the homepage</u>
                                </a>
                            </Link>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

VerifyEmailPage.getLayout = page => getPageTitleLayout(page, 'Please verify your email');

export default VerifyEmailPage;
