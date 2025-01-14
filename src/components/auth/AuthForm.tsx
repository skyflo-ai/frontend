"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Make sure to import useRouter
import { Button } from "@/components/ui/button";
import { AuthInput } from "./AuthInput";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { handleAuth } from "@/lib/auth";

interface AuthFormProps {
  isLogin: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const router = useRouter();

  // Ensure component is mounted before accessing router
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMounted) return; // Prevent using router if component is not mounted

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await handleAuth(formData);

    if (result && result.success) {
      login(result.user);
      router.push("/dashboard"); // Only called after component mount
    } else {
      setError(result?.error || "Authentication failed");
    }

    setLoading(false);
  };

  if (!isMounted) {
    return null; // Prevent rendering until the component is fully mounted
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="hidden"
        name="authType"
        value={isLogin ? "login" : "register"}
      />
      <AuthInput
        id="email"
        type="email"
        name="email"
        placeholder="m@example.com"
        icon={Mail}
      />
      <AuthInput
        id="password"
        type="password"
        name="password"
        placeholder="••••••••"
        icon={Lock}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        className="w-full mt-4 bg-blue-900 hover:bg-blue-900 text-blue-300 border border-blue-800 leading-tight py-4  rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        type="submit"
        disabled={loading}
      >
        {loading
          ? isLogin
            ? "Signing in..."
            : "Creating account..."
          : isLogin
          ? "Sign In"
          : "Create Account"}
      </Button>

      <Button
        type="button"
        variant="link"
        className="text-left pl-0 mt-2 text-button-primary hover:text-button-hover transition-all duration-200 text-sm"
        onClick={() => console.log("Forgot password clicked")}
      >
        Forgot Password?
      </Button>
    </form>
  );
};
