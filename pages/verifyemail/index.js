/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';

import api from 'src/api';

import { useEffect } from 'react';

const VerifyEmailPage = () => {
    const { query } = useRouter();

    useEffect(() => {
        const { email, verificationToken } = query;

        if (!email || !verificationToken) return;

        (async () => {
            try {
                const res = await api.post.verifyEmail({ email, verificationToken });
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }

                window.location.href = '/emailverified';
            } catch (err) {
                window.location.href = `/verifyerror?message=${err.message}`;
            }
        })();
    }, [query]);

    return null;
};

export default VerifyEmailPage;
