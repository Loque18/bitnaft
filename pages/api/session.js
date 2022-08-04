// get user data from cookie
export default async function getSession(req, res) {
    const { session } = req.cookies;

    if (!session) {
        res.status(200).send({ status: 'fail', data: { message: 'Session not found' } });
    } else {
        res.status(200).send({ status: 'success', data: { ...JSON.parse(session) } });
    }
}
