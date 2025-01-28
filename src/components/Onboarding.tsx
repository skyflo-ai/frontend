// src/components/Onboarding.tsx

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
import { SiGooglecloud, SiKubernetes } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { kubernetesInstallManifests } from "@/lib/constants/kubernetes-install-manifests";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { CodeBlock } from "@/components/ui/code-block";
import { onboardingMarkdownComponents } from "@/components/ui/onboarding-markdown-components";
import { HiMiniSparkles } from "react-icons/hi2";

type Step =
  | "selectProvider"
  // AWS Steps
  | "awsCreateIamUser"
  | "awsEnterIamUserCredentials"
  // Kubernetes Steps
  | "kubernetesInstallHelmChart"
  | "kubernetesTestConnection";

type Provider = "aws" | "kubernetes" | null;

function AWSSetup({
  step,
  // We'll expose these states to parent or keep them local and provide getters.
  // For simplicity, we store them here and call parent callbacks when finishing.
  awsAccessKeyId,
  setAwsAccessKeyId,
  awsSecretAccessKey,
  setAwsSecretAccessKey,
  awsRegion,
  setAwsRegion,
}: {
  step: "awsCreateIamUser" | "awsEnterIamUserCredentials";
  awsAccessKeyId: string;
  setAwsAccessKeyId: React.Dispatch<React.SetStateAction<string>>;
  awsSecretAccessKey: string;
  setAwsSecretAccessKey: React.Dispatch<React.SetStateAction<string>>;
  awsRegion: string;
  setAwsRegion: React.Dispatch<React.SetStateAction<string>>;
}) {
  // Step 1: AWS IAM instructions
  if (step === "awsCreateIamUser") {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600/10 to-blue-500/10">
            <HiMiniSparkles className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-gray-300 text-sm font-semibold tracking-tight">
            Follow these steps to create a new IAM user
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-50 rounded-xl" />
          <CodeBlock
            code="aws iam create-user --user-name Skyflo_Read_Only_User"
            language="bash"
            showLineNumbers={false}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-50 rounded-xl" />
          <CodeBlock
            code="aws iam attach-user-policy --user-name Skyflo_Read_Only_User --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess"
            language="bash"
            showLineNumbers={false}
          />
        </div>
      </div>
    );
  }

  // Step 2: AWS Credentials
  if (step === "awsEnterIamUserCredentials") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="relative group">
          <label
            className="block text-gray-400 text-xs font-semibold mb-2 tracking-wide"
            htmlFor="accessKeyId"
          >
            IAM User Access Key ID
          </label>
          <div className="relative pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-xl" />
            <input
              id="accessKeyId"
              type="text"
              className="relative pointer-events-auto w-full px-4 py-3 bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-gray-300 text-sm rounded-xl
                border border-gray-800/50 focus:border-blue-400/50
                shadow-lg shadow-gray-950/50 focus:shadow-xl focus:shadow-blue-900/20
                outline-none transition-all duration-500
                placeholder:text-gray-600"
              value={awsAccessKeyId}
              onChange={(e) => setAwsAccessKeyId(e.target.value)}
              placeholder="Enter your AWS Access Key ID"
            />
          </div>
        </div>

        <div className="relative group">
          <label
            className="block text-gray-400 text-xs font-semibold mb-2 tracking-wide"
            htmlFor="secretAccessKey"
          >
            IAM User Access Secret
          </label>
          <div className="relative pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-xl" />
            <input
              id="secretAccessKey"
              type="password"
              className="relative pointer-events-auto w-full px-4 py-3 bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-gray-300 text-sm rounded-xl
                border border-gray-800/50 focus:border-blue-400/50
                shadow-lg shadow-gray-950/50 focus:shadow-xl focus:shadow-blue-900/20
                outline-none transition-all duration-500
                placeholder:text-gray-600"
              value={awsSecretAccessKey}
              onChange={(e) => setAwsSecretAccessKey(e.target.value)}
              placeholder="Enter your AWS Secret Access Key"
            />
          </div>
        </div>

        <div className="relative group">
          <label
            className="block text-gray-400 text-xs font-semibold mb-2 tracking-wide"
            htmlFor="region"
          >
            Region
          </label>
          <div className="relative pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-xl" />
            <input
              id="region"
              type="text"
              className="relative pointer-events-auto w-full px-4 py-3 bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-gray-300 text-sm rounded-xl
                border border-gray-800/50 focus:border-blue-400/50
                shadow-lg shadow-gray-950/50 focus:shadow-xl focus:shadow-blue-900/20
                outline-none transition-all duration-500
                placeholder:text-gray-600"
              value={awsRegion}
              onChange={(e) => setAwsRegion(e.target.value)}
              placeholder="e.g. us-west-2"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center space-x-2 text-xs text-gray-500 mt-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-4 rounded-xl border border-gray-800/30"
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-600/10 to-blue-500/10"></div>
          <p className="leading-relaxed">
            Your credentials will be encrypted and stored securely. We follow
            industry best practices for data protection.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return null;
}

