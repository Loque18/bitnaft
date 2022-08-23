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
            const params = `?email=${email}&sessionToken=${token}`;
            return axios({
                method: 'get',
                url: `${endpoint}/loans/${params}`,
            });
        },
        savingOffers: () => {
            return axios({
                method: 'get',
                url: `${endpoint}/borrowables`,
            });
        },

        borrowables: () => {
            return axios({
                method: 'get',
                url: `${endpoint}/borrowables`,
            });
        },

        collateralNeeded({ email, token, collateralName, borrowName, borrowAmount }) {
            const params = `?email=${email}&sessionToken=${token}&collateral=${collateralName}&borrow=${borrowName}&borrowAmount=${borrowAmount}`;
            return axios({
                method: 'get',
                url: `${endpoint}/collateralNeeded/${params}`,
            });
        },

        // ltv
        ltvAfterWithdrawal({ email, token, loanId, amount }) {
            const params = `?email=${email}&sessionToken=${token}&loanHash=${loanId}&amount=${amount}`;
            return axios({
                method: 'get',
                url: `${endpoint}/ltvAfterWithdrawal/${params}`,
            });
        },

        ltvAfterRepaying({ email, token, loanId, amount }) {
            const params = `?email=${email}&sessionToken=${token}&loanHash=${loanId}&amount=${amount}`;
            return axios({
                method: 'get',
                url: `${endpoint}/ltvAfterRepaying/${params}`,
            });
        },

        ltvAfterAddingCollateral({ email, token, loanId, amount }) {
            const params = `?email=${email}&sessionToken=${token}&loanHash=${loanId}&amount=${amount}`;
            return axios({
                method: 'get',
                url: `${endpoint}/ltvAfterAddingCollateral/${params}`,
            });
        },

        interestRate({ crypto }) {
            const params = `?crypto=${crypto}`;
            return axios({
                method: 'get',
                url: `${endpoint}/interestRate/${params}`,
            });
        },

        liquidationPrice({ borrow, collateral }) {
            const params = `?borrow=${borrow}&collateral=${collateral}`;
            return axios({
                method: 'get',
                url: `${endpoint}/liquidationPrice/${params}`,
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
        resetPassword: ({ email, resetToken, newPassword }) => {
            const params = `?email=${email}&token=${resetToken}&newPass=${newPassword}`;
            return axios({
                method: 'post',
                url: `${endpoint}/resetpass/${params}`,
            });
        },

        // savings
        subscribeToSavingOffer: ({ email, token, cryptoName, amount }) => {
            const params = `?email=${email}&sessionToken=${token}&crypto=${cryptoName}&amount=${amount}`;
            return axios({
                method: 'post',
                url: `${endpoint}/addToSavings/${params}`,
            });
        },

        redeemSavingProfit: ({ email, token, cryptoName, amount }) => {
            const params = `?email=${email}&sessionToken=${token}&crypto=${cryptoName}&amount=${amount}`;
            return axios({
                method: 'post',
                url: `${endpoint}/removeFromSavings/${params}`,
            });
        },

        // loans
        takeLoan: ({ email, token, collateral, borrow, collateralAmount, borrowAmount }) => {
            const params = `?email=${email}&sessionToken=${token}&collateral=${collateral}&borrow=${borrow}&collateralAmount=${collateralAmount}&borrowAmount=${borrowAmount}`;
            return axios({
                method: 'post',
                url: `${endpoint}/takeLoan/${params}`,
            });
        },
        repayLoan: ({ email, token, loanId, amount }) => {
            const params = `?email=${email}&sessionToken=${token}&loanHash=${loanId}&amount=${amount}`;
            return axios({
                method: 'post',
                url: `${endpoint}/repayLoan/${params}`,
            });
        },
        addCollateral: ({ email, token, loanId, amount }) => {
            const params = `?email=${email}&sessionToken=${token}&loanHash=${loanId}&amount=${amount}`;
            return axios({
                method: 'post',
                url: `${endpoint}/addCollateral/${params}`,
            });
        },
        withdrawCollateral: ({ email, token, loanId, amount }) => {
            const params = `?email=${email}&sessionToken=${token}&loanHash=${loanId}&amount=${amount}`;
            return axios({
                method: 'post',
                url: `${endpoint}/withdrawCollateral/${params}`,
            });
        },

        faucet: ({ email, crypto }) => {
            const params = `?email=${email}&crypto=${crypto}`;
            return axios({
                method: 'post',
                url: `${endpoint}/faucetmint/${params}`,
            });
        },
    },
    put: {},
    delete: {},
};

export default api;
