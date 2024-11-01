"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  BarChart as BarChartIcon,
  Activity,
  Target,
  Shield,
  Leaf,
  Globe,
  Eye,
  PlusCircle,
  FileText,
} from "lucide-react";
import { div } from "framer-motion/client";
import LeftTabButton from "./LeftTabButton";
import BusinessSummary from "./BusinessSummary";
import SegmentRevenue from "./SegmentRevenue";
interface StockDataDisplayProps {
  stockData: any;
}

const StockDataDisplay: React.FC<StockDataDisplayProps> = ({ stockData }) => {
  const { company_report } = stockData;
  const general_info = company_report.general_info;
  const annualReports = company_report.annual_reports;
  const quarterlyReports = company_report.quaterly_reports;

  const annualReport = annualReports[0];
  const latestQuarter = quarterlyReports[0];

  // Helper function to format currency
  const formatCurrency = (value: string | number): string => {
    const number = typeof value === "string" ? parseFloat(value) : value;
    const crores = number / 10000000;
    return `${crores.toFixed(2)} Cr`;
  };

  // Prepare data for charts
  const revenueProfitData = quarterlyReports
    .map((report: any) => ({
      quarter: `${report.year} ${report.quarter}`,
      totalRevenue: parseFloat(report.total_revenue),
      netProfit: parseFloat(report.net_profit),
    }))
    .reverse();

  // Prepare data for segment revenue over time
  const segmentRevenueOverTime = quarterlyReports.map((report: any) => {
    const data: any = { quarter: `${report.year} ${report.quarter}` };
    report.segments_revenue.forEach((segment: any) => {
      data[segment.name] = parseFloat(segment.revenue);
    });
    return data;
  });

  // Get the order of segments by highest revenue
  const getSegmentOrderByHighestRevenue = () => {
    const latestReport = quarterlyReports[0];
    return [...latestReport.segments_revenue]
      .sort((a: any, b: any) => parseFloat(b.revenue) - parseFloat(a.revenue))
      .map((segment: any) => segment.name);
  };

  const segmentOrderByHighestRevenue = getSegmentOrderByHighestRevenue();

  console.log("segmentOrderByHighestRevenue", segmentOrderByHighestRevenue);

  const segmentNames = quarterlyReports[0].segments_revenue.map(
    (segment: any) => segment.name
  );

  const segmentsInformation = annualReports[0].segments_information;

  const COLORS = ["#8e30d1", "#7a29b7", "#3D3D3F", "#545457"];

  const geographicRevenueData = annualReport.geographic_revenue.map(
    (geo: any) => {
      const latestRevenue = geo.revenue[0];
      return {
        name: geo.name,
        revenue: parseFloat(latestRevenue.value),
      };
    }
  );

  const quarterlyFinancials = quarterlyReports.map((report: any) => ({
    quarter: `${report.year} ${report.quarter}`,
    totalRevenue: parseFloat(report.total_revenue),
    netProfit: parseFloat(report.net_profit),
    operatingMargin: report.operating_margin,
    netProfitMargin: report.net_profit_margin,
    eps: report.eps,
  }));

  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="pl-2 pr-4 w-full h-full">
      <div className="flex">
        <div className="w-56 pl-1 pr-3 sticky top-0">
          <div className="flex flex-col pr-3 border-border border-r h-screen">
            <div className="ml-2 mt-10 flex flex-col mb-6">
              <p className="text-left tracking-wide text-gray-500 text-sm">
                ticker:
              </p>
              <p className="text-2xl font-bold text-white mb-1">
                {general_info.ticker}
              </p>
            </div>
            <div className="flex flex-col mt-2 space-y-2">
              <LeftTabButton
                icon={<FileText className="h-4 w-4" />}
                label="Summary"
                tabKey="summary"
                activeTab={activeTab}
                onClick={setActiveTab}
              />

              <LeftTabButton
                icon={<BarChartIcon className="h-4 w-4" />}
                label="Segment Revenue"
                tabKey="segmentRevenue"
                activeTab={activeTab}
                onClick={setActiveTab}
              />

              <LeftTabButton
                icon={<Globe className="h-4 w-4" />}
                label="Geographic Revenue"
                tabKey="geographicRevenue"
                activeTab={activeTab}
                onClick={setActiveTab}
              />

              <LeftTabButton
                icon={<Activity className="h-4 w-4" />}
                label="Quarterly Financials"
                tabKey="quarterlyFinancials"
                activeTab={activeTab}
                onClick={setActiveTab}
              />

              <LeftTabButton
                icon={<Target className="h-4 w-4" />}
                label="Business Performance"
                tabKey="businessPerformance"
                activeTab={activeTab}
                onClick={setActiveTab}
              />

              <LeftTabButton
                icon={<Eye className="h-4 w-4" />}
                label="Future Outlook"
                tabKey="futureOutlook"
                activeTab={activeTab}
                onClick={setActiveTab}
              />

              <LeftTabButton
                icon={<PlusCircle className="h-4 w-4" />}
                label="New Initiatives"
                tabKey="newInitiatives"
                activeTab={activeTab}
                onClick={setActiveTab}
              />

              <LeftTabButton
                icon={<Shield className="h-4 w-4" />}
                label="Risk Factors"
                tabKey="riskFactors"
                activeTab={activeTab}
                onClick={setActiveTab}
              />

              <LeftTabButton
                icon={<Leaf className="h-4 w-4" />}
                label="Sustainability Initiatives"
                tabKey="sustainabilityInitiatives"
                activeTab={activeTab}
                onClick={setActiveTab}
              />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 mt-4 ml-1">
          {activeTab === "summary" && (
            <BusinessSummary
              latestQuarter={latestQuarter}
              general_info={general_info}
            />
          )}

          {activeTab === "segmentRevenue" && (
            <SegmentRevenue
              segmentRevenueOverTime={segmentRevenueOverTime}
              segmentNames={segmentNames}
              segmentsInformation={segmentsInformation}
              segmentOrderByHighestRevenue={segmentOrderByHighestRevenue}
            />
          )}

          {activeTab === "geographicRevenue" && (
            <div className="bg-dark-secondary p-4 rounded-md mb-8">
              <h2 className="text-white text-lg mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Geographic Revenue
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={geographicRevenueData}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip
                    formatter={(value: any) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "#1c1e24",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8e30d1" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "quarterlyFinancials" && (
            <div className="bg-dark-secondary p-4 rounded-md mb-8 overflow-x-auto">
              <h2 className="text-white text-lg mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Quarterly Financials
              </h2>
              <table className="w-full text-gray-400">
                <thead>
                  <tr>
                    <th className="border-b border-border p-2 text-left">
                      Quarter
                    </th>
                    <th className="border-b border-border p-2 text-right">
                      Total Revenue
                    </th>
                    <th className="border-b border-border p-2 text-right">
                      Net Profit
                    </th>
                    <th className="border-b border-border p-2 text-right">
                      Operating Margin
                    </th>
                    <th className="border-b border-border p-2 text-right">
                      Net Profit Margin
                    </th>
                    <th className="border-b border-border p-2 text-right">
                      EPS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyFinancials.map((qf: any, index: number) => (
                    <tr key={index}>
                      <td className="border-b border-border p-2">
                        {qf.quarter}
                      </td>
                      <td className="border-b border-border p-2 text-right">
                        {formatCurrency(qf.totalRevenue)}
                      </td>
                      <td className="border-b border-border p-2 text-right">
                        {formatCurrency(qf.netProfit)}
                      </td>
                      <td className="border-b border-border p-2 text-right">
                        {qf.operatingMargin.toFixed(2)}%
                      </td>
                      <td className="border-b border-border p-2 text-right">
                        {qf.netProfitMargin.toFixed(2)}%
                      </td>
                      <td className="border-b border-border p-2 text-right">
                        {qf.eps.diluted}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "businessPerformance" && (
            <div className="bg-dark-secondary p-4 rounded-md mb-8">
              <h2 className="text-white text-lg mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Business Performance
              </h2>
              <ul className="list-disc pl-5 text-gray-400">
                {annualReport.business_performance.map(
                  (item: string, index: number) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {activeTab === "futureOutlook" && (
            <div className="bg-dark-secondary p-4 rounded-md mb-8">
              <h2 className="text-white text-lg mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Future Outlook
              </h2>
              <ul className="list-disc pl-5 text-gray-400">
                {annualReport.future_outlook.map(
                  (item: string, index: number) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {activeTab === "newInitiatives" && (
            <div className="bg-dark-secondary p-4 rounded-md mb-8">
              <h2 className="text-white text-lg mb-4 flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                New Initiatives
              </h2>
              <ul className="list-disc pl-5 text-gray-400">
                {annualReport.new_initiatives.map(
                  (item: string, index: number) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {activeTab === "riskFactors" && (
            <div className="bg-dark-secondary p-4 rounded-md mb-8">
              <h2 className="text-white text-lg mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Risk Factors
              </h2>
              <ul className="list-disc pl-5 text-gray-400">
                {annualReport.risk_factors.map(
                  (item: string, index: number) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {activeTab === "sustainabilityInitiatives" && (
            <div className="bg-dark-secondary p-4 rounded-md mb-8">
              <h2 className="text-white text-lg mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                Sustainability Initiatives
              </h2>
              <ul className="list-disc pl-5 text-gray-400">
                {annualReport.sustainability_initiatives.map(
                  (item: string, index: number) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDataDisplay;
