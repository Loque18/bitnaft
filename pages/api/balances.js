import { decrypt } from 'src/utils/hash';

import axios from 'axios';

const { ENDPOINT } = process.env;

export default async function balances(req, res) {
    const { session } = req.cookies;

    console.log('sessionEncrypted', req.cookies);

    // if (!sessionEncrypted) {
    //     res.status(401).send({ status: 'fail', data: { message: 'You are not logged in' } });
    //     return;
    // }

    // const session = decrypt(sessionEncrypted);

    // try {
    //     const { token } = session;

    //     console.log(session);

    //     const params = `?email=${session.user.email}?token=${token}`;
    //     // const response = await axios({
    //     //     method: 'get',
    //     //     url: `${ENDPOINT}/balances/${params}`,
    //     // });

    //     // console.log(response.data);

    //     // if (response.data.success) {
    //     //     const { balances } = response.data;
    //     //     const decryptedBalances = balances.map(balance => {
    //     //         const { currency, balance: encryptedBalance } = balance;
    //     //         const decryptedBalance = decrypt(encryptedBalance);
    //     //         return { currency, balance: decryptedBalance };
    //     //     });
    //     //     res.status(200).send({ status: 'success', data: { balances: decryptedBalances } });
    //     // } else {
    //     //     res.status(200).send({ status: 'fail', data: { message: response.data.message } });
    //     // }
    // } catch (err) {
    //     // res.status(500).send({ status: 'error', message: err.message });
    // }

    res.send({ ok: true });
}
