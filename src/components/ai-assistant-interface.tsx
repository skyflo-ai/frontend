"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUp, Loader2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { FormEventHandler } from "react";
export function AiAssistantInterface({
  setQuerySubmitted,
  searchQuery,
  setSearchQuery,
}: {
  setQuerySubmitted: (querySubmitted: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-between p-4">
      {/* <div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm p-2 text-sm text-center">
        Need more messages? Get higher limits with Premium.
        <Button variant="link" className="text-blue-400 ml-2">
          Upgrade Plan
        </Button>
      </div> */}

      <main className="flex-grow max-w-3xl w-full space-y-12 text-center flex flex-col justify-center">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-4xl font-bold tracking-tight">
            Supercharge Your Cloud Infrastructure
          </h1>
          <p className="text-gray-400 text-base tracking-wide">
            Instantly create, manage, and optimize cloud components with AI.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-800 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <form
            onSubmit={() => setQuerySubmitted(true)}
            className="relative flex items-center"
          >
            <Input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Describe the cloud component or architecture you need assistance with..."
              className="w-full py-7 pl-4 pr-32 bg-gray-900 bg-opacity-80 border-0 rounded-xl text-sm text-gray-200 tracking-tight placeholder:text-gray-500 placeholder-opacity-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-transparent border border-transparent hover:border-gray-700"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            "A scalable and redundant multi-region architecture",
            "How would an ideal EKS Kubernetes setup look like?",
            "Set up automated backups for cloud databases",
            "Deploy a serverless API with Lambda and API Gateway",
            "Design a disaster recovery solution for cloud infrastructure",
            "Configure auto-scaling for EC2 instances in AWS",
          ].map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              className="bg-gray-800 bg-opacity-50 hover:text-gray-300 hover:bg-gray-900 border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white rounded-full px-4 py-2 text-xs transition-all duration-200 tracking-wide"
              onClick={() => setSearchQuery(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
