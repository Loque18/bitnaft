import { Chart } from 'primereact/chart';
import { useState } from 'react';

const AssetsPieChart = () => {
    const [chartData] = useState({
        labels: ['btc', 'eth', 'bnb', 'cake', 'others'],
        datasets: [
            {
                data: [5, 10, 40, 100, 200],
                backgroundColor: ['#050865', '#383E8F', '#696FC4', '9EA4FD', '#E0E0FF'],
            },
        ],
    });

    const [options] = useState({
        plugins: {
            legend: {
                display: true,
                position: 'right',

                title: {
                    display: true,
                    text: 'Assets distribution',
                    padding: '10',
                    font: {
                        color: '#000',
                        weight: 'bold',
                        size: '11',
                    },
                },

                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        color: '#000',
                        weight: 'bold',
                    },
                },
            },
        },
    });

    return <Chart type="pie" data={chartData} options={options} />;
};
export default AssetsPieChart;
