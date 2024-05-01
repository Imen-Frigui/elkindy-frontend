import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card from 'components/card';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaMusic } from 'react-icons/fa';
import { fetchInstrumentPopularity } from '../../../../services/course/courseService';

Chart.register(ArcElement, Tooltip, Legend);

function InstrumentDoughnutChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: '# of Instruments',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        }]
    });

    useEffect(() => {
        fetchInstrumentPopularity().then(data => {
            const labels = Object.keys(data);
            const chartData = labels.map(label => data[label]);
            const backgroundColor = labels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`);
            const borderColor = labels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);

            setChartData({
                labels: labels,
                datasets: [{
                    label: '# of Instruments',
                    data: chartData,
                    backgroundColor,
                    borderColor,
                    borderWidth: 1
                }]
            });
        });
    }, []);

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                enabled: true
            }
        }
    };

    return (
        <Card extra="flex mt-5 flex-col gap-4 p-4 bg-white shadow rounded-lg">
            <div className="flex flex-col justify-center ml-4">
                <h1 className="text-xl font-bold text-navy-700 dark:text-white">Instrument Popularity</h1>
                <Doughnut data={chartData} options={options}/>
            </div>
        </Card>
    );
}

export default InstrumentDoughnutChart;
