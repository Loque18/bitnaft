import axios from 'axios';

const endpoint = process.env.ENDPOINT;

const api = {
    get: {
        getQRCode: ({ userAddress }) => {
            return axios({
                method: 'get',
                url: `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${userAddress}&choe=UTF-8`,
            });
        },

        balances: ({ email, token }) => {
            const params = `?email=${email}&sessionToken=${token}`;
            return axios({
                method: 'get',
                url: `${endpoint}/balances/${params}`,
            });
        },
        savingsBalances: ({ email, token }) => {
            const params = `?email=${email}&sessionToken=${token}`;
            return axios({
                method: 'get',
                url: `${endpoint}/savingsBalances/${params}`,
            });
        },
        loansBalances: ({ email, token }) => {
            const paras = `?email=${email}&sessionToken=${token}`;
            return axios({
                method: 'get',
                url: `${endpoint}/loans/${paras}`,
            });
        },
    },
    post: {
        signup: ({ email, password }) => {
            const params = `?email=${email}&pass=${password}`;
            return axios({
                method: 'post',
                url: `${endpoint}/signup/${params}`,
            });
        },
        verifyEmail: ({ email, verificationToken }) => {
            const params = `?email=${email}&verificationToken=${verificationToken}`;
            return axios({
                method: 'post',
                url: `${endpoint}/verifyEmail/${params}`,
            });
        },
        resendVerificationEmail: ({ email }) => {
            const params = `?email=${email}`;
            return axios({
                method: 'post',
                url: `${endpoint}/resendverificationemail/${params}`,
            });
        },
        login: ({ email, password }) => {
            const params = `?email=${email}&pass=${password}`;
            return axios({
                method: 'post',
                url: `${endpoint}/login/${params}`,
            });
        },
        requestPasswordReset: ({ email }) => {
            const params = `?email=${email}`;
            return axios({
                method: 'post',
                url: `${endpoint}/requestpassreset/${params}`,
            });
        },
    },
    put: {},
    delete: {},
};

export default api;
