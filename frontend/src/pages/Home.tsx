import React from "react";
import ChartCard from "../components/ChartCard";
import InsightCard from "../components/InsightCard";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const Home: React.FC = () => {
  // Dummy data for Line Chart
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Growth Rate",
        data: [12, 19, 9, 25, 18, 30],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  // Dummy data for Bar Chart
  const barData = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Patent Filings",
        data: [300, 420, 380, 460, 520],
        backgroundColor: "#8B5CF6",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  // Dummy data for Area Chart (reuse Line with fill)
  const areaData = {
    labels: ["2025", "2026", "2027"],
    datasets: [
      {
        label: "Market Size ($B)",
        data: [50, 68, 85],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const areaOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Technology Overview</h1>
          <p className="text-gray-400 mt-1">
            Snapshot of tracked technologies, signals and forecasts.
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Emerging Technologies" subtitle="Top movers (last 90 days)">
          <div className="h-44">
            <Line data={lineData} options={lineOptions} />
          </div>
        </ChartCard>

        <ChartCard title="Patent Filings" subtitle="Year-over-year">
          <div className="h-44">
            <Bar data={barData} options={barOptions} />
          </div>
        </ChartCard>

        <ChartCard title="Market Size Projection" subtitle="Forecast 2025–2027">
          <div className="h-44">
            <Line data={areaData} options={areaOptions} />
          </div>
        </ChartCard>
      </div>

      {/* Insights */}
      <h2 className="text-2xl font-semibold">AI Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InsightCard
          title="Quantum Sensors"
          timeframe="Next 2 years"
          summary="Government funding and increased patent activity indicate a rapid TRL progression. Watch for sensor+AI convergence."
          tags={["patents", "funding", "convergence"]}
        />
        <InsightCard
          title="Perovskite Solar Cells"
          timeframe="Next 12 months"
          summary="Recent papers show efficiency gains; expect commercialization steps if stability research continues."
          tags={["research", "publications"]}
        />
      </div>
    </div>
  );
};

export default Home;
