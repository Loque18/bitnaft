import { serialize } from 'cookie';
import api from 'src/api';

export default async function login(req, res) {
    const { email, password } = req.body;

    try {
        const response = await api.post.login({ email, password });

        if (response.data.success) {
            const { token } = response.data;

            const session = { user: { email }, token, isLoggedIn: true };

            const sessionSerialized = serialize('session', JSON.stringify(session), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7,
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
