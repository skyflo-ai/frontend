"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Onboarding from "@/components/Onboarding";

export default function OnboardingPage() {
  const { user } = useAuth();

  return (
    <div className="flex-grow">
      <Onboarding />
    </div>
  );
}
