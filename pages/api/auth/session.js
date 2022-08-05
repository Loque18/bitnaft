// get user data from cookie
import { decrypt } from 'src/utils/hash';

const { SESSION_KEY, DURATION_KEY } = process.env;

export default async function getSession(req, res) {
    const session = req.cookies[SESSION_KEY];
    const duration = req.cookies[DURATION_KEY];

    // retrieve cookie metadata

    if (!session) {
        res.status(200).send({ status: 'fail', data: { message: 'Session not found' } });
    } else {
        const sessionData = JSON.parse(decrypt(session));
        delete sessionData.token;
        const expireTimestamp = parseInt(decrypt(duration), 10);
        res.status(200).send({
            status: 'success',
            data: {
                ...sessionData,
                expireTimestamp,
            },
        });
    }
}
