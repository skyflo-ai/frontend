"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import Flow from "@/components/visualizer/Flow";

import { fetchFlowDiagram } from "@/lib/api";

export default function VisualizerPage() {
  const { user } = useAuth();

  const [flowData, setFlowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFlowDiagram("aws iam create-user --user-name Skyflo_Read_Only_User")
      .then((data) => {
        // console.log(data);
        setFlowData(data["flow"]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching flow diagram:", error);
      });
  }, []);

  return (
    <div className="flex">
      <Navbar
        user={user}
        clearFlowData={() => {
          return "";
        }}
      />

      <div className="flex-grow">
        <Flow flowData={flowData} isLoading={isLoading} />
      </div>
    </div>
  );
}
