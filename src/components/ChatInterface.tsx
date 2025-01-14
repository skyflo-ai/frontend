"use client";

import { useState, useEffect } from "react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import { markdownComponents } from "@/components/ui/markdown-components";

import { CiUser } from "react-icons/ci";
import { HiMiniSparkles } from "react-icons/hi2";
import { Agent } from "@/lib/types/agent";
import { ArrowUpIcon, XIcon } from "lucide-react";
import { queryAgent } from "@/lib/api";
import { Button } from "./ui/button";

interface ChatInterfaceProps {
  selectedAgent: Agent;
  setSelectedAgent: (agent: Agent | null) => void;
  firstMessage: string;
}

export function ChatInterface({
  selectedAgent,
  setSelectedAgent,
  firstMessage,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (firstMessage) {
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.from === "user"),
        { from: "sky", message: firstMessage },
      ]);
    }
  }, [firstMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputValue.trim());
    queryAgent(selectedAgent, inputValue.trim());
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex justify-between items-center p-4 border-b border-border text-xs">
          <div className="text-sm">
            <p>{selectedAgent.title}</p>
          </div>
          <div>
            {/* TODO: Add a button to close the chat */}
            <button onClick={() => setSelectedAgent(null)}>
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex items-start justify-start gap-2 mb-4"
            >
              <div className="bg-dark p-3 rounded-full flex items-center justify-center">
                {message.from === "user" ? (
                  <CiUser className="w-5 h-5" />
                ) : (
                  <HiMiniSparkles className="w-5 h-5" />
                )}
              </div>
              <div className="p-4 rounded-md bg-dark text-white w-full">
                <ReactMarkdown
                  components={markdownComponents}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                >
                  {message.message}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-border flex items-center justify-between"
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 bg-dark text-white text-xs border border-border-focus rounded-md focus:outline-none focus:ring-2 resize-none h-auto min-h-[64px] overflow-hidden"
            rows={1}
            onInput={(e) => {
              // Dynamically adjust the height based on content
              e.target.style.height = "auto"; // Reset height first to measure correctly
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <Button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 font-semibold transition-all duration-300 p-6 m-2 rounded-md hover:bg-dark-secondary/80"
          >
            <ArrowUpIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
