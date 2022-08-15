import api from 'src/api';

import { decrypt } from 'src/utils/hash';

const { SESSION_KEY } = process.env;

export default async function takeLoan(req, res) {
    const session = req.cookies[SESSION_KEY];

    console.log('session', session);

    if (!session) {
        res.status(200).send({ status: 'fail', data: { message: 'Session not found' } });
    }

    const sessionData = JSON.parse(decrypt(session));
    const { token, user } = sessionData;
    const { email } = user;

    const { collateralName, collateralAmount, borrowName, borrowAmount } = req.body;

    try {
        const response = await api.post.takeLoan({
            email,
            token,
            collateral: collateralName,
            collateralAmount,
            borrow: borrowName,
            borrowAmount,
        });

        console.log('response', response);

        if (!response.data.success) {
            return res.status(200).send({
                status: 'fail',
                data: { code: response.data.code, message: response.data.message },
            });
        }

        return res.status(200).send({
            status: 'success',
            data: response.data.data,
        });
    } catch (err) {
        console.log(err);
        return res.status(200).send({
            status: 'error',
            message: err.message,
        });
    }
}
