"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import Agents from "@/components/Agents";
import { Agent } from "@/lib/types/agent";
import { ChatInterface } from "@/components/ChatInterface";

// Example agents fetched from the backend.
const agents: Agent[] = [
  {
    title: "QA Agent",
    description: "Your Cloud Q&A Companion",
    detailed_description:
      "Ask questions about your cloud environment and get insights from the data we've collected.",
  },
];

export default function AgentsPage() {
  const { user } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="flex">
      <Navbar
        user={user}
        clearFlowData={() => {
          return "";
        }}
      />
      <div className="flex-grow">
        {selectedAgent ? (
          <ChatInterface
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            firstMessage={selectedAgent.detailed_description}
          />
        ) : (
          <Agents agents={agents} setSelectedAgent={setSelectedAgent} />
        )}
      </div>
    </div>
  );
}
