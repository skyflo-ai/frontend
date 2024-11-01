"use client";

import React, { useState, useRef, useEffect } from "react";

import { Home, Menu, History, Flag } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
// import NavIcon from "@/components/navbar/NavIcon";

import { LogOut, Settings, User, CreditCard } from "lucide-react"; // Example icons
import { useAuth } from "@/components/auth/AuthProvider";
import { handleLogout } from "@/lib/auth";
import { useRouter } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type User = {
  email: string;
  plan: string;
};

export default function Navbar({
  user,
  clearFlowData,
}: {
  user: User;
  clearFlowData: () => void;
}) {
  return (
    <nav className="h-screen w-16 bg-dark-navbar flex flex-col items-center justify-center py-4 border-r border-border">
      {/* Logo placeholder */}
      <div className="w-10 h-10 rounded-full mb-8">
        <img
          src="/logo_v0.webp"
          alt="logo"
          className="w-full h-full rounded-full"
        />
      </div>

      <TooltipProvider>
        {/* Nav icons */}
        <div className="flex-grow text-center space-y-3 mt-auto">
          <NavIcon
            icon={<Home size={20} />}
            tooltip="Home"
            onClick={() => clearFlowData()}
          />
          <NavIcon icon={<History size={20} />} tooltip="History" />
          <NavIcon icon={<Flag size={20} />} tooltip="Feedback" />
        </div>

        {/* Menu icon at the bottom */}
        <div className="mt-auto">
          <BottomMenu
            icon={<Menu size={20} />}
            userEmail={user?.email}
            userPlan={user?.plan}
          />
        </div>
      </TooltipProvider>
    </nav>
  );
}

function BottomMenu({
  icon,
  userEmail,
  userPlan,
}: {
  icon: React.ReactNode;
  userEmail: string;
  userPlan: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { logout } = useAuth();
  const router = useRouter();

  const handleLogoutOnClick = async () => {
    await handleLogout();
    logout();
    router.push("/login");
  };

  // Handle click outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className={`p-2.5 rounded-lg text-white ${
          isOpen ? "bg-dark-navbar" : "hover:bg-dark-hover"
        } transition-colors`}
      >
        {icon}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="z-50 border border-border-menu absolute bottom-0 left-full ml-2 w-56 bg-dark-navbar text-white shadow-lg rounded-md py-2 flex flex-col space-y-1"
        >
          {/* Plan and Email section */}
          <div className="px-4 py-2 text-left">
            <span className="bg-dark-secondary text-xs px-2.5 py-1.5 rounded-xl">
              {userPlan}
            </span>
            <p className="text-sm mt-3">{userEmail}</p>
          </div>

          {/* Divider */}
          <hr className="border-border-menu" />

          {/* Menu Options */}
          <div className="px-2 py-2 flex flex-col space-y-2">
            <button className="flex items-center text-sm hover:bg-dark-hover p-2 rounded">
              <User size={18} className="mr-4" />
              Profile
            </button>
            <button className="flex items-center text-sm hover:bg-dark-hover p-2 rounded">
              <Settings size={18} className="mr-4" />
              Settings
            </button>
            <button className="flex items-center text-sm hover:bg-dark-hover p-2 rounded">
              <CreditCard size={18} className="mr-4" />
              Pricing
            </button>
            <button
              onClick={handleLogoutOnClick}
              className="flex items-center text-sm hover:bg-dark-hover p-2 rounded"
            >
              <LogOut size={18} className="mr-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NavIcon({
  icon,
  tooltip,
  onClick,
  isActive,
}: {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
  isActive?: boolean;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={`p-2.5 rounded-lg text-white ${
              isActive ? "bg-dark-active" : "hover:bg-dark-hover"
            } transition-colors`}
          >
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
