"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaAws } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

import { Button } from "@/components/ui/button";

// Performance & Security Considerations:
// - Sensitive credentials should be encrypted before storage.
// - Communicate to the user how credentials are handled securely.
// - Introduce a consistent minimum height for content containers to minimize layout shift.
// - Use memoization or lazy loading for complex operations if the component grows in complexity.

export default function ConnectCloudPage() {
  const [step, setStep] = useState<
    "selectProvider" | "viewPolicy" | "enterCredentials"
  >("selectProvider");
  const [selectedProvider, setSelectedProvider] = useState<"aws" | null>(null);
  const [accessKeyId, setAccessKeyId] = useState("");
  const [secretAccessKey, setSecretAccessKey] = useState("");
  const [region, setRegion] = useState("");

  const handleSelectProvider = (provider: "aws") => {
    setSelectedProvider(provider);
    setStep("viewPolicy");
  };

  const handleNextFromPolicy = () => {
    setStep("enterCredentials");
  };

  const handleBack = () => {
    if (step === "viewPolicy") {
      setSelectedProvider(null);
      setStep("selectProvider");
      return;
    }
    if (step === "enterCredentials") {
      setStep("viewPolicy");
      return;
    }
  };

  // A consistent minimum height for the card content to reduce layout shifts.
  const contentMinHeight = "min-h-[400px]";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
      <div className="absolute top-1/3 -left-1/3 sm:top-1/4 sm:-left-1/4 w-1/3 sm:w-1/2 h-1/3 sm:h-1/2 bg-blue-500/20 blur-[128px] rounded-full" />
      <div className="absolute top-1/3 -right-1/3 sm:top-1/4 sm:-right-1/4 w-1/3 sm:w-1/2 h-1/3 sm:h-1/2 bg-cyan-500/20 blur-[128px] rounded-full" />

      {/* Main Onboarding Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[600px]"
      >
        <Card className="bg-dark-secondary border-gray-700 shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="px-6 sm:px-8 bg-gradient-to-r from-dark-secondary to-dark-navbar">
            <CardTitle className="text-2xl mb-2 sm:text-3xl font-bold text-white tracking-normal flex items-center justify-center">
              Connect Your Cloud
            </CardTitle>
            <CardDescription className="text-center text-gray-400 text-xs sm:text-sm">
              Integrate your cloud provider to start monitoring and optimizing
              resources.
            </CardDescription>
          </CardHeader>

          <CardContent
            className={`px-6 sm:px-8 transition-all duration-500 ${contentMinHeight} flex flex-col justify-center`}
          >
            {step === "selectProvider" && (
              <div className="grid grid-cols-3 gap-4">
                {/* AWS */}
                <button
                  onClick={() => handleSelectProvider("aws")}
                  className="flex flex-col items-center justify-center bg-gray-800 text-white py-8 px-4 rounded-lg hover:bg-gray-700 shadow-lg transition-transform duration-200 ease-in-out cursor-pointer"
                >
                  <FaAws className="text-4xl mb-2" />
                  <p className="font-semibold text-sm">AWS</p>
                </button>

                {/* Azure (Coming Soon) */}
                <div className="flex flex-col items-center justify-center bg-gray-800 text-white py-8 px-4 rounded-lg shadow-lg cursor-not-allowed opacity-50 relative">
                  <VscAzure className="text-4xl mb-2" />
                  <p className="font-semibold text-sm">Azure</p>
                  <span className="absolute bottom-2 text-xs text-gray-400 italic">
                    Coming Soon
                  </span>
                </div>

                {/* GCP (Coming Soon) */}
                <div className="flex flex-col items-center justify-center bg-gray-800 text-white py-8 px-4 rounded-lg shadow-lg cursor-not-allowed opacity-50 relative">
                  <SiGooglecloud className="text-4xl mb-2" />
                  <p className="font-semibold text-sm">GCP</p>
                  <span className="absolute bottom-2 text-xs text-gray-400 italic">
                    Coming Soon
                  </span>
                </div>
              </div>
            )}

            {step === "viewPolicy" && selectedProvider === "aws" && (
              <div className="text-gray-300 text-sm space-y-8">
                <div>
                  <p className="mb-2 font-semibold">
                    1. Create a new IAM User:
                  </p>
                  <pre className="bg-gray-800 rounded-lg p-4 text-xs overflow-auto shadow-inner text-gray-200">
                    aws iam create-user --user-name Skyflo_Read_Only_User
                  </pre>
                </div>

                <div>
                  <p className="mb-2 font-semibold">
                    2. Attach the AWS Managed ReadOnlyAccess Policy:
                  </p>
                  <pre className="bg-gray-800 rounded-lg p-4 text-xs overflow-auto shadow-inner text-gray-200">
                    aws iam attach-user-policy --user-name Skyflo_Read_Only_User
                    --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess
                  </pre>
                </div>
              </div>
            )}

            {step === "enterCredentials" && selectedProvider === "aws" && (
              <div>
                <div className="mb-4">
                  <label
                    className="block text-gray-300 text-sm font-semibold mb-2"
                    htmlFor="accessKeyId"
                  >
                    IAM User Access Key ID
                  </label>
                  <input
                    id="accessKeyId"
                    type="text"
                    className="bg-gray-800 text-white w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={accessKeyId}
                    onChange={(e) => setAccessKeyId(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-300 text-sm font-semibold mb-2"
                    htmlFor="secretAccessKey"
                  >
                    IAM User Access Secret
                  </label>
                  <input
                    id="secretAccessKey"
                    type="password"
                    className="bg-gray-800 text-white w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={secretAccessKey}
                    onChange={(e) => setSecretAccessKey(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-300 text-sm font-semibold mb-2"
                    htmlFor="region"
                  >
                    Region
                  </label>
                  <input
                    id="region"
                    type="text"
                    className="bg-gray-800 text-white w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  These credentials will be stored securely. We do not store
                  them as plain text. They will be encrypted using
                  industry-standard security practices.
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter
            className={`min-h-[90px] px-6 sm:px-8 py-4 flex justify-between items-center bg-dark-secondary ${
              step !== "selectProvider"
                ? "border-t border-gray-700"
                : "border-none"
            }`}
          >
            {step !== "selectProvider" && (
              <Button
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600 text-white"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            {step === "viewPolicy" && selectedProvider === "aws" && (
              <Button
                variant="primary"
                className="bg-blue-900 hover:bg-blue-600 text-white ml-auto"
                onClick={handleNextFromPolicy}
              >
                Next
              </Button>
            )}
            {step === "enterCredentials" && (
              <Button
                variant="primary"
                className="bg-blue-900 hover:bg-blue-600 text-white ml-auto"
                onClick={() => {
                  // TODO: Handle form submission, securely send encrypted credentials to backend
                }}
              >
                Finish
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
