import api from 'src/api';

import { decrypt } from 'src/utils/hash';

const { SESSION_KEY } = process.env;

export default async function redeemSavingProfit(req, res) {
    const session = req.cookies[SESSION_KEY];

    if (!session) {
        res.status(200).send({ status: 'fail', data: { message: 'Session not found' } });
    }

    const sessionData = JSON.parse(decrypt(session));
    const { token, user } = sessionData;
    const { email } = user;

    const { collateralName, borrowName, borrowAmount } = req.query;

    try {
        const response = await api.get.collateralNeeded({
            email,
            token,
            collateralName,
            borrowName,
            borrowAmount,
        });

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
        return res.status(200).send({
            status: 'error',
            message: err.message,
        });
    }
}
