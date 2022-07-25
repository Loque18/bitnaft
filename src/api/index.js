import axios from 'axios';

const endpoint = process.env.ENDPOINT1;

const api = {
    get: {},
    post: {
        signup: ({ email, password }) => {
            const params = `?email=${email}&pass=${password}`;
            axios({
                method: 'post',
                url: `${endpoint}/signup/${params}`,
            });
        },
    },
    put: {},
    delete: {},
};

export default api;
