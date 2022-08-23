const formatNumber = value => {
    return value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 18,
    });
};

export default formatNumber;
