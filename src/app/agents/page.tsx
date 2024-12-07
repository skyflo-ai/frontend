"use client";

import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import Agents from "@/components/Agents";

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
        <Agents />
      </div>
    </div>
  );
}
