import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import styles from './box.module.scss';

const { box_container, box_column } = styles;

const LoginPage = () => {
    return (
        <div style={{ height: '100vh' }}>
            <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
                <div
                    className="container is-max-desktop py-6 px-5"
                    style={{ height: '100%', display: 'grid', placeItems: 'center' }}
                >
                    <div className={`box p-0 ${box_container}`} style={{ height: '100%', maxHeight: '100%' }}>
                        <div
                            className={` p-5 ${box_column}`}
                            style={{
                                height: '100%',
                                display: 'grid',
                                placeItems: 'center',
                            }}
                        ></div>
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
                    </div>
                    {/* <div className={`box  p-0 ${box_container}`} style={{ height: '100%', maxHeight: '100%' }}>
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = page => getPageTitleLayout(page, 'Login');

export default LoginPage;
