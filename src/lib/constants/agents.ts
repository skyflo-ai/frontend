import { Agent } from "@/lib/types/agent";
import { AiOutlineKubernetes } from "react-icons/ai";
import { FaAws } from "react-icons/fa6";

import { MdBarChart, MdDelete, MdElectricBolt, MdSearch } from "react-icons/md";

// Example agents fetched from the backend.
export const Agents: Agent[] = [
  {
    title: "AWS Agent",
    path: "aws",
    pusherChannel: "aws",
    description: "Your personal AWS Copilot",
    detailed_description:
      "Optimize costs, enhance security posture, and streamline AWS operations through AI-powered analysis and actionable infrastructure recommendations.",
    icon: FaAws,
    suggestions: [
      {
        text: "Analyze all security groups and identify instances with exposed ports 22 or 3389.",
        icon: MdSearch,
        category: "Security",
      },
      {
        text: "Generate a cost optimization report for EC2 instances with less than 20% CPU utilization in the last 30 days.",
        icon: MdBarChart,
        category: "Analyze",
      },
      {
        text: "Create a new VPC with public and private subnets across three availability zones.",
        icon: MdElectricBolt,
        category: "Create",
      },
      {
        text: "Remove all unencrypted EBS volumes and S3 buckets without versioning enabled.",
        icon: MdDelete,
        category: "Delete",
      },
    ],
  },
  {
    title: "Kubernetes Agent",
    path: "kubernetes",
    pusherChannel: "kubernetes",
    description: "Your AI-Powered Kubernetes Co-Pilot",
    detailed_description:
      "Automate cluster management, detect performance bottlenecks, and receive real-time security insights through natural language interactions with your infrastructure.",
    icon: AiOutlineKubernetes,
    suggestions: [
      {
        text: "Fetch details of all the go services in the 'development' namespace.",
        icon: AiOutlineKubernetes,
        category: "Query",
      },
      {
        text: "Create a new namespace called 'production' in the cluster.",
        icon: MdElectricBolt,
        category: "Create",
      },
      {
        text: "Summarize all the resources running under the 'preprod' namespace.",
        icon: MdBarChart,
        category: "Analyze",
      },
      {
        text: "Delete all resources under the 'test' namespace.",
        icon: MdDelete,
        category: "Delete",
      },
    ],
  },
];
