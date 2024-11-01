"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen text-gray-200 px-4 sm:px-6 md:px-8 bg-dark">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px]"
      >
        <Card className="bg-dark-secondary border-gray-700 shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="px-6 sm:px-8 bg-gradient-to-r from-dark-secondary to-dark-navbar">
            <CardTitle className="text-2xl mb-2 sm:text-3xl font-bold text-white tracking-normal flex items-center justify-center">
              Skyflo.ai
            </CardTitle>
            <CardDescription className="text-center text-gray-400 text-xs sm:text-sm">
              An AI-powered Cloud Management Platform
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-6 sm:mt-6 px-6 sm:px-8">
            <div className="flex items-center justify-center gap-4 mb-6 text-sm w-full">
              <button className="flex items-center justify-center bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 shadow-lg transition-transform duration-200 ease-in-out">
                <FaGoogle className="mr-2" /> Google
              </button>
              <button className="flex items-center justify-center bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 shadow-lg transition-transform duration-200 ease-in-out">
                <FaGithub className="mr-2" /> GitHub
              </button>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-full h-[1px] bg-gray-700"></div>
              <p className="mx-4 text-gray-400 text-sm">or</p>
              <div className="w-full h-[1px] bg-gray-700"></div>
            </div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-700 rounded-lg p-1 mb-6">
                {["login", "register"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md text-gray-300 data-[state=active]:bg-button-primary data-[state=active]:text-white transition-all duration-200"
                  >
                    {tab === "login" ? "Login" : "Register"}
                  </TabsTrigger>
                ))}
              </TabsList>
              {["login", "register"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <AuthForm isLogin={tab === "login"} />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="px-6 sm:px-8 pt-6">
            <p className="text-center text-xs text-gray-400 w-full leading-relaxed">
              By signing in, you agree to our{" "}
              <a className="underline" href="/terms">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline" href="/privacy">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
