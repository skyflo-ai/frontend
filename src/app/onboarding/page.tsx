"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Onboarding from "@/components/Onboarding";
import PostSetup from "@/components/PostSetup";
import Navbar from "@/components/navbar/Navbar";

export default function OnboardingPage() {
  const { user } = useAuth();
  const [showPostSetup, setShowPostSetup] = useState(false);

  return (
    <div className="flex">
      <Navbar
        user={user}
        clearFlowData={() => {
          return "";
        }}
      />
      <div className="flex-grow">
        {showPostSetup ? <PostSetup /> : <Onboarding />}
      </div>
    </div>
  );
}
