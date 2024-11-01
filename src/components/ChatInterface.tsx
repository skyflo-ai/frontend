"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import { markdownComponents } from "@/components/ui/markdown-components";

import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiMicrosoftazure,
} from "react-icons/si";
import { CiUser } from "react-icons/ci";
import { HiMiniSparkles } from "react-icons/hi2";

interface ChatInterfaceProps {
  initialMessage: string;
  isLoadingInitial: boolean;
  firstMessage: string;
}

export function ChatInterface({
  initialMessage,
  isLoadingInitial,
  firstMessage,
}: ChatInterfaceProps) {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<any[]>([
    { from: "user", message: initialMessage },
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (firstMessage) {
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.from === "user"),
        { from: "sky", message: firstMessage },
      ]);
    }
  }, [firstMessage]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputValue.trim());
  };

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="h-screen w-3/4 bg-dark-secondary border-l border-border flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-border text-xs">
              <div className="text-sm">
                <p></p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleChat}
                  className="flex items-center justify-center text-white hover:border-gray-400 transition-colors duration-200 py-2 px-4 border border-gray-600 rounded-md"
                  aria-label="Close chat"
                >
                  <SiAmazonwebservices className="w-4 h-4 mr-2" />
                  <p>Connect AWS</p>
                </button>

                <button
                  onClick={toggleChat}
                  className="flex items-center justify-center text-white hover:border-gray-400 transition-colors duration-200 py-2 px-4 border border-gray-600 rounded-md"
                  aria-label="Close chat"
                >
                  <SiGooglecloud className="w-4 h-4 mr-2" />
                  <p>Connect GCP</p>
                </button>

                <button
                  onClick={toggleChat}
                  className="flex items-center justify-center text-white hover:border-gray-400 transition-colors duration-200 py-2 px-4 border border-gray-600 rounded-md"
                  aria-label="Close chat"
                >
                  <SiMicrosoftazure className="w-4 h-4 mr-2" />
                  <p>Connect Azure</p>
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

              {isLoadingInitial && (
                <div className="flex items-center justify-start p-2 animate-gradient bg-gradient-to-r from-gray-300 via-gray-500 to-gray-800 bg-clip-text text-transparent text-sm">
                  <p className="">Sky is generating the flow diagram</p>
                  <div className="dots"></div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border"
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
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
