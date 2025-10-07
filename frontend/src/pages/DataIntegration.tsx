import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import ChartCard from "../components/ChartCard";
import DataTable from "../components/DataTable";

const COLORS = ["#00E396", "#FEB019", "#FF4560", "#775DD0"];

const DataIntegration: React.FC = () => {
  const sources = [
    { name: "WIPO Patents", status: "Connected", lastIngest: "2025-10-04" },
    { name: "IEEE Xplore", status: "Connected", lastIngest: "2025-10-03" },
    { name: "ArXiv", status: "Connected", lastIngest: "2025-10-02" },
    { name: "Crunchbase", status: "Disconnected", lastIngest: "—" },
  ];

  const pieData = [
    { name: "WIPO Patents", value: 400 },
    { name: "IEEE Xplore", value: 300 },
    { name: "ArXiv", value: 300 },
    { name: "Crunchbase", value: 200 },
  ];

  const lineData = [
    { day: "Mon", records: 200 },
    { day: "Tue", records: 400 },
    { day: "Wed", records: 800 },
    { day: "Thu", records: 600 },
    { day: "Fri", records: 900 },
  ];

  const barData = [
    { name: "WIPO", health: 95 },
    { name: "IEEE", health: 90 },
    { name: "ArXiv", health: 88 },
    { name: "Crunchbase", health: 50 },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Data Integration</h1>
        <p className="text-gray-400">
          Manage connectors, ingestion pipelines and view recent ingestion logs.
        </p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart */}
        <ChartCard title="Source Contribution" subtitle="Share of ingested records">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70}>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line Chart */}
        <ChartCard title="Ingestion Throughput" subtitle="Records per day">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              />
              <Line
                type="monotone"
                dataKey="records"
                stroke="#00E396"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Enhanced Bar Chart */}
        <ChartCard title="Connector Health" subtitle="Status & reliability score">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E396" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#009E66" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar
                dataKey="health"
                fill="url(#colorHealth)"
                radius={[10, 10, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Data Table */}
      <motion.div
        className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-white">
          Connected Data Sources
        </h2>
        <DataTable
          columns={["Source", "Status", "Last Ingest"]}
          rows={sources.map((s) => [s.name, s.status, s.lastIngest])}
        />
      </motion.div>
    </motion.div>
  );
};

export default DataIntegration;
