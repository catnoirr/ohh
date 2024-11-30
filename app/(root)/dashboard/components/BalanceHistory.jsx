"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const BalanceHistory = () => {
  // Chart data
  const data = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "Balance",
        data: [100, 200, 800, 400, 600, 300, 500],
        borderColor: "#ffffff",
        backgroundColor: "rgba(124, 58, 237, 0.3)", // Light purple gradient fill
        tension: 0.4, // Smooth curve
        fill: true, // Enables gradient fill
        pointRadius: 0, // Removes data point markers
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: true, // Enables tooltips
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280", // Tailwind gray-500
        },
        grid: {
          display: false, // Hides grid lines on x-axis
        },
      },
      y: {
        ticks: {
          color: "#6b7280", // Tailwind gray-500
        },
        grid: {
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="  w-full px-8 py-5">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Balance History</h2>
      <div className="h-64 dashboard p-3 py-8 rounded">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BalanceHistory;
