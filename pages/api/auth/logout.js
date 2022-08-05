import { serialize } from 'cookie';

export default async function logout(req, res) {
    const { session } = req.cookies;

    if (!session) {
        res.status(200).send({ status: 'fail', data: { message: 'Session not found' } });
    } else {
        const sessionSerialized = serialize('session', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: -1,
            path: '/',
        });

        res.setHeader('Set-Cookie', sessionSerialized);

        res.status(200).send({ status: 'success', data: { message: 'Successfuly logged out' } });
    }
}
