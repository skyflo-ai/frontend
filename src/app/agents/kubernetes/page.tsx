"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import { ChatInterface } from "@/components/ChatInterface";
import { Agent } from "@/lib/types/agent";
import { useAgentContext } from "@/contexts/AgentContext";
import { Agents } from "@/lib/constants/agents";

export default function KubernetesAgentPage() {
  const { user } = useAuth();
  const {
    selectedAgent,
    setSelectedAgent,
  }: { selectedAgent: Agent | null; setSelectedAgent: (agent: Agent) => void } =
    useAgentContext();

  useEffect(() => {
    if (!selectedAgent) {
      setSelectedAgent(Agents[0]);
    }
  }, [selectedAgent]);

  // If there's a valid selectedAgent in context, display it.
  return (
    <div className="flex">
      <Navbar
        user={user}
        clearFlowData={() => {
          return "";
        }}
      />
      <div className="flex-grow">
        <ChatInterface selectedAgent={selectedAgent} />
      </div>
    </div>
  );
}
