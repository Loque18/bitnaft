/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';

import { getLayout as usePageTitleLayout } from 'src/layouts/page-title';

import SignupForm from 'src/sub-components/signup/form';

import styles from 'src/scss/common_modules/box.module.scss';

const { box_container, box_column } = styles;

const SignUpPage = () => {
    return (
        <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
            <div
                className="container is-max-desktop py-6 px-5"
                style={{ height: '100%', display: 'grid', placeItems: 'center' }}
            >
                <div className={`box  p-0 ${box_container}`} style={{ height: '100%', maxHeight: '100%' }}>
                    <div className={`has-bg-md-ref-primary-30 p-5 ${box_column}`}>
                        <div
                            className="col-container "
                            style={{ height: '100%', display: 'grid', placeItems: 'center' }}
                        >
                            <div>
                                <img src="media/pages/signup/bg-img.webp" alt="" />
                                <div className="has-text-centered mt-5">
                                    <img src="media/logos/logo-light.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={` p-5 ${box_column}`}
                        style={{
                            height: '100%',
                            display: 'grid',
                            placeItems: 'center',
                        }}
                    >
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

SignUpPage.usePageTitleLayout = page => usePageTitleLayout('Sign Up', page);

export default SignUpPage;

export const getServerSideProps = async ctx => {
    const { session } = ctx.req.cookies;

    if (session) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
            props: {},
        };
    }

    return {
        props: {},
    };
};
