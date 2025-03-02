// src/components/ChatInterface.tsx

"use client";

import { useState, useEffect, useRef } from "react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import Pusher from "pusher-js";

import { markdownComponents } from "@/components/ui/markdown-components";

import { HiMiniSparkles } from "react-icons/hi2";
import { RxReload } from "react-icons/rx";

import { Agent } from "@/lib/types/agent";
import { queryAgent } from "@/lib/api";

import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface ActionTimer {
  title: string;
  description: string;
  startTime: number;
  elapsedTime: number;
  isCompleted: boolean;
}

interface ChatInterfaceProps {
  selectedAgent: Agent | null;
}

export function ChatInterface({ selectedAgent }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingStatusMessage, setLoadingStatusMessage] = useState<string>();
  const [inputValue, setInputValue] = useState("");
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [rightPanelMessages, setRightPanelMessages] = useState<ActionTimer[]>(
    []
  );
  const [isAgentResponding, setIsAgentResponding] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const pusherRef = useRef<Pusher | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Update timers at 1ms precision (but with performance considerations)
    if (rightPanelMessages.length > 0) {
      timerIntervalRef.current = setInterval(() => {
        requestAnimationFrame(() => {
          setRightPanelMessages((prevMessages) =>
            prevMessages.map((msg, index) => {
              // If this is not the latest message and it's not already completed
              if (index !== prevMessages.length - 1 && !msg.isCompleted) {
                return { ...msg, isCompleted: true };
              }
              // Only update the timer for the latest message if it's not completed
              if (!msg.isCompleted) {
                return {
                  ...msg,
                  elapsedTime: Date.now() - msg.startTime,
                };
              }
              return msg;
            })
          );
        });
      }, 1); // Setting to 1ms, but browser/system will limit this
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [rightPanelMessages.length]);

  useEffect(() => {
    if (!selectedAgent) return;

    pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_ID!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusherRef.current.subscribe(selectedAgent.pusherChannel);

    channel.bind("activity-executed", (data: any) => {
      console.log("message received", data);
      setLoadingStatusMessage(data.title);

      // Mark all previous messages as completed
      setRightPanelMessages((prev) => [
        ...prev.map((msg) => ({ ...msg, isCompleted: true })),
        {
          title: data.title,
          description: data.description,
          startTime: Date.now(),
          elapsedTime: 0,
          isCompleted: false,
        },
      ]);

      if (data.last_step) {
        setTimeout(() => {
          setIsAgentResponding(false);
          setLoadingStatusMessage("");
          setMessages((prev) => [
            ...prev,
            { from: "sky", message: data.answer },
          ]);
          setRightPanelMessages((prev) =>
            prev.map((msg, idx) =>
              idx === prev.length - 1 ? { ...msg, isCompleted: true } : msg
            )
          );
        }, 500);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusherRef.current?.disconnect();
    };
  }, [messages]);

  // Add scroll to bottom effect when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      };
      messageContainerRef.current.scrollIntoView(scrollOptions);
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setMessages((prev) => [
      ...prev,
      { from: "user", message: inputValue.trim() },
    ]);
    setIsAgentResponding(true);
    setLoadingStatusMessage("Waiting for First Contact");
    setRightPanelMessages(() => [
      {
        title: "Waiting for First Contact",
        description: "Sky is waiting for response from the server.",
        startTime: Date.now(),
        elapsedTime: 0,
        isCompleted: false,
      },
    ]);
    setRightPanelOpen(true);

    const chatHistory = messages.map((message) => ({
      role: message.from === "user" ? "user" : "assistant",
      content: message.message,
      timestamp: message.timestamp || Date.now(),
      contextMarker: message.contextMarker || "standard",
      latest: false,
    }));

    // Add the new message with full context
    chatHistory.push({
      role: "user",
      content: inputValue.trim(),
      timestamp: Date.now(),
      contextMarker: "latest-query",
      latest: true,
    });

    // reverse the chat history
    chatHistory.reverse();

    const chatHistoryString = JSON.stringify(chatHistory);

    console.log("chatHistoryString", chatHistoryString);

    queryAgent(chatHistoryString, selectedAgent?.path ?? null);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessages((prev) => [...prev, { from: "user", message: suggestion }]);
    setIsAgentResponding(true);
    setLoadingStatusMessage("Waiting for First Contact");
    setRightPanelMessages(() => [
      {
        title: "Waiting for First Contact",
        description: "Sky is waiting for response from the server.",
        startTime: Date.now(),
        elapsedTime: 0,
        isCompleted: false,
      },
    ]);
    setRightPanelOpen(true);
    queryAgent(suggestion, selectedAgent?.path ?? null);
  };

  const handleReloadChat = () => {
    setMessages([]);
    setInputValue("");
    setRightPanelMessages([]);
    setRightPanelOpen(false);
    setLoadingStatusMessage("");
  };

  const formatElapsedTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    if (seconds < 60) return `${seconds}s ${milliseconds}ms`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s ${milliseconds}ms`;
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Main content & right panel container */}
        <div className="flex flex-grow min-h-full w-full">
          {/* Main content area */}
          <div className="flex flex-col flex-grow w-full h-full">
            {/* Scrollable message area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Initial suggestion area if no messages */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center max-w-5xl min-h-full mx-auto px-4">
                  <div className="w-full relative">
                    {/* Ambient background effect */}
                    <div className="absolute inset-0 -top-40">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl" />
                      <div className="absolute right-0 top-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent w-96 h-96 blur-3xl" />
                    </div>

                    <div className="space-y-4 mb-8 relative">
                      <div className="flex items-center justify-center">
                        <div
                          className="bg-gradient-to-br from-blue-700/20 to-blue-600/20 p-3 rounded-md
                        shadow-lg shadow-blue-500/10 backdrop-blur-sm"
                        >
                          <HiMiniSparkles className="w-4 h-4 text-blue-300" />
                        </div>
                        <div className="ml-3 text-center">
                          <h1 className="text-4xl font-bold tracking-tight">
                            Hi! I'm{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent px-1 relative">
                              Sky
                              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-blue-400/0 via-blue-400/50 to-blue-400/0"></span>
                            </span>
                          </h1>
                        </div>
                      </div>
                      <div className="text-center space-y-4">
                        <p className="text-gray-500 text-xs max-w-md mx-auto leading-relaxed font-semibold tracking-wide">
                          {selectedAgent?.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex flex-row flex-wrap items-center justify-center gap-8 w-full max-w-5xl mx-auto relative mt-20"
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(380px, 1fr))",
                      }}
                    >
                      {selectedAgent?.suggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ y: -4 }}
                          className="cursor-pointer group w-[600px]"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                        >
                          <Card className=" relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-800/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-400/20 h-[150px] ">
                            <CardHeader className="p-6">
                              <div className="flex items-start space-x-5">
                                <div className="bg-gradient-to-br from-blue-600/10 to-blue-500/10 p-4 rounded-xl shadow-lg shadow-blue-500/5 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                                  <span className="text-blue-400 group-hover:text-blue-300">
                                    <suggestion.icon className="w-4 h-4" />
                                  </span>
                                </div>
                                <div className="space-y-2">
                                  <CardTitle className="text-xs font-semibold text-gray-400 h-4 group-hover:text-gray-300">
                                    {suggestion.category}
                                  </CardTitle>
                                  <CardDescription className="bg-gradient-to-r from-gray-200 to-gray-400 group-hover:from-gray-100 group-hover:to-gray-300 bg-clip-text text-transparent text-sm font-semibold tracking-tight">
                                    {suggestion.text}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Messages & loading area */}
              <div className="flex flex-col justify-center items-start w-full max-w-4xl mx-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${
                      message.from === "sky" ? "justify-start" : "justify-end"
                    } my-3 w-full`}
                  >
                    {message.from === "sky" && (
                      <div
                        className="bg-gradient-to-br from-blue-700/20 to-blue-600/20 p-3 rounded-full
                        shadow-lg shadow-blue-500/10 backdrop-blur-sm"
                      >
                        <HiMiniSparkles className="w-4 h-4 text-blue-300" />
                      </div>
                    )}
                    <div className="px-6 ml-2 rounded-lg text-white bg-gradient-to-br from-gray-900/95 to-gray-800/95 text-left py-4 shadow-md hover:shadow-lg transition-shadow duration-200 overflow-x-auto">
                      <ReactMarkdown
                        components={markdownComponents}
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                      >
                        {message.message}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}

                {loadingStatusMessage && (
                  <div className="flex items-center justify-start my-3 w-full text-sm">
                    <div
                      className="bg-gradient-to-br from-blue-700/20 to-blue-600/20 p-3 rounded-full
                        shadow-lg shadow-blue-500/10 backdrop-blur-sm"
                    >
                      <HiMiniSparkles className="w-4 h-4 text-blue-300" />
                    </div>
                    <div className="flex items-center animate-gradient bg-gradient-to-r from-gray-300 via-gray-500 to-gray-800 bg-clip-text text-transparent">
                      <p className="ml-3">{loadingStatusMessage}</p>
                      <div className="dots w-12"></div>
                    </div>
                  </div>
                )}
                <div ref={messageContainerRef} />
              </div>
            </div>

            <div className="pb-4 px-4">
              <form
                onSubmit={handleSubmit}
                className="flex items-center justify-between w-full max-w-4xl mx-auto relative "
              >
                <div className="w-full relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    placeholder={
                      isAgentResponding
                        ? "Please wait while Sky is responding. Click reload to start over."
                        : "Ask Sky to perform any action on your Kubernetes setup."
                    }
                    className="w-full p-4 bg-dark text-white text-xs font-semibold tracking-wide 
                      border border-border-focus rounded-xl 
                      focus:outline-none focus:ring-1 focus:ring-blue-500/20 
                      resize-none h-auto min-h-[100px] overflow-hidden
                      transition-shadow duration-200
                      placeholder:text-gray-500/70"
                    rows={1}
                    onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.metaKey) {
                        handleSubmit(e);
                      }
                    }}
                  />

                  {messages.length > 0 ? (
                    <div className="">
                      <div className="absolute left-4 bottom-4 flex items-start">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => handleReloadChat()}
                                className="text-gray-700 hover:text-gray-500 transition-colors duration-200 group"
                              >
                                <RxReload className="w-3.5 h-3.5 transform -rotate-180 group-hover:-rotate-90 transition-transform duration-300" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Start new chat</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {!isAgentResponding ? (
                        <div className="absolute right-4 bottom-4 flex items-center space-x-2">
                          <p className="text-xs text-gray-700">⌘ + Enter</p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {rightPanelOpen ? (
              <motion.div
                key="panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="bg-dark border-l border-border w-full max-w-lg flex flex-col overflow-y-auto max-h-screen"
              >
                <div className="flex justify-between items-center border-b border-border p-4">
                  <p className="text-sm text-gray-300 text-left">
                    Sky's Actions
                  </p>
                  <button onClick={() => setRightPanelOpen(false)}>
                    <FaAngleRight className="w-4 h-4" />
                  </button>
                </div>
                {rightPanelMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`px-4 mt-4 relative border-l-2 ${
                      message.isCompleted
                        ? "border-green-500/10"
                        : "border-blue-500/10"
                    } pl-4 pb-4`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-xs text-gray-300 text-left font-semibold">
                        {message.title}
                      </p>
                      <span
                        className={`text-[10px] font-mono ${
                          message.isCompleted
                            ? "text-green-400/80 bg-green-500/5"
                            : "text-blue-400/80 bg-blue-500/5"
                        } px-2 py-0.5 rounded-full`}
                      >
                        {formatElapsedTime(message.elapsedTime)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 text-left">
                      {message.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {messages.length !== 0 ? (
                  <div className="absolute right-4 top-[50%] flex items-center">
                    <button
                      onClick={() => setRightPanelOpen(true)}
                      className="p-1 rounded-full
                      bg-gradient-to-br from-gray-800/90 to-gray-900/90
                      hover:from-gray-700/90 hover:to-gray-800/90
                      border border-border/10
                      shadow-lg shadow-gray-950/50
                      hover:shadow-xl hover:shadow-blue-900/20
                      hover:border-blue-400/50
                      transform hover:-translate-x-0.5
                      transition-all duration-300 ease-out
                      backdrop-blur-sm
                      group"
                    >
                      <FaAngleLeft className="w-3 h-3 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </button>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