function KubernetesSetup({
  step,
  helmChartRepo,
  setHelmChartRepo,
  helmChartName,
  setHelmChartName,
  kubeConfig,
  setKubeConfig,
}: {
  step: "kubernetesInstallHelmChart" | "kubernetesTestConnection";
  helmChartRepo: string;
  setHelmChartRepo: React.Dispatch<React.SetStateAction<string>>;
  helmChartName: string;
  setHelmChartName: React.Dispatch<React.SetStateAction<string>>;
  kubeConfig: string;
  setKubeConfig: React.Dispatch<React.SetStateAction<string>>;
}) {
  // Step 1: Install Helm Chart
  if (step === "kubernetesInstallHelmChart") {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600/10 to-blue-500/10">
            <HiMiniSparkles className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-gray-300 text-sm font-semibold tracking-tight">
            Install the following manifests to your Kubernetes cluster
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-50 rounded-xl" />
          <CodeBlock
            code={kubernetesInstallManifests}
            language="yaml"
            showLineNumbers={false}
          />
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-50 rounded-xl" />
          <CodeBlock
            code="kubectl apply -f install-skyflo.yaml"
            language="bash"
            showLineNumbers={false}
          />
        </div>
      </div>
    );
  }

  // Step 2: Test Connection
  if (step === "kubernetesTestConnection") {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent blur-xl" />
          <div className="relative bg-gradient-to-br from-blue-600/10 to-blue-500/10 p-4 rounded-xl shadow-lg shadow-blue-500/5 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            Establishing connection to your Kubernetes cluster...
          </p>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Main Onboarding Component
 */
export default function ConnectCloudPage() {
  // Steps
  type Step =
    | "selectProvider"
    | "awsCreateIamUser"
    | "awsEnterIamUserCredentials"
    | "kubernetesInstallHelmChart"
    | "kubernetesTestConnection";

  const [step, setStep] = useState<Step>("selectProvider");
  const [selectedProvider, setSelectedProvider] = useState<
    "aws" | "kubernetes" | null
  >(null);

  // AWS form states
  const [awsAccessKeyId, setAwsAccessKeyId] = useState("");
  const [awsSecretAccessKey, setAwsSecretAccessKey] = useState("");
  const [awsRegion, setAwsRegion] = useState("");

  // K8s form states
  const [helmChartRepo, setHelmChartRepo] = useState(
    "https://charts.helm.sh/stable"
  );
  const [helmChartName, setHelmChartName] = useState("skyflo");
  const [kubeConfig, setKubeConfig] = useState("");

  const router = useRouter();

  // Provider selection
  const handleSelectProvider = (provider: "aws" | "kubernetes") => {
    setSelectedProvider(provider);
    console.log(provider);
    if (provider === "aws") {
      setStep("awsCreateIamUser");
    } else {
      setStep("kubernetesInstallHelmChart");
    }
  };

  // Single back logic
  const handleBack = () => {
    if (step === "awsCreateIamUser" || step === "kubernetesInstallHelmChart") {
      setSelectedProvider(null);
      setStep("selectProvider");
    } else if (step === "awsEnterIamUserCredentials") {
      setStep("awsCreateIamUser");
    } else if (step === "kubernetesTestConnection") {
      setStep("kubernetesInstallHelmChart");
    }
  };

  // Example finish handlers
  const finishAWS = async () => {
    setTimeout(() => {
      router.push("/agents");
    }, 1000);
  };

  const finishKubernetes = async () => {
    setTimeout(() => {
      router.push("/agents");
    }, 1000);
  };

  // Render logic for the main content area
  const renderStepContent = () => {
    if (step === "selectProvider") {
      return (
        <div className="grid grid-cols-2 gap-8">
          {/* AWS */}
          <motion.button
            onClick={() => handleSelectProvider("aws")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative flex flex-col items-center justify-center 
                       h-[220px] rounded-4xl overflow-hidden 
                       transition-all duration-500
                       shadow-md shadow-gray-800/30"
            /* ↑ subtle, minimalistic box shadow */
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-900/98 
                         to-gray-800/98 border border-gray-800/30 rounded-2xl 
                         transition-all duration-500 
                         group-hover:border-blue-500/30 group-hover:shadow-2xl 
                         group-hover:shadow-blue-500/20"
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 
                         via-transparent to-transparent opacity-0 
                         group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="p-4 
                           rounded-xl shadow-lg shadow-blue-500/5 backdrop-blur-sm
                           transform group-hover:scale-110 group-hover:shadow-xl 
                           group-hover:shadow-blue-500/10 transition-all duration-500"
              >
                <FaAws className="w-7 h-7 text-blue-400" />
              </div>
              <p
                className="mt-4 text-sm font-semibold tracking-tight bg-gradient-to-r from-gray-100
                           to-gray-300 bg-clip-text text-transparent
                           group-hover:from-blue-400 group-hover:to-blue-300
                           transition-all duration-500"
              >
                AWS
              </p>
            </div>
          </motion.button>

          {/* Kubernetes */}
          <motion.button
            onClick={() => handleSelectProvider("kubernetes")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative flex flex-col items-center justify-center 
                       h-[220px] rounded-2xl overflow-hidden
                       transition-all duration-500
                       shadow-md shadow-gray-800/30"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-900/98
                         to-gray-800/98 border border-gray-800/30 rounded-2xl
                         transition-all duration-500
                         group-hover:border-blue-500/30 group-hover:shadow-2xl
                         group-hover:shadow-blue-500/20"
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 
                         via-transparent to-transparent opacity-0
                         group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="p-4 
                           rounded-xl shadow-lg shadow-blue-500/5 backdrop-blur-sm
                           transform group-hover:scale-110 group-hover:shadow-xl 
                           group-hover:shadow-blue-500/10 transition-all duration-500"
              >
                <SiKubernetes className="w-7 h-7 text-blue-400" />
              </div>
              <p
                className="mt-4 text-sm font-medium bg-gradient-to-r from-gray-100
                           to-gray-300 bg-clip-text text-transparent
                           group-hover:from-blue-400 group-hover:to-blue-300
                           transition-all duration-500"
              >
                Kubernetes
              </p>
            </div>
          </motion.button>

          {/* Azure (Coming Soon) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group relative flex flex-col items-center justify-center
                       h-[220px] rounded-2xl overflow-hidden cursor-not-allowed
                       shadow-md shadow-gray-800/30"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-900/80
                            to-gray-800/80 border border-gray-800/20 rounded-2xl"
            />
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 
                           p-4 rounded-xl shadow-lg backdrop-blur-sm"
              >
                <VscAzure className="w-7 h-7 text-gray-600" />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <p className="text-sm font-medium text-gray-600">Azure</p>
                <span
                  className="mt-2 text-[10px] font-medium text-gray-700 
                             px-2 py-0.5 rounded-full bg-gray-800/50 
                             border border-gray-700/30"
                >
                  Coming Soon
                </span>
              </div>
            </div>
          </motion.div>

          {/* GCP (Coming Soon) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="group relative flex flex-col items-center justify-center
                       h-[220px] rounded-2xl overflow-hidden cursor-not-allowed
                       shadow-md shadow-gray-800/30"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-900/80
                            to-gray-800/80 border border-gray-800/20 rounded-2xl"
            />
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 
                           p-4 rounded-xl shadow-lg backdrop-blur-sm"
              >
                <SiGooglecloud className="w-7 h-7 text-gray-600" />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <p className="text-sm font-medium text-gray-600">GCP</p>
                <span
                  className="mt-2 text-[10px] font-medium text-gray-700
                             px-2 py-0.5 rounded-full bg-gray-800/50
                             border border-gray-700/30"
                >
                  Coming Soon
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    if (selectedProvider === "aws") {
      return (
        <AWSSetup
          step={step as "awsCreateIamUser" | "awsEnterIamUserCredentials"}
          awsAccessKeyId={awsAccessKeyId}
          setAwsAccessKeyId={setAwsAccessKeyId}
          awsSecretAccessKey={awsSecretAccessKey}
          setAwsSecretAccessKey={setAwsSecretAccessKey}
          awsRegion={awsRegion}
          setAwsRegion={setAwsRegion}
        />
      );
    }

    if (selectedProvider === "kubernetes") {
      return (
        <KubernetesSetup
          step={
            step as "kubernetesInstallHelmChart" | "kubernetesTestConnection"
          }
          helmChartRepo={helmChartRepo}
          setHelmChartRepo={setHelmChartRepo}
          helmChartName={helmChartName}
          setHelmChartName={setHelmChartName}
          kubeConfig={kubeConfig}
          setKubeConfig={setKubeConfig}
        />
      );
    }

    return null;
  };

  return (
    <div className=" flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8  ">
      {/* Ambient background effect */}
      <div className="absolute inset-0 -top-40">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute right-0 top-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent w-96 h-96 blur-3xl" />
      </div>

      <Card className="z-10 bg-gradient-to-br from-gray-900/98 to-gray-800/98 border-gray-800/30 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/10 rounded-2xl overflow-hidden w-full max-w-[600px] transition-all duration-500">
        {step === "selectProvider" && (
          <CardHeader className="px-8 py-6 bg-gradient-to-br from-gray-900/98 to-gray-800/98 border-b border-gray-800/30">
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent px-1 relative">
                Connect Your Cloud
              </span>
            </CardTitle>
            <CardDescription className="text-center text-gray-400 text-xs font-semibold">
              Select a provider to get started.
            </CardDescription>
          </CardHeader>
        )}

        {(step === "kubernetesTestConnection" ||
          step === "awsEnterIamUserCredentials") && (
          <CardHeader className="px-8 py-6 bg-gradient-to-br from-gray-900/98 to-gray-800/98 border-b border-gray-800/30">
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent px-1 relative">
                {step === "kubernetesTestConnection"
                  ? "Testing Connection"
                  : "Enter AWS Credentials"}
              </span>
            </CardTitle>
          </CardHeader>
        )}

        <CardContent className="p-8 flex flex-col justify-center min-h-[550px] ">
          {renderStepContent()}
        </CardContent>

        <CardFooter
          className={`px-8 py-6 flex justify-between items-center bg-gradient-to-br from-gray900/50 to-gray-800/50 ${
            step !== "selectProvider" ? "border-none" : "border-none"
          }`}
        >
          {step !== "selectProvider" && (
            <Button
              variant="secondary"
              className="text-gray-400 hover:bg-gray-300 hover:text-blue-950 font-semibold transition-all duration-300"
              onClick={handleBack}
            >
              Back
            </Button>
          )}

          {/* AWS steps */}
          {step === "awsCreateIamUser" && selectedProvider === "aws" && (
            <Button
              variant="default"
              className="bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 font-semibold transition-all duration-300"
              onClick={() => setStep("awsEnterIamUserCredentials")}
            >
              Next
            </Button>
          )}
          {step === "awsEnterIamUserCredentials" &&
            selectedProvider === "aws" && (
              <Button
                variant="default"
                className="bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 font-semibold transition-all duration-300"
                onClick={finishAWS}
              >
                Finish
              </Button>
            )}

          {/* Kubernetes steps */}
          {step === "kubernetesInstallHelmChart" &&
            selectedProvider === "kubernetes" && (
              <Button
                variant="default"
                className="bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 font-semibold transition-all duration-300"
                onClick={() => setStep("kubernetesTestConnection")}
              >
                Next
              </Button>
            )}
          {step === "kubernetesTestConnection" &&
            selectedProvider === "kubernetes" && (
              <Button
                variant="default"
                className="bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 font-semibold transition-all duration-300"
                onClick={finishKubernetes}
              >
                Finish
              </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
