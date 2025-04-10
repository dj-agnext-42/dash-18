"use client";

import { sampleShipments } from "@/data/sampleData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const QuantityComparisonChart = () => {
  const chartData = sampleShipments.map((shipment) => ({
    id: shipment.id,
    loaded: shipment.quantityLoaded,
    received: shipment.quantityReceived,
    loss: shipment.quantityLoaded - shipment.quantityReceived,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="loaded" name="Quantity Loaded" fill="#2563eb" />
          <Bar dataKey="received" name="Quantity Received" fill="#16a34a" />
          <Bar dataKey="loss" name="Loss" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 