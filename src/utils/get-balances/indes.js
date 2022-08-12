export default function getBalances(assets) {
    const balance = assets.reduce((prev, curr) => {
        return prev + curr.usdValue;
    }, 0);

    return balance;
}
