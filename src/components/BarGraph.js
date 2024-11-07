// src/components/BarGraph.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarGraph = ({ blocks, totalDistance, onClickBar }) => {
  const labels = blocks.map((block, index) => `${block.title} (${block.distance} km)`);
  const dataValues = blocks.map((block) => block.intensity);  // Use fixed intensity values

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Work',
        data: dataValues,
        backgroundColor: blocks.map((block) => block.color),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 150,
        title: {
          display: true,
          text: 'work',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Workout Type(KM)',
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        onClickBar(blocks[index]); // Pass the clicked block back to parent
      }
    },
  };

  return (
    <div>
      <h3 className="text-lg font-bold">Workout</h3>
      <Bar data={data} options={options} />
      <p className="text-center mt-4">Total Distance: {totalDistance} km</p>
    </div>
  );
};

export default BarGraph;
