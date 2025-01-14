"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaPlus } from "react-icons/fa";
import { Agent } from "@/lib/types/agent";

interface AgentsProps {
  agents: Agent[];
  setSelectedAgent: (agent: Agent) => void;
}

export default function Agents({ agents, setSelectedAgent }: AgentsProps) {
  return (
    <div className="relative min-h-screen flex p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
      <div className="absolute top-1/3 -left-1/3 sm:top-1/4 sm:-left-1/4 w-1/3 sm:w-1/2 h-1/3 sm:h-1/2 bg-blue-500/20 blur-[128px] rounded-full" />
      <div className="absolute top-1/3 -right-1/3 sm:top-1/4 sm:-right-1/4 w-1/3 sm:w-1/2 h-1/3 sm:h-1/2 bg-cyan-500/20 blur-[128px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full"
      >
        <div className="mb-10 text-left">
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-normal mb-2">
            Agents
          </h1>
          <p className="text-gray-400 text-xs">
            Interact with your cloud environment through intelligent agents.
          </p>
        </div>

        {/* Using a responsive grid with a min-width for each card to maintain width */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          }}
        >
          {agents.map((agent, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setSelectedAgent(agent);
                // TODO: Navigate to the specific agent interface
              }}
            >
              <Card className="bg-dark-secondary border-gray-700 shadow-lg rounded-xl overflow-hidden flex flex-col">
                <CardHeader className="px-6 sm:px-8 bg-gradient-to-r from-dark-secondary to-dark-navbar items-start">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white tracking-normal">
                    {agent.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-xs sm:text-sm">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <p className="text-gray-300 text-sm">
                    {agent.detailed_description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}

          <div
            className="border-2 border-dashed border-gray-700 rounded-xl bg-dark-secondary shadow-inner p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-200"
            onClick={() => {
              // TODO: Trigger agent creation flow
            }}
          >
            <FaPlus className="text-gray-400 text-3xl mb-4" />
            <p className="text-gray-300 text-sm font-semibold">
              Create a New Agent
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
