import React, { useState, useEffect } from 'react';
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
  )

const PostReach = () => {
  const [selectedView, setSelectedView] = useState('month'); // Default selected view is 'month'
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    fetchData();
  }, [selectedView]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/views?view=${selectedView}`);
      const { labels, data } = response.data;
      setChartData({ labels, data });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

  const getLabels = () => {
    return chartData.labels.map((x) => {
      const date = new Date(x);
      if (selectedView === 'day') {
        return date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
      } else if (selectedView === 'week') {
        return date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
      } else {
        return date.toLocaleString('default', { month: 'short' });
      }
    });
  };

  const getData = () => {
    return chartData.data;
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
      <Bar data={data} height={400} options={options} />
    </div>
    </div>
  );
};

export default PostReach;