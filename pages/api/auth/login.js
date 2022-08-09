import { serialize } from 'cookie';
import api from 'src/api';

import { encrypt } from 'src/utils/hash';

const { SESSION_KEY, DURATION_KEY } = process.env;

export default async function login(req, res) {
    const { email, password } = req.body;

    try {
        const response = await api.post.login({ email, password });

        if (response.data.success) {
            const maxAge = 60 * 60;
            const { token } = response.data;
            const session = { user: { email }, token, isLoggedIn: true };
            const encryptedSession = encrypt(JSON.stringify(session));

            const sessionSerialized = serialize(SESSION_KEY, encryptedSession, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge,
                path: '/',
            });

            // get current date + 60 seconds in unix timestamp
            const expireTimestamp = new Date(Date.now() + maxAge * 1000).getTime();
            const encryptedExpireTimestamp = encrypt(expireTimestamp.toString());

            const durationSerialized = serialize(DURATION_KEY, encryptedExpireTimestamp, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge,
                path: '/',
            });

            res.setHeader('Set-Cookie', [sessionSerialized, durationSerialized]);

            res.status(200).send({
                status: 'success',
                data: {
                    user: { email },
                    isLoggedIn: true,
                    expireTimestamp,
                },
            });
        } else {
            res.status(200).send({ status: 'fail', data: { message: response.data.message } });
        }
    } catch (err) {
        res.status(500).send({ status: 'error', message: err.message });
    }
}
