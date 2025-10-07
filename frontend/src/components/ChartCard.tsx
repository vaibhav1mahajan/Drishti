import React from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="mt-4">
        {children ?? <div className="h-40 flex items-center justify-center text-gray-500">[Chart]</div>}
      </div>
    </div>
  );
};

export default ChartCard;
