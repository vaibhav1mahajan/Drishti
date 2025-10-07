import React, { useState } from "react";
import InsightCard from "../components/InsightCard";

interface Insight {
  title: string;
  timeframe: string;
  summary: string;
  tags: string[];
}

const mockInsights: Insight[] = [
  {
    title: "Quantum Sensors — Short Term",
    timeframe: "2025–2027",
    summary:
      "High government and private funding; TRL expected to move from 4→6 under current trajectories.",
    tags: ["quantum", "funding"],
  },
  {
    title: "Perovskite Stability",
    timeframe: "6–12 months",
    summary:
      "Stability improvements reported; commercialization likely if degradation <5% after 1k hours.",
    tags: ["materials", "research"],
  },
  {
    title: "AI Drug Discovery",
    timeframe: "2025–2028",
    summary:
      "Emerging AI models reducing drug discovery timelines; multiple startups showing promising TRL 3→5 acceleration.",
    tags: ["AI", "biotech"],
  },
  {
    title: "Next-Gen Batteries",
    timeframe: "2026–2029",
    summary:
      "Solid-state battery development progressing; expected commercialization in EVs and grid storage if scale-up succeeds.",
    tags: ["energy", "materials"],
  },
];

const Insights: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filteredTag, setFilteredTag] = useState<string | null>(null);
  const [recentQuestions, setRecentQuestions] = useState<{ question: string; answer: string }[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const uniqueTags = Array.from(new Set(mockInsights.flatMap((i) => i.tags)));

  const handleAskPlatform = () => {
    if (!query) return alert("Please type a question!");
    const answer = `Simulated answer for: "${query}"`;
    setRecentQuestions([{ question: query, answer }, ...recentQuestions]);
    setQuery("");
  };

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const copySummary = (summary: string) => {
    navigator.clipboard.writeText(summary);
    alert("Summary copied to clipboard!");
  };

  const displayedInsights = filteredTag
    ? mockInsights.filter((i) => i.tags.includes(filteredTag))
    : mockInsights;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">AI Insights</h1>
        <p className="text-gray-400">
          LLM-generated summaries, recommendations, and drill-down explanations.
        </p>
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilteredTag(null)}
          className={`px-3 py-1 rounded ${
            !filteredTag ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300"
          }`}
        >
          All
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilteredTag(tag)}
            className={`px-3 py-1 rounded ${
              filteredTag === tag ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedInsights.map((it, idx) => (
          <div key={idx} className="space-y-2">
            <InsightCard
              title={it.title}
              timeframe={it.timeframe}
              summary={expandedIndex === idx ? it.summary : `${it.summary.slice(0, 80)}...`}
              tags={it.tags}
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => toggleExpand(idx)}
                className="px-3 py-1 bg-gray-800 rounded text-sm text-white"
              >
                {expandedIndex === idx ? "Collapse" : "Expand"}
              </button>
              <button
                onClick={() => copySummary(it.summary)}
                className="px-3 py-1 bg-indigo-500 rounded text-sm text-white"
              >
                Copy Summary
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ask the Platform */}
      <div className="bg-gray-900 rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-semibold text-white">Ask the Platform</h2>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none"
            placeholder="e.g., 'What will TRL be for quantum sensors by 2026?'"
          />
          <button
            onClick={handleAskPlatform}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white"
          >
            Ask
          </button>
        </div>

        {/* Recent Questions */}
        {recentQuestions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-white font-semibold">Recent Questions</h3>
            {recentQuestions.map((q, i) => (
              <div key={i} className="bg-gray-800 p-3 rounded">
                <p className="text-gray-300 font-medium">Q: {q.question}</p>
                <p className="text-gray-400">A: {q.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
