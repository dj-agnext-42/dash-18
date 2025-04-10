// "use client";

// import { sampleStorageConditions } from "@/data/complianceSampleData";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { format, parseISO } from "date-fns";
// import { AlertCircle } from "lucide-react";

// export const StorageMonitoringSection = () => {
//   const chartData = sampleStorageConditions.map((reading) => ({
//     time: format(parseISO(reading.timestamp), "HH:mm"),
//     temperature: reading.temperature,
//     humidity: reading.humidity,
//     co2: reading.co2Level,
//   }));

//   const latestReading = sampleStorageConditions[sampleStorageConditions.length - 1];

//   const getTemperatureStatus = (temp: number) => {
//     if (temp < 13 || temp > 14) return "text-red-500";
//     return "text-green-500";
//   };

//   const getHumidityStatus = (humidity: number) => {
//     if (humidity < 85 || humidity > 95) return "text-red-500";
//     return "text-green-500";
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="p-4 border rounded-lg bg-white shadow-sm">
//           <div className="flex items-center justify-between">
//             <h3 className="font-medium">Temperature</h3>
//             {latestReading.alerts.type !== "none" && (
//               <AlertCircle className="w-5 h-5 text-yellow-500" />
//             )}
//           </div>
//           <div className="mt-2">
//             <span
//               className={`text-2xl font-bold ${getTemperatureStatus(
//                 latestReading.temperature
//               )}`}
//             >
//               {latestReading.temperature.toFixed(1)}°C
//             </span>
//             <p className="text-sm text-gray-500 mt-1">Target: 13-14°C</p>
//           </div>
//         </div>

//         <div className="p-4 border rounded-lg bg-white shadow-sm">
//           <h3 className="font-medium">Humidity</h3>
//           <div className="mt-2">
//             <span
//               className={`text-2xl font-bold ${getHumidityStatus(
//                 latestReading.humidity
//               )}`}
//             >
//               {latestReading.humidity.toFixed(1)}%
//             </span>
//             <p className="text-sm text-gray-500 mt-1">Target: 85-95%</p>
//           </div>
//         </div>

//         <div className="p-4 border rounded-lg bg-white shadow-sm">
//           <h3 className="font-medium">CO₂ Level</h3>
//           <div className="mt-2">
//             <span className="text-2xl font-bold">
//               {latestReading.co2Level.toFixed(0)} ppm
//             </span>
//             <p className="text-sm text-gray-500 mt-1">Target: &lt;450 ppm</p>
//           </div>
//         </div>
//       </div>

//       <div className="h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="time" />
//             <YAxis yAxisId="left" />
//             <YAxis yAxisId="right" orientation="right" />
//             <Tooltip />
//             <Legend />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="temperature"
//               name="Temperature (°C)"
//               stroke="#ef4444"
//               dot={false}
//             />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="humidity"
//               name="Humidity (%)"
//               stroke="#3b82f6"
//               dot={false}
//             />
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="co2"
//               name="CO₂ (ppm)"
//               stroke="#16a34a"
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {latestReading.alerts.type !== "none" && (
//         <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center gap-2 text-yellow-700">
//             <AlertCircle className="w-5 h-5" />
//             <span className="font-medium">Alert</span>
//           </div>
//           <p className="mt-1 text-yellow-600">{latestReading.alerts.message}</p>
//         </div>
//       )}
//     </div>
//   );
// }; 