/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { Store as NotificationsStore } from 'react-notifications-component';

import api from 'src/api';

import { successNotification, errorNotification } from 'src/static/notifications';

import styles from './box.module.scss';

const { box_container, box_column } = styles;

const VerifyEmailPage = () => {
    const router = useRouter();
    const { email } = router.query;

    const [loading, setLoading] = useState(false);

    const handleResendEmail = async () => {
        // verify email
        setLoading(true);
        try {
            const res = await api.post.resendVerificationEmail({ email });

            if (res.data.success) {
                NotificationsStore.addNotification(
                    successNotification('Verification email sent', 'Please check your email')
                );
            }
        } catch (err) {
            NotificationsStore.addNotification(errorNotification('Verification email failed', err.message));
        } finally {
            setLoading(false);
        }
    };

    // if not email provided redirect to signup

    return (
        <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
            <div
                className="container is-max-desktop py-6 px-5"
                style={{ height: '100%', display: 'grid', placeItems: 'center' }}
            >
                <div className={`box ${box_container}`} style={{ height: '100%', maxHeight: '100%' }}>
                    <section id="verify_email_title mb-6">
                        <h1 className="title is-4 has-text-hblue has-text-centered">Verify your email</h1>
                        <p className="has-text-centered">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.{' '}
                        </p>
                    </section>
                    <section className="has-text-centered">
                        <img src="media/pages/verifyemail/bg.webp" alt="" width="60%" />
                    </section>
                    <section className="has-text-centered">
                        <button
                            className={`button is-md-ref-primary-30 ${loading ? 'is-loading' : ''}`}
                            type="button"
                            onClick={handleResendEmail}
                        >
                            Resend email
                        </button>
                    </section>
                    {/* <div className={`has-bg-md-ref-primary-30 p-5 `}>
                        <div
                            className="col-container "
                            style={{ height: '100%', display: 'grid', placeItems: 'center' }}
                        >
                        </div>
                    </div>
                    <div
                        className={` p-5 `}
                        style={{
                            height: '100%',
                            display: 'grid',
                            placeItems: 'center',
                        }}
                    >
                    </div> */}
                </div>
            </div>
        </div>
    );
};

VerifyEmailPage.getLayout = page => getPageTitleLayout(page, 'Please verify your email');

export default VerifyEmailPage;
