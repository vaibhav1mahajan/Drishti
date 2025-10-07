import React from "react";

interface DataTableProps {
  columns: string[];
  rows: string[][];
  compact?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows, compact = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-4 py-2 text-left text-xs text-gray-400 uppercase">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-900/20"}>
              {r.map((cell, j) => (
                <td key={j} className={`px-4 py-${compact ? "2" : "3"} text-sm text-gray-200`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
