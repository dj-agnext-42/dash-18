"use client";

import { sampleQualityTests } from "@/data/governanceSampleData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = {
  pass: "#22c55e",
  fail: "#ef4444",
};

export const QualityTestsPieChart = () => {
  const data = [
    {
      name: "Pass",
      value: sampleQualityTests.filter((test) => test.result === "pass").length,
    },
    {
      name: "Fail",
      value: sampleQualityTests.filter((test) => test.result === "fail").length,
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const passRate = ((data[0].value / total) * 100).toFixed(1);

  return (
    <div className="w-full h-[300px]">
      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-green-600">{passRate}%</span>
        <span className="text-sm text-gray-500 ml-2">Pass Rate</span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [
              `${value} tests (${((value / total) * 100).toFixed(1)}%)`,
              "",
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}; 