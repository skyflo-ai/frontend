"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

// Performance & Security Considerations:
// - Confetti should only run once. Use a state variable and a ref to ensure it doesn't repeat.
// - If confetti libraries impact performance, consider lazy-loading or removing after a set duration.
// - This screen is mostly static. Caching static assets is straightforward.

// This page is displayed after user setup is done.
// It informs the user to return later once data has been collected.
// On first load, trigger confetti once to celebrate successful setup completion.

export default function PostSetup() {
  const [showConfetti, setShowConfetti] = useState(true);
  const confettiShownRef = useRef(false);

  useEffect(() => {
    if (showConfetti && !confettiShownRef.current) {
      // Fire confetti once
      confettiShownRef.current = true;
      const end = Date.now() + 1000;
      const colors = ["#1f5fc4", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
          setShowConfetti(false);
        }
      })();
    }
  }, [showConfetti]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
      <div className="absolute top-1/3 -left-1/3 sm:top-1/4 sm:-left-1/4 w-1/3 sm:w-1/2 h-1/3 sm:h-1/2 bg-blue-500/20 blur-[128px] rounded-full" />
      <div className="absolute top-1/3 -right-1/3 sm:top-1/4 sm:-right-1/4 w-1/3 sm:w-1/2 h-1/3 sm:h-1/2 bg-cyan-500/20 blur-[128px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[600px]"
      >
        <Card className="bg-dark-secondary border-gray-700 shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="px-6 sm:px-8 bg-gradient-to-r from-dark-secondary to-dark-navbar">
            <CardTitle className="text-2xl mb-2 sm:text-3xl font-bold text-white tracking-normal text-center">
              Setup Complete
            </CardTitle>
            <CardDescription className="text-center text-gray-400 text-xs sm:text-sm">
              We are now gathering data from your cloud environment.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 min-h-[400px] flex flex-col justify-center items-center text-center">
            <p className="text-gray-300 text-sm mb-6">
              Thanks for connecting your cloud environment. It may take a few
              hours for us to aggregate and analyze enough data to provide
              meaningful insights.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Please come back later to see detailed metrics, trends, and
              optimization recommendations.
            </p>
            <Button
              variant="primary"
              className="absolute bottom-6 bg-blue-700 hover:bg-blue-600 text-white"
              onClick={() => {
                // If desired, navigate the user to another part of the app
                // For example: router.push("/dashboard") if using next/router
              }}
            >
              Go to Dashboard
            </Button>
          </CardContent>
          <CardFooter className="px-6 sm:px-8 bg-dark-secondary flex flex-col justify-center items-center text-center"></CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
