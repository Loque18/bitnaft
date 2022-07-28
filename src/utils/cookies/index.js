// cookie CRUD functions:

const cookieManager = {
    set: (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
    },
    update: (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
    },
    get: name => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            if (cookie[0].trim() === name) {
                return cookie[1];
            }
        }
        return null;
    },
    delete: name => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    },
};

export default cookieManager;
