import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ options, chartData }) {
  return (
    <div className="line-chart">
      <Line options={options} data={chartData} />
    </div>
  );
}

export default LineChart;
