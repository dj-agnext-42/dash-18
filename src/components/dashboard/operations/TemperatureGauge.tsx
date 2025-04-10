"use client";

import { sampleShipments } from "@/data/sampleData";
import { Card } from "@/components/ui/card";

const getTemperatureColor = (temp: number) => {
  if (temp < 13) return "text-blue-500";
  if (temp > 14) return "text-red-500";
  return "text-green-500";
};

const getTemperatureStatus = (temp: number) => {
  if (temp < 13) return "Too Cold";
  if (temp > 14) return "Too Hot";
  return "Optimal";
};

export const TemperatureGauge = () => {
  // For demo, we'll use the latest shipment's temperature
  const latestShipment = sampleShipments[0];
  const temperature = latestShipment.temperature;
  const temperatureColor = getTemperatureColor(temperature);
  const status = getTemperatureStatus(temperature);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-4xl font-bold ${temperatureColor}`}>
            {temperature}°C
          </span>
        </div>
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${(temperature / 20) * 283} 283`}
            transform="rotate(-90 50 50)"
            className={temperatureColor}
          />
        </svg>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Status: <span className={temperatureColor}>{status}</span></p>
        <p className="text-sm text-gray-500">Target: 13-14°C</p>
      </div>
    </div>
  );
}; 