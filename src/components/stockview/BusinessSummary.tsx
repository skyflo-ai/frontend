"use client";

import { FileText } from "lucide-react";

interface BusinessSummaryProps {
  latestQuarter: any; // Replace 'any' with a more specific type if possible
  general_info: any; // Replace 'any' with a more specific type if possible
}

const BusinessSummary: React.FC<BusinessSummaryProps> = ({
  latestQuarter,
  general_info,
}) => {
  const formatCurrency = (value: string | number): string => {
    const number = typeof value === "string" ? parseFloat(value) : value;
    const crores = number / 10000000;
    return `${crores.toFixed(2)} Cr`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-dark-secondary p-4 rounded-md">
          <h2 className="text-gray-400 text-sm">Total Revenue</h2>
          <p className="text-white text-xl font-semibold">
            {formatCurrency(latestQuarter.total_revenue)}
          </p>
        </div>
        <div className="bg-dark-secondary p-4 rounded-md">
          <h2 className="text-gray-400 text-sm">Net Profit</h2>
          <p className="text-white text-xl font-semibold">
            {formatCurrency(latestQuarter.net_profit)}
          </p>
        </div>
        <div className="bg-dark-secondary p-4 rounded-md">
          <h2 className="text-gray-400 text-sm">Operating Margin</h2>
          <p className="text-white text-xl font-semibold">
            {latestQuarter.operating_margin.toFixed(2)}%
          </p>
        </div>
        <div className="bg-dark-secondary p-4 rounded-md">
          <h2 className="text-gray-400 text-sm">Net Profit Margin</h2>
          <p className="text-white text-xl font-semibold">
            {latestQuarter.net_profit_margin.toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="bg-dark-secondary p-4 rounded-md mb-8">
        <h2 className="text-white text-lg mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Summary
        </h2>
        <p className="text-justify text-gray-400 tracking-wide text-xs">
          {general_info.long_business_summary}
        </p>
      </div>
    </div>
  );
};

export default BusinessSummary;
