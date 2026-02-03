"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLORS } from "@/lib/constants";
import {
  LayoutGrid,
  ShoppingBag,
  Heart,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { label: "Dashboard", href: "/customer/dashboard", icon: LayoutGrid },
  { label: "Katalog Produk", href: "/customer/products", icon: ShoppingBag },
  { label: "Keranjang", href: "/customer/cart", icon: ShoppingBag },
  { label: "Pesanan Saya", href: "/customer/orders", icon: Package },
  { label: "Wishlist", href: "/customer/wishlist", icon: Heart },
  { label: "Pesan", href: "/customer/messages", icon: MessageSquare },
  { label: "Notifikasi", href: "/customer/notifications", icon: Bell },
  { label: "Profil", href: "/customer/profile", icon: User },
  { label: "Pengaturan", href: "/customer/settings", icon: Settings },
];

interface CustomerSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CustomerSidebar({ isOpen = true, onClose }: CustomerSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/guest/auth/login" });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-gray-100"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          isOpen && !isMobileOpen ? "w-64" : "w-0 md:w-64"
        } ${isMobileOpen ? "w-64 z-40" : ""} overflow-hidden`}
      >
        <div className="p-6">
          {/* Brand */}
          <h1
            className="text-2xl font-bold mb-8"
            style={{ color: COLORS.primary }}
          >
            Tihani
          </h1>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={{
                    backgroundColor: isActive ? COLORS.accent : undefined,
                  }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 transition text-left"
            >
              <LogOut size={20} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
