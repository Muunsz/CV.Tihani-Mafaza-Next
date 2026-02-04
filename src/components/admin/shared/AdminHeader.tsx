"use client";

import { COLORS, CONTACT } from "@/lib/constants";
import {
  Bell,
  Search,
  User,
  MessageSquare,
  LogOut,
  Smartphone,
  Monitor,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/guest/auth/login" });
  };

  return (
    <div
      className="border-b sticky top-0 z-40"
      style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Title Section */}
        <div className="flex-1">
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: COLORS.primary }}
          >
            {title}
          </h1>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Version Toggle */}
          <button
            onClick={() => setIsMobileView(!isMobileView)}
            className="p-2 hover:bg-gray-100 rounded-lg transition duration-200 hidden lg:block"
            title={isMobileView ? "Desktop View" : "Mobile View"}
          >
            {isMobileView ? (
              <Monitor size={20} style={{ color: COLORS.accent }} />
            ) : (
              <Smartphone size={20} style={{ color: COLORS.primary }} />
            )}
          </button>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent outline-none text-sm w-40 focus:text-gray-700"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition duration-200">
            <Bell size={20} style={{ color: COLORS.primary }} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS.accent }}
            />
          </button>

          {/* Messages - Hidden on mobile */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition duration-200 hidden sm:block">
            <MessageSquare size={20} style={{ color: COLORS.primary }} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS.accent }}
            />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition duration-200"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: COLORS.accent }}
              >
                A
              </div>
              <div className="hidden sm:block text-left text-sm">
                <p className="font-semibold" style={{ color: COLORS.primary }}>
                  Admin
                </p>
                <p className="text-xs" style={{ color: COLORS.gray }}>
                  Tihani
                </p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 rounded-t-lg">
                  <User size={16} />
                  Profil Admin
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg border-t border-gray-200"
                >
                  <LogOut size={16} />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export for compatibility
export default AdminHeader;
