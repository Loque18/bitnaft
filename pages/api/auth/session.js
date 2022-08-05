// get user data from cookie
import { decrypt } from 'src/utils/hash';

export default async function getSession(req, res) {
    const { session } = req.cookies;

    if (!session) {
        res.status(200).send({ status: 'fail', data: { message: 'Session not found' } });
    } else {
        const sessionData = JSON.parse(decrypt(session));
        delete sessionData.token;
        res.status(200).send({ status: 'success', data: sessionData });
    }
}
