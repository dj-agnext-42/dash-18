"use client";

import { sampleComplianceDocuments } from "@/data/governanceSampleData";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export const ComplianceProgress = () => {
  const total = sampleComplianceDocuments.length;
  const completed = sampleComplianceDocuments.filter(
    (doc) => doc.status === "completed"
  ).length;
  const pending = sampleComplianceDocuments.filter(
    (doc) => doc.status === "pending"
  ).length;
  const missing = sampleComplianceDocuments.filter(
    (doc) => doc.status === "missing"
  ).length;

  const completionRate = (completed / total) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "missing":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "missing":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Overall Completion</span>
          <span className="text-sm font-medium">{completionRate.toFixed(1)}%</span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </div>

      <div className="space-y-4">
        {sampleComplianceDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(doc.status)}
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className={`text-sm ${getStatusColor(doc.status)}`}>
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Due: {doc.dueDate}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{completed}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{pending}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">{missing}</div>
          <div className="text-sm text-gray-500">Missing</div>
        </div>
      </div>
    </div>
  );
}; 