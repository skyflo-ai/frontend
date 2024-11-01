"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ResponsiveContainer } from "recharts";
import { BarChartIcon, InfoIcon } from "lucide-react";

interface SegmentRevenueProps {
  segmentRevenueOverTime: any;
  segmentNames: string[];
  segmentsInformation: any;
  segmentOrderByHighestRevenue: string[];
}

const SegmentRevenue: React.FC<SegmentRevenueProps> = ({
  segmentRevenueOverTime,
  segmentNames,
  segmentsInformation,
  segmentOrderByHighestRevenue,
}) => {
  const COLORS = ["#8e30d1", "#7a29b7", "#3D3D3F", "#545457"];

  const formatCurrency = (value: string | number): string => {
    const number = typeof value === "string" ? parseFloat(value) : value;
    const crores = number / 10000000;
    return `${crores.toFixed(2)} Cr`;
  };

  return (
    <div>
      <div className="bg-dark-secondary p-4 rounded-md mb-4">
        <h2 className="text-white text-lg mb-4 flex items-center">
          <BarChartIcon className="h-5 w-5 mr-2" />
          Segment Revenue
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={segmentRevenueOverTime}>
            <XAxis dataKey="quarter" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              formatter={(value: any) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: "#1c1e24",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              labelFormatter={(label) => `Quarter: ${label}`}
            />
            <Legend />
            {segmentOrderByHighestRevenue.map((name: string, index: number) => (
              <Bar
                key={name}
                dataKey={name}
                stackId="a"
                fill={COLORS[index % COLORS.length]}
                name={name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-dark-secondary p-4 rounded-md mb-8">
        <h2 className="text-white text-lg mb-4 flex items-center">
          <InfoIcon className="h-5 w-5 mr-2" />
          Segment Information
        </h2>

        {segmentsInformation.map((segment: any) => (
          <div key={segment.name} className="mb-4">
            <h3 className="text-white text-md mb-1">{segment.name}</h3>
            <p className="text-gray-400 text-xs mb-2">
              {segment.detailed_description}
            </p>
            {segment.points.map((point: string) => (
              <li className="text-gray-400 text-xs mb-2">{point}</li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentRevenue;
