// "use client";

// import { sampleQualityInspections } from "@/data/complianceSampleData";
// import {
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
//   ResponsiveContainer,
// } from "recharts";
// import { Progress } from "@/components/ui/progress";

// export const QualityControlSection = () => {
//   const visualInspectionData = sampleQualityInspections.map((inspection) => ({
//     name: `Batch ${inspection.batchId.slice(-3)}`,
//     cleanliness: inspection.visualInspection.cleanliness,
//     colorConsistency: inspection.visualInspection.colorConsistency,
//     surfaceDefects: 100 - inspection.visualInspection.surfaceDefects,
//     overallAppearance: inspection.visualInspection.overallAppearance,
//   }));

//   const getGradeColor = (percentage: number) => {
//     if (percentage >= 70) return "text-green-500";
//     if (percentage >= 50) return "text-yellow-500";
//     return "text-red-500";
//   };

//   return (
//     <div className="space-y-6">
//       <div className="h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <RadarChart data={visualInspectionData}>
//             <PolarGrid />
//             <PolarAngleAxis dataKey="name" />
//             <PolarRadiusAxis angle={30} domain={[0, 100]} />
//             <Radar
//               name="Visual Inspection"
//               dataKey="cleanliness"
//               stroke="#2563eb"
//               fill="#2563eb"
//               fillOpacity={0.6}
//             />
//             <Radar
//               name="Visual Inspection"
//               dataKey="colorConsistency"
//               stroke="#16a34a"
//               fill="#16a34a"
//               fillOpacity={0.6}
//             />
//             <Radar
//               name="Visual Inspection"
//               dataKey="surfaceDefects"
//               stroke="#dc2626"
//               fill="#dc2626"
//               fillOpacity={0.6}
//             />
//             <Radar
//               name="Visual Inspection"
//               dataKey="overallAppearance"
//               stroke="#9333ea"
//               fill="#9333ea"
//               fillOpacity={0.6}
//             />
//           </RadarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="grid grid-cols-1 gap-4">
//         {sampleQualityInspections.map((inspection) => (
//           <div
//             key={inspection.id}
//             className="p-4 border rounded-lg bg-white shadow-sm"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-medium">Batch {inspection.batchId}</h3>
//               <span className="text-sm text-gray-500">{inspection.date}</span>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>Extra Class</span>
//                   <span className={getGradeColor(inspection.grading.extraClass)}>
//                     {inspection.grading.extraClass}%
//                   </span>
//                 </div>
//                 <Progress value={inspection.grading.extraClass} className="h-2" />
//               </div>

//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>Class I</span>
//                   <span className={getGradeColor(inspection.grading.classI)}>
//                     {inspection.grading.classI}%
//                   </span>
//                 </div>
//                 <Progress value={inspection.grading.classI} className="h-2" />
//               </div>

//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>Class II</span>
//                   <span className={getGradeColor(inspection.grading.classII)}>
//                     {inspection.grading.classII}%
//                   </span>
//                 </div>
//                 <Progress value={inspection.grading.classII} className="h-2" />
//               </div>

//               <div className="mt-4 pt-4 border-t">
//                 <div className="flex justify-between text-sm">
//                   <span>Average Size</span>
//                   <span>
//                     {inspection.measurements.averageSize}{" "}
//                     {inspection.measurements.sizeUnit}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>Weight per Unit</span>
//                   <span>
//                     {inspection.measurements.weightPerUnit}{" "}
//                     {inspection.measurements.weightUnit}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }; 