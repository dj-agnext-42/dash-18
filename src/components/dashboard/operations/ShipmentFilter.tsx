"use client";

import { TransportPhase } from "@/types/operations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ShipmentFilterProps {
  onPhaseChange?: (phase: TransportPhase | undefined) => void;
  onShipmentIdChange?: (id: string) => void;
}

export const ShipmentFilter = ({
  onPhaseChange,
  onShipmentIdChange,
}: ShipmentFilterProps) => {
  const phases: TransportPhase[] = [
    "Farm to Packhouse",
    "Packhouse to Cold Storage",
    "Cold Storage to Port",
  ];

  const handlePhaseChange = (value: string) => {
    onPhaseChange?.(value === "all" ? undefined : value as TransportPhase);
  };

  const handleShipmentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onShipmentIdChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="w-full sm:w-64">
        <Select onValueChange={handlePhaseChange} defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Phases</SelectItem>
            {phases.map((phase) => (
              <SelectItem key={phase} value={phase}>
                {phase}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full sm:w-64">
        <Input
          type="text"
          placeholder="Search by Shipment ID"
          onChange={handleShipmentIdChange}
          className="w-full"
        />
      </div>
    </div>
  );
}; 