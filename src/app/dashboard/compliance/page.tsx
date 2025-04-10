"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SoilQualitySection } from "@/components/dashboard/compliance/SoilQualitySection";
// Import other sections when they are updated
import { CropManagementSection } from "@/components/dashboard/compliance/CropManagementSection";
import { QualityInspectionSection } from "@/components/dashboard/compliance/QualityInspectionSection";
import { StorageConditionsSection } from "@/components/dashboard/compliance/StorageConditionsSection";

export default function ComplianceDashboard() {
  const [activeTab, setActiveTab] = useState("soil");

  // TODO: Implement filter logic
  const handleFarmChange = (value: string) => {
    console.log("Farm selected:", value);
  };

  const handleFacilityChange = (value: string) => {
    console.log("Facility selected:", value);
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-900">Compliance Dashboard</h1>

      {/* Top Filters */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <Select onValueChange={handleFarmChange} defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Farms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Farms</SelectItem>
            {/* Add actual farm options here */}
            <SelectItem value="farm1">Farm Alpha</SelectItem>
            <SelectItem value="farm2">Farm Beta</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Harvest Batch ID"
          className="w-full md:w-[180px]"
          // Add onChange handler
        />

        <Select onValueChange={handleFacilityChange} defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Facilities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Facilities</SelectItem>
            {/* Add actual facility options here */}
            <SelectItem value="fac1">Facility 1</SelectItem>
            <SelectItem value="fac2">Facility 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 bg-transparent p-0">
          {/* Styling adjusted for closer match to image */}
          <TabsTrigger
            value="soil"
            className={`py-3 px-4 text-center text-sm font-medium rounded-t-md border-b-2 ${activeTab === 'soil' ? 'border-blue-600 text-blue-700 bg-white' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
          >
            Soil Quality
          </TabsTrigger>
          <TabsTrigger
            value="crop"
            className={`py-3 px-4 text-center text-sm font-medium rounded-t-md border-b-2 ${activeTab === 'crop' ? 'border-blue-600 text-blue-700 bg-white' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
          >
            Crop Management
          </TabsTrigger>
          <TabsTrigger
            value="quality"
            className={`py-3 px-4 text-center text-sm font-medium rounded-t-md border-b-2 ${activeTab === 'quality' ? 'border-blue-600 text-blue-700 bg-white' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
          >
            Quality Inspection
          </TabsTrigger>
          <TabsTrigger
            value="storage"
            className={`py-3 px-4 text-center text-sm font-medium rounded-t-md border-b-2 ${activeTab === 'storage' ? 'border-blue-600 text-blue-700 bg-white' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
          >
            Storage Conditions
          </TabsTrigger>
        </TabsList>

        {/* Tab Content Area */}
        <div className="flex-grow bg-white p-4 md:p-6 rounded-b-md shadow-sm border border-t-0 border-gray-200">
          <TabsContent value="soil" className="mt-0">
            <SoilQualitySection />
          </TabsContent>
          <TabsContent value="crop" className="mt-0">
            <CropManagementSection />
            {/* <p>Crop Management Content Placeholder</p> */}
          </TabsContent>
          <TabsContent value="quality" className="mt-0">
            <QualityInspectionSection />
            {/* <p>Quality Inspection Content Placeholder</p> */}
          </TabsContent>
          <TabsContent value="storage" className="mt-0">
            <StorageConditionsSection />
            {/* <p>Storage Conditions Content Placeholder</p> */}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
} 