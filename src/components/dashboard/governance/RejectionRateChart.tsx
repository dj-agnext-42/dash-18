"use client";

import { sampleRejectionData } from "@/data/governanceSampleData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const RejectionRateChart = () => {
  const chartData = sampleRejectionData.map(item => ({
    date: item.date,
    rejectionRate: ((item.rejected / item.totalInspected) * 100).toFixed(2),
    rejected: item.rejected,
    total: item.totalInspected,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            interval={6}
          />
          <YAxis
            label={{
              value: "Rejection Rate (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Rejection Rate"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="rejectionRate"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 