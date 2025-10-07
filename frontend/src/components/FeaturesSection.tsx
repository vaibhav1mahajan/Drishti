import { useState } from "react";
import { Brain, BarChart2, Database, Radar, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Database size={28} />,
      title: "Data Integration",
      bullets: [
        "Aggregates patents globally",
        "Collects research papers",
        "Industry reports integration",
      ],
      details: "Our system integrates multiple global sources seamlessly, providing a single unified data view for better analysis and decision-making.",
    },
    {
      icon: <Brain size={28} />,
      title: "AI Forecasting",
      bullets: [
        "Predicts TRL progression",
        "Uses advanced LLM models",
        "Identifies emerging signals",
      ],
      details: "Advanced AI models analyze technology readiness levels and predict trends, helping you stay ahead of the curve.",
    },
    {
      icon: <BarChart2 size={28} />,
      title: "Real-Time Insights",
      bullets: [
        "Live market updates",
        "Innovation trends tracking",
        "Investment analysis",
      ],
      details: "Get up-to-the-minute insights on market trends, innovation, and investment opportunities with our live dashboards.",
    },
    {
      icon: <Radar size={28} />,
      title: "Convergence Detection",
      bullets: [
        "Detects domain convergence",
        "Correlation mapping",
        "Cross-industry insights",
      ],
      details: "Detects emerging intersections between technologies and industries to uncover hidden opportunities.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="features" className="py-20 bg-gray-900 text-white px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Key Features
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            layout
            className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer relative"
          >
            {/* Feature Icon */}
            <div className="text-indigo-400 mb-4 flex justify-center">{f.icon}</div>

            {/* Feature Title */}
            <h3 className="text-lg font-semibold mb-3">{f.title}</h3>

            {/* Bullet Points without icons */}
            <div className="text-gray-400 text-sm mb-4 space-y-1">
              {f.bullets.map((point, i) => (
                <div key={i}>{point}</div>
              ))}
            </div>

            {/* Expand / Collapse Icon */}
            <div
              className="absolute top-4 right-4 text-gray-400 hover:text-indigo-400 transition"
              onClick={() => toggleExpand(idx)}
            >
              {expandedIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
              {expandedIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 text-sm mt-3"
                >
                  {f.details}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
