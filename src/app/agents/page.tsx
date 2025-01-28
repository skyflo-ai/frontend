"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import Agents from "@/components/Agents";
import { Agents as agents } from "@/lib/constants/agents";

export default function AgentsPage() {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Navbar
        user={user}
        clearFlowData={() => {
          return "";
        }}
      />
      <div className="flex-grow">
        <Agents agents={agents} />
      </div>
    </div>
  );
}
