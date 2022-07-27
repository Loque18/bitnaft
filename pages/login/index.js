import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import LoginForm from 'src/sub-components/login/form';

import styles from 'src/scss/common_modules/box.module.scss';

const { box_container, box_column, is_reverse } = styles;

const LoginPage = () => {
    return (
        <div style={{ height: '100vh' }}>
            <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
                <div
                    className="container is-max-desktop py-6 px-5"
                    style={{ height: '100%', display: 'grid', placeItems: 'center' }}
                >
                    <div
                        className={`box p-0 ${box_container} ${is_reverse}`}
                        style={{ height: '100%', maxHeight: '100%' }}
                    >
                        <div className={`has-bg-md-ref-primary-30 p-5 ${box_column} `}>
                            <div
                                className="col-container "
                                style={{ height: '100%', display: 'grid', placeItems: 'center' }}
                            >
                                <div>
                                    <img src="media/pages/login/bg.webp" alt="" width="50%" />
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
                            <div>
                                <section className="mb-5">
                                    <h1 className="title is-4 has-text-hblue has-text-centered">Welcome back!</h1>
                                    <p className="has-text-centered">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis
                                        mauris.{' '}
                                    </p>
                                </section>
                                <section>
                                    <LoginForm />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = page => getPageTitleLayout(page, 'Login');

export default LoginPage;
