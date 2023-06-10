import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const ViewsChart = () => {
  const [selectedView, setSelectedView] = useState('month'); // Default selected view is 'month'

  const days = [
    { x: Date.parse('2023-04-01 00:00:00 GMT+0800'), y: 5 },
    { x: Date.parse('2023-04-02 00:00:00 GMT+0800'), y: 20 },
    { x: Date.parse('2023-04-03 00:00:00 GMT+0800'), y: 10 },
    { x: Date.parse('2023-04-04 00:00:00 GMT+0800'), y: 30 },
    { x: Date.parse('2023-04-05 00:00:00 GMT+0800'), y: 20 },
    { x: Date.parse('2023-04-06 00:00:00 GMT+0800'), y: 50 },
    { x: Date.parse('2023-04-07 00:00:00 GMT+0800'), y: 10 },
  ];

  const weeks = [
    { x: Date.parse('2023-04-02 00:00:00 GMT+0800'), y: 90 },
    { x: Date.parse('2023-04-09 00:00:00 GMT+0800'), y: 50 },
    { x: Date.parse('2023-04-16 00:00:00 GMT+0800'), y: 30 },
    { x: Date.parse('2023-04-23 00:00:00 GMT+0800'), y: 50 },
    { x: Date.parse('2023-04-30 00:00:00 GMT+0800'), y: 30 },
  ];

  const months = [
    { x: Date.parse('2023-01-01 00:00:00 GMT+0800'), y: 10 },
    { x: Date.parse('2023-02-01 00:00:00 GMT+0800'), y: 30 },
    { x: Date.parse('2023-03-01 00:00:00 GMT+0800'), y: 10 },
    { x: Date.parse('2023-04-01 00:00:00 GMT+0800'), y: 10 },
    { x: Date.parse('2023-05-01 00:00:00 GMT+0800'), y: 40 },
    { x: Date.parse('2023-06-01 00:00:00 GMT+0800'), y: 10 },
    { x: Date.parse('2023-07-01 00:00:00 GMT+0800'), y: 20 },
    { x: Date.parse('2023-08-01 00:00:00 GMT+0800'), y: 50 },
    { x: Date.parse('2023-09-01 00:00:00 GMT+0800'), y: 70 },
    { x: Date.parse('2023-10-01 00:00:00 GMT+0800'), y: 30 },
    { x: Date.parse('2023-11-01 00:00:00 GMT+0800'), y: 70 },
    { x: Date.parse('2023-12-01 00:00:00 GMT+0800'), y: 20 },
  ];

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };


  const getLabels = () => {
    switch (selectedView) {
      case 'day':
        return days.map(day => {
          const date = new Date(day.x);
          return date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
        });
      case 'week':
        return weeks.map(week => {
          const date = new Date(week.x);
          return date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
        });
      case 'month':
      default:
        return months.map(month => {
          const date = new Date(month.x);
          return date.toLocaleString('default', { month: 'short' });
        });
    }
  };

  const getData = () => {
    switch (selectedView) {
      case 'day':
        return days.map(day => day.y);
      case 'week':
        return weeks.map(week => week.y);
      case 'month':
      default:
        return months.map(month => month.y);
    }
  };

  const data = {
    labels: getLabels(),
    datasets: [
      {
        label: '# of Views',
        data: getData(),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        font: {
          size: 26,
        },
      },
    },
  };

  return (
    <div>
      <div>
      <label htmlFor="viewSelect">View By: </label>
        <select id="viewSelect" value={selectedView} onChange={handleViewChange}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      <div>
      <Line data={data} height={400} options={options} />
    </div>
    </div>
  );
};

export default ViewsChart;