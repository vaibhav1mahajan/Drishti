import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import ChartCard from "../components/ChartCard";
import DataTable from "../components/DataTable";

const COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

const Analytics: React.FC = () => {
  const trendData = [
    { year: "2021", patents: 150, publications: 120 },
    { year: "2022", patents: 220, publications: 190 },
    { year: "2023", patents: 280, publications: 260 },
    { year: "2024", patents: 350, publications: 300 },
    { year: "2025", patents: 420, publications: 380 },
  ];

  const domainData = [
    { name: "AI", value: 400 },
    { name: "Quantum Computing", value: 300 },
    { name: "Biotech", value: 250 },
    { name: "Nanotech", value: 200 },
    { name: "Renewable Energy", value: 180 },
  ];

  const investmentData = [
    { year: "2021", amount: 40 },
    { year: "2022", amount: 65 },
    { year: "2023", amount: 95 },
    { year: "2024", amount: 120 },
    { year: "2025", amount: 150 },
  ];

  const companies = [
    ["QuantumLeap Inc.", "120 patents", "USA"],
    ["BioSynth", "78 patents", "UK"],
    ["NanoVolt", "55 patents", "India"],
  ];

  return (
    <div className="space-y-10 px-4 md:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400">
          Overview of patents, publications, research domains, and investments.
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <ChartCard title="Patent Trend (5 yrs)" subtitle="Publications & filings">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="year" stroke="#FFFFFF" />
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none", color: "#fff" }} />
              <Line
                type="monotone"
                dataKey="patents"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="publications"
                stroke="#06B6D4"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard title="Top Research Domains" subtitle="By publication count">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={domainData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
              >
                {domainData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "grey", border: "none", color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar Chart */}
        <ChartCard title="Investment Activity" subtitle="Funding by year">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={investmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="year" stroke="#FFFFFF" />
              <Tooltip contentStyle={{ backgroundColor: "grey", border: "none", color: "#fff" }} />
              <Bar
                dataKey="amount"
                radius={[6, 6, 0, 0]}
              >
                {investmentData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3 text-white">
          Top Companies (by patent filings)
        </h2>
        <DataTable columns={["Company", "Patents", "HQ"]} rows={companies} />
      </div>
    </div>
  );
};

export default Analytics;
