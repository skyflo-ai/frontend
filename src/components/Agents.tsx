"use client";

import { useRouter } from "next/navigation";
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
import { useAgentContext } from "@/contexts/AgentContext";
import { RiRobot3Line } from "react-icons/ri";

interface AgentsProps {
  agents: Agent[];
}

export default function Agents({ agents }: AgentsProps) {
  const router = useRouter();
  const { setSelectedAgent } = useAgentContext();

  const handleAgentSelected = (agent: Agent) => {
    setSelectedAgent(agent);
    router.push(`/agents/${agent.path}`);
  };

  return (
    <div className="w-full h-full relative min-h-screen p-8 sm:p-8 md:p-10 overflow-hidden">
      <div className="absolute inset-0 -top-40">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute right-0 top-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent w-96 h-96 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full w-full mx-auto items-start justify-start"
      >
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="flex-grow items-start w-full justify-start ">
              <div className="flex items-start mb-4 justify-start">
                <div
                  className="bg-gradient-to-br from-blue-700/20 to-blue-600/20 p-3 rounded-md
                        shadow-lg shadow-blue-500/10 backdrop-blur-sm"
                >
                  <RiRobot3Line className="w-4 h-4 text-blue-400" />
                </div>
                <h1 className="ml-3 text-center text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
                  AI Agents
                </h1>
              </div>
              <p className="text-gray-400 text-sm font-light tracking-tight w-full text-center">
                Interact with your cloud infrastructure through intelligent
                agents powered by advanced language models.
              </p>
            </div>
          </motion.div>
        </div>

        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="cursor-pointer group"
              onClick={() => handleAgentSelected(agent)}
            >
              <Card className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-800/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-400/20 h-[280px]">
                <CardHeader className="space-y-4 p-6">
                  <div className="flex items-center space-x-5">
                    <div className="bg-gradient-to-br from-blue-600/10 to-blue-500/10 p-4 rounded-xl shadow-lg shadow-blue-500/5 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                      {agent.icon && (
                        <agent.icon className="w-6 h-6 text-blue-400" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent h-7">
                        {agent.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-xs font-medium tracking-tight">
                        {agent.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 tracking-tight">
                    {agent.detailed_description}
                  </p>
                  <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <div className="flex items-center space-x-2 text-blue-400/80">
                      <span className="text-xs font-medium">Get Started</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: agents.length * 0.1 }}
            whileHover={{ y: -4 }}
            className="cursor-pointer group"
          >
            <div className="relative border border-gray-800/50 hover:border-blue-400/20 rounded-xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 p-8 flex flex-col items-center justify-center h-[280px] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

              <div className="bg-gradient-to-br from-blue-600/10 to-blue-500/10 p-4 rounded-xl shadow-lg shadow-blue-500/5 backdrop-blur-sm mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <FaPlus className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
                Create New Agent
              </h3>
              <p className="text-gray-500 text-xs text-center max-w-[300px] mb-6">
                Deploy a custom AI agent for your needs
              </p>
              <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <div className="flex items-center space-x-2 text-blue-400/80">
                  <span className="text-xs font-medium">Create</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
