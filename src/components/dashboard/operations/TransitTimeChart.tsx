"use client";

import { sampleShipments } from "@/data/sampleData";
import { differenceInHours } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const TransitTimeChart = () => {
  const chartData = sampleShipments.map((shipment) => ({
    id: shipment.id,
    phase: shipment.phase,
    transitTime: differenceInHours(
      new Date(shipment.arrivalTime),
      new Date(shipment.departureTime)
    ),
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis
            label={{ value: "Transit Time (hours)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="transitTime"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 