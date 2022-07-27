/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import api from 'src/api';

import { useEffect } from 'react';

const VerifyEmailPage = () => {
    const { query } = useRouter();

    useEffect(() => {
        const { email, verificationToken } = query;

        if (!email || !verificationToken) return;

        (async () => {
            try {
                console.log('query', query);
                const res = await api.post.verifyEmail({ email, verificationToken });
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }

                window.location.href = '/emailverified';
            } catch (err) {
                console.log(err);
                window.location.href = `/verifyerror`;
            }
        })();
    }, [query]);

    return null;
};

VerifyEmailPage.getLayout = page => getPageTitleLayout(page, '');

export default VerifyEmailPage;
