import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AssetsDistributionPieChart = () => {
    const assetsData = {
        labels: ['BTC', 'ETH', 'BNB', 'CAKE', 'Others'],
        datasets: [
            {
                data: [10, 20, 30, 40, 50],
            },
        ],
    };

    return <Pie data={assetsData} />;
};
export default AssetsDistributionPieChart;
