import React from 'react';
import { Pie } from 'react-chartjs-2';

// crucial import to get the chart to work with react-chartjs-2
//eslint-disable-next-line
import { Chart as ChartJS } from 'chart.js/auto';

function PieChart({ chartData }) {
  return <Pie data={chartData} />;
}

export default PieChart;
