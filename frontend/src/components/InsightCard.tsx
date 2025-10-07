import React from "react";

interface InsightCardProps {
  title: string;
  timeframe?: string;
  summary: string;
  tags?: string[];
}

const InsightCard: React.FC<InsightCardProps> = ({ title, timeframe, summary, tags = [] }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-md font-semibold text-white">{title}</h4>
          {timeframe && <p className="text-xs text-gray-400 mt-1">{timeframe}</p>}
        </div>
      </div>

      <p className="text-gray-300 mt-3 text-sm">{summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InsightCard;
