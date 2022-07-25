import Image from 'next/image';

import { getLayout as usePageTitleLayout } from 'src/layouts/page-title';

import SignupForm from './form';

const SignUpPage = () => {
    return (
        <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
            <div className="container is-max-desktop py-6" style={{ height: '100%' }}>
                <div
                    className="box is-flex is-flex-direction-row has-border-radius-20 p-0"
                    style={{ height: '100%', overflow: 'hidden' }}
                >
                    <div className=" has-bg-md-ref-primary-30 p-5" style={{ height: '100%', flexBasis: '50%' }}>
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
                        className="p-5"
                        style={{
                            height: '100%',
                            flexBasis: '50%',
                            display: 'grid',
                            placeItems: 'center',
                        }}
                    >
                        {/* <div className="col-container has-background-primary">asd</div> */}
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

SignUpPage.usePageTitleLayout = page => usePageTitleLayout('Sign Up', page);

export default SignUpPage;
