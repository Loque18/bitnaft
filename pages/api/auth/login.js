import { serialize } from 'cookie';
import api from 'src/api';

import { encrypt } from 'src/utils/hash';

export default async function login(req, res) {
    const { email, password } = req.body;

    try {
        const response = await api.post.login({ email, password });

        if (response.data.success) {
            const { token } = response.data;
            const session = { user: { email }, token, isLoggedIn: true };
            const encryptedSession = encrypt(JSON.stringify(session));

            const sessionSerialized = serialize('session', encryptedSession, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60,
                path: '/',
            });

            res.setHeader('Set-Cookie', sessionSerialized);

            res.status(200).send({ status: 'success', data: { ...session } });
        } else {
            res.status(200).send({ status: 'fail', data: { message: response.data.message } });
        }
    } catch (err) {
        res.status(500).send({ status: 'error', message: err.message });
    }
}
