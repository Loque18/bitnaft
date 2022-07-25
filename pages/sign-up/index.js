// import Image from 'next/image';

import { getLayout as usePageTitleLayout } from 'src/layouts/page-title';

const SignUpPage = () => {
    return (
        <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
            <div className="container is-max-desktop py-6" style={{ height: '100%' }}>
                <div
                    className="box is-flex is-flex-direction-column p-0"
                    style={{ height: '100%', overflow: 'hidden' }}
                >
                    <div className="is-flex-grow-1 has-bg-md-ref-primary-10" style={{ height: '100%' }}>
                        asdasd
                    </div>
                    <div className="is-flex-grow-1">asd</div>
                </div>
            </div>
        </div>
    );
};

SignUpPage.usePageTitleLayout = page => usePageTitleLayout('Sign Up', page);

export default SignUpPage;
