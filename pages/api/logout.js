import { serialize } from 'cookie';

export default async function logout(req, res) {
    const { cookies } = req;

    const token = cookies.session;
    console.log(token);
}
