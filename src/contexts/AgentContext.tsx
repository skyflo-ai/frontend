"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Agent } from "@/lib/types/agent";

/**
 * AgentContextProps - type definition for context value
 */
interface AgentContextProps {
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
}

/**
 * Create the AgentContext with a default empty context.
 */
const AgentContext = createContext<AgentContextProps>({
  selectedAgent: null,
  setSelectedAgent: () => {},
});

/**
 * AgentProvider - wraps components that need access to the Agent context
 */
export const AgentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <AgentContext.Provider value={{ selectedAgent, setSelectedAgent }}>
      {children}
    </AgentContext.Provider>
  );
};

/**
 * useAgentContext - custom hook for consuming the context
 */
export const useAgentContext = () => useContext(AgentContext);
