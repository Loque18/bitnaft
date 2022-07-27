/* eslint-disable @next/next/no-img-element */
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import useCountdown from 'src/hooks/useCountdown';

import styles from './box.module.scss';
import Link from 'next/link';
import { useEffect } from 'react';

const { box_container } = styles;

const VerifyEmailPage = () => {
    // if not email provided redirect to signup

    const { timeLeft, isCompleted } = useCountdown(10);

    useEffect(() => {
        if (isCompleted) {
            window.location.href = '/login';
        }
    }, [isCompleted]);

    return (
        <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
            <div
                className="container is-max-desktop py-6 px-5"
                style={{ height: '100%', display: 'grid', placeItems: 'center' }}
            >
                <div className={`box ${box_container}`}>
                    <section className="has-text-centered">
                        <img src="media/pages/verifyemail/email_ok.webp" alt="" width="40%" />
                    </section>
                    <section id="verify_email_title mb-6">
                        <h1 className="title is-4 has-text-hblue has-text-centered">Email verified successfully!</h1>
                        <p className="has-text-centered">
                            Redirecting you to{' '}
                            <Link href="/login">
                                <a href="replace" className="has-text-hblue">
                                    <u>Log in</u>
                                </a>
                            </Link>{' '}
                            page in {timeLeft} seconds.
                        </p>
                    </section>
                    <section className="has-text-centered"></section>
                </div>
            </div>
        </div>
    );
};

VerifyEmailPage.getLayout = page => getPageTitleLayout(page, 'Please verify your email');

export default VerifyEmailPage;
