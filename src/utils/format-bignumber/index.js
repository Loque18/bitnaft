import BigNumber from 'bignumber.js';

const formatBigNumber = (value, decimals, decimalPlaces = 8) => {
    return +BigNumber(value)
        .div(10 ** decimals)
        .toFixed(decimalPlaces)
        .toString();
};

export default formatBigNumber;
