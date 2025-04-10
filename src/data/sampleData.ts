import { Shipment } from "@/types/operations";
import { addHours, subDays } from "date-fns";

const generateSampleData = (): Shipment[] => {
  const now = new Date();
  
  return [
    {
      id: "SHIP001",
      phase: "Farm to Packhouse",
      status: "Delivered",
      departureTime: subDays(now, 1).toISOString(),
      arrivalTime: subDays(now, 0.5).toISOString(),
      quantityLoaded: 1000,
      quantityReceived: 980,
      temperature: 13.5,
      condition: {
        damage: false,
        notes: "All items in good condition"
      }
    },
    {
      id: "SHIP002",
      phase: "Packhouse to Cold Storage",
      status: "In Transit",
      departureTime: addHours(now, -3).toISOString(),
      arrivalTime: addHours(now, 2).toISOString(),
      quantityLoaded: 980,
      quantityReceived: 975,
      temperature: 14.2,
      condition: {
        damage: false,
        notes: "Transit proceeding normally"
      }
    },
    {
      id: "SHIP003",
      phase: "Cold Storage to Port",
      status: "Delayed",
      departureTime: subDays(now, 2).toISOString(),
      arrivalTime: subDays(now, 1).toISOString(),
      quantityLoaded: 2000,
      quantityReceived: 1950,
      temperature: 15.1,
      condition: {
        damage: true,
        notes: "Minor damage during loading"
      }
    },
    // Add more sample data as needed
  ];
};

export const sampleShipments = generateSampleData(); 