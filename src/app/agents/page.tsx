"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import Agents from "@/components/Agents";
import PostSetup from "@/components/PostSetup";

export default function AgentsPage() {
  const { user } = useAuth();
  const [showPostSetup, setShowPostSetup] = useState(true);

  return (
    <div className="flex">
      <Navbar
        user={user}
        clearFlowData={() => {
          return "";
        }}
      />
      <div className="flex-grow">
        {showPostSetup ? <PostSetup /> : <Agents />}
      </div>
    </div>
  );
}
