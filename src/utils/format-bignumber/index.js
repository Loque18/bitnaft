import BigNumber from 'bignumber.js';

const formatBigNumber = (value, decimals) => {
    return +BigNumber(value)
        .div(10 ** decimals)
        .toFixed(8)
        .toString();
};

export default formatBigNumber;
