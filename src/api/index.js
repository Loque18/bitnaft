import axios from 'axios';

const endpoint = process.env.ENDPOINT;

const api = {
    get: {},
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
    },
    put: {},
    delete: {},
};

export default api;
