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
        verifyEmail: ({ email, token }) => {
            const params = `?email=${email}&verificationToken=${token}`;
            return axios({
                method: 'post',
                url: `${endpoint}/verifyemail/${params}`,
            });
        },
        resendVerificationEmail: ({ email }) => {
            const params = `?email=${email}`;
            return axios({
                method: 'post',
                url: `${endpoint}/resendverificationemail/${params}`,
            });
        },
    },
    put: {},
    delete: {},
};

export default api;
