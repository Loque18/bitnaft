import BigNumber from 'bignumber.js';

const formatNormalNumber = (value, decimals) => {
    return +BigNumber(value)
        .times(10 ** decimals)
        .toFixed(0)
        .toString();
};

export default formatNormalNumber;
