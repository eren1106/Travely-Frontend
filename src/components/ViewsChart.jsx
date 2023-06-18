import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const ViewsChart = (props) => {
  const [selectedView, setSelectedView] = useState('month'); // Default selected view is 'month'
  const view = props.profileview;
  console.log(view);

  //month logic
  const monthCounts = {};
  for (const date of view) {
    const month = date.substring(0, 7);
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  }
  const months = [
    { x: Date.parse("2023-01-01"), y: monthCounts["2023-01"] || 0 },
    { x: Date.parse("2023-02-01"), y: monthCounts["2023-02"] || 0 },
    { x: Date.parse("2023-03-01"), y: monthCounts["2023-03"] || 0 },
    { x: Date.parse("2023-04-01"), y: monthCounts["2023-04"] || 0 },
    { x: Date.parse("2023-05-01"), y: monthCounts["2023-05"] || 0 },
    { x: Date.parse("2023-06-01"), y: monthCounts["2023-06"] || 0 },
    { x: Date.parse("2023-07-01"), y: monthCounts["2023-07"] || 0 },
    { x: Date.parse("2023-08-01"), y: monthCounts["2023-08"] || 0 },
    { x: Date.parse("2023-09-01"), y: monthCounts["2023-09"] || 0 },
    { x: Date.parse("2023-10-01"), y: monthCounts["2023-10"] || 0 },
    { x: Date.parse("2023-11-01"), y: monthCounts["2023-11"] || 0 },
    { x: Date.parse("2023-12-01"), y: monthCounts["2023-12"] || 0 },
  ];

  // Get today's date
  const today = new Date();

  // Calculate the recent past 7 days starting from today
  const pastDates = [];
  for (let i = 6; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i + 1);
    pastDates.push(date.toISOString().split("T")[0]);
  }
  //console.log(pastDates);
  // Count the occurrences of matching dates
  const countOccurrences = (dates, targetDate) => {
    let count = 0;
    for (const date of dates) {
      if (date === targetDate) {
        count++;
      }
    }
    return count;
  };

  // Generate the array of objects in the required format
  const days = pastDates.map((date) => {
    const count = countOccurrences(view, date);
    return { x: Date.parse(date), y: count };
  });

  //console.log(days);

  // logic to determine week
  // Calculate the start date 5 weeks ago from today
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 35);
  startDate.setHours(0, 0, 0, 0);

  // Create an array to store the weekly counts
  const weeks = [];

  // Iterate over the past 5 weeks
  for (let i = 0; i < 5; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i * 7);

    const weekStart = currentDate.getTime();
    const weekEnd = new Date(currentDate).setDate(currentDate.getDate() + 6);

    const count = view.filter((date) => {
      const dateObj = new Date(date);
      return dateObj >= weekStart && dateObj <= weekEnd;
    }).length;

    weeks.push({ x: weekStart, y: count });
  }
  // const days = [
  //   { x: Date.parse('2023-04-01'), y: 5 },
  //   { x: Date.parse('2023-04-02'), y: 20 },
  //   { x: Date.parse('2023-04-03'), y: 10 },
  //   { x: Date.parse('2023-04-04'), y: 30 },
  //   { x: Date.parse('2023-04-05'), y: 20 },
  //   { x: Date.parse('2023-04-06'), y: 50 },
  //   { x: Date.parse('2023-04-07'), y: 10 },
  // ];

  // const weeks = [
  //   { x: Date.parse('2023-04-02'), y: 90 },
  //   { x: Date.parse('2023-04-09'), y: 50 },
  //   { x: Date.parse('2023-04-16'), y: 30 },
  //   { x: Date.parse('2023-04-23'), y: 50 },
  //   { x: Date.parse('2023-04-30'), y: 30 },
  // ];

  // const months = [
  //   { x: Date.parse('2023-01-01'), y: 10 },
  //   { x: Date.parse('2023-02-01'), y: 30 },
  //   { x: Date.parse('2023-03-01'), y: 10 },
  //   { x: Date.parse('2023-04-01'), y: 10 },
  //   { x: Date.parse('2023-05-01'), y: 40 },
  //   { x: Date.parse('2023-06-01'), y: 10 },
  //   { x: Date.parse('2023-07-01'), y: 20 },
  //   { x: Date.parse('2023-08-01'), y: 50 },
  //   { x: Date.parse('2023-09-01'), y: 70 },
  //   { x: Date.parse('2023-10-01'), y: 30 },
  //   { x: Date.parse('2023-11-01'), y: 70 },
  //   { x: Date.parse('2023-12-01'), y: 20 },
  // ];



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