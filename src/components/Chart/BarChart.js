import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ options, chartData }) {
  return (
    <div className="bar-chart">
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default BarChart;
