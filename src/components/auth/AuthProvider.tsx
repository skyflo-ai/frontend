"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Hook to get the current pathname

interface AuthContextType {
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const protectedRoutes = ["/dashboard", "/pricing"];

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          // If user is on the login page but already logged in, redirect to dashboard
          if (pathname === "/login") {
            router.push("/dashboard");
          }
        } else {
          setUser(null);

          // If user is trying to access a protected route, redirect to login
          if (protectedRoutes.includes(pathname)) {
            router.push("/login");
          }
        }
      } catch (error) {
        setUser(null);

        // If there is an error and the user is on a protected route, redirect to login
        if (protectedRoutes.includes(pathname)) {
          router.push("/login");
        }
        console.error("Failed to fetch user session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [pathname]); // Run this effect on route changes

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
