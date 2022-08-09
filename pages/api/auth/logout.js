import { serialize } from 'cookie';

const { SESSION_KEY, DURATION_KEY } = process.env;

export default async function logout(req, res) {
    const session = req.cookies[SESSION_KEY];

    if (!session) {
        res.status(200).send({ status: 'fail', data: { message: 'Session not found' } });
    } else {
        const sessionSerialized = serialize(SESSION_KEY, null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: -1,
            path: '/',
        });

        const durationSerialized = serialize(DURATION_KEY, null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: -1,
            path: '/',
        });

        res.setHeader('Set-Cookie', [sessionSerialized, durationSerialized]);

        res.status(200).send({ status: 'success', data: { message: 'Successfuly logged out' } });
    }
}
