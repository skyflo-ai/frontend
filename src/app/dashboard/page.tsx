"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import { AiAssistantInterface } from "@/components/ai-assistant-interface";
import { ChatInterface } from "@/components/ChatInterface";
import Onboarding from "@/components/Onboarding";

import { fetchFlowDiagram } from "@/lib/api";
import Flow from "@/components/visualizer/Flow";

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [firstMessage, setFirstMessage] = useState<string>("");
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [flowData, setFlowData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFlowDataLoading, setIsFlowDataLoading] = useState(true);

  const [initialMessageStreamCompleted, setInitialMessageStreamCompleted] =
    useState(false);

  const generateFlowDiagram = async () => {
    if (firstMessage.trim()) {
      try {
        const response = await fetchFlowDiagram(firstMessage.trim());
        console.log("response", response["flow"]);
        console.log("nodes", response["flow"]["nodes"]);
        console.log("edges", response["flow"]["edges"]);
        response["flow"]["nodes"].forEach((node: any) => {
          node["type"] = "custom";
        });
        response["flow"]["edges"].forEach((edge: any) => {
          edge["type"] = "custom";
        });
        setFlowData(response["flow"]);
      } catch (error) {
        console.error("Error fetching flow data:", error);
      } finally {
        setIsFlowDataLoading(false);
      }
    }
  };

  useEffect(() => {
    if (initialMessageStreamCompleted) {
      generateFlowDiagram();
    }
  }, [initialMessageStreamCompleted]);

  useEffect(() => {
    if (!querySubmitted) return;

    const eventSource = new EventSource(
      `http://localhost:8000/api/flow-chat/?query=${encodeURIComponent(
        searchQuery.trim()
      )}`,
      {
        withCredentials: true,
      }
    );

    eventSource.onopen = () => {
      setLoading(false);
    };

    eventSource.onmessage = (event) => {
      // Replace escaped newlines with actual newlines
      const unescapedData = event.data.replace(/\\n/g, "\n");
      setFirstMessage((prevMessages) => {
        const newMessages = `${prevMessages}${unescapedData}`;
        return newMessages;
      });
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      eventSource.close();
      setInitialMessageStreamCompleted(true);
    };

    return () => {
      eventSource.close();
      console.log("eventSource closed");
      setInitialMessageStreamCompleted(false);
    };
  }, [querySubmitted, searchQuery]);

  const clearFlowData = () => {
    setFlowData(null);
    setQuerySubmitted(false);
    setSearchQuery("");
    setFirstMessage(``);
    setLoading(false);
    setIsFlowDataLoading(false);
    setInitialMessageStreamCompleted(false);
  };

  return (
    <div className="flex">
      <Navbar user={user} clearFlowData={clearFlowData} />
      {!querySubmitted && (
        <div className="flex-grow">
          {/* <AiAssistantInterface
            setQuerySubmitted={setQuerySubmitted}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          /> */}
          <Onboarding />
        </div>
      )}
      {querySubmitted && (
        <div className="flex w-full">
          <ChatInterface
            initialMessage={searchQuery}
            isLoadingInitial={loading}
            firstMessage={firstMessage}
          />
          <Flow flowData={flowData} isLoading={isFlowDataLoading} />
        </div>
      )}
    </div>
  );
}
