"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutGrid,
  ShoppingBag,
  Heart,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  TrendingUp,
  Award,
  Truck,
  Star,
  MapPin,
  CreditCard,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/customer/dashboard",
    icon: LayoutGrid,
    description: "Ringkasan akun Anda",
  },
  {
    label: "Katalog Produk",
    href: "/customer/products",
    icon: ShoppingBag,
    description: "Jelajahi produk",
  },
  {
    label: "Keranjang",
    href: "/customer/cart",
    icon: ShoppingBag,
    description: "Lihat keranjang belanja",
  },
  {
    label: "Pesanan Saya",
    href: "/customer/orders",
    icon: Package,
    description: "Riwayat pesanan",
    submenu: [
      { label: "Semua Pesanan", href: "/customer/orders" },
      { label: "Proses", href: "/customer/orders?status=processing" },
      { label: "Dikirim", href: "/customer/orders?status=shipped" },
      { label: "Selesai", href: "/customer/orders?status=delivered" },
    ],
  },
  {
    label: "Wishlist",
    href: "/customer/wishlist",
    icon: Heart,
    description: "Produk favorit Anda",
  },
  {
    label: "Notifikasi",
    href: "/customer/notifications",
    icon: Bell,
    description: "Pesan dan update",
  },
];

const profileMenuItems = [
  {
    label: "Profil",
    href: "/customer/profile",
    icon: User,
    description: "Informasi akun",
  },
  {
    label: "Alamat",
    href: "/customer/profile/addresses",
    icon: MapPin,
    description: "Kelola alamat",
  },
  {
    label: "Pembayaran",
    href: "/customer/profile/payments",
    icon: CreditCard,
    description: "Metode pembayaran",
  },
  {
    label: "Keamanan",
    href: "/customer/profile/change-password",
    icon: Settings,
    description: "Ubah password",
  },
];

const loyaltyStats = [
  {
    label: "Poin Reward",
    value: "2,450",
    icon: Award,
    color: "from-amber-400 to-orange-500",
  },
  {
    label: "Total Belanja",
    value: "Rp 12.5jt",
    icon: TrendingUp,
    color: "from-blue-400 to-blue-600",
  },
  {
    label: "Pesanan Aktif",
    value: "3",
    icon: Truck,
    color: "from-green-400 to-emerald-600",
  },
  {
    label: "Rating",
    value: "4.8★",
    icon: Star,
    color: "from-purple-400 to-pink-500",
  },
];

interface CustomerSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CustomerSidebar({}: CustomerSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    console.log("[CUSTOMER_LOGOUT] Starting logout process");

    try {
      // Call signOut without redirect - we'll handle redirect manually
      await signOut({
        redirect: false,
      });

      console.log("[CUSTOMER_LOGOUT] SignOut successful, redirecting...");

      // Small delay to ensure session is cleared
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect to home
      window.location.href = "/";
    } catch (error) {
      console.error("[CUSTOMER_LOGOUT] Error during logout:", error);
      // Force redirect anyway
      window.location.href = "/";
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-lg hover:bg-gray-50"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white border-r border-slate-700 transition-all duration-300 overflow-y-auto ${
          isMobileOpen ? "w-64 z-40" : "w-0 md:w-64"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ShopHub
          </h1>
          <p className="text-sm text-slate-400 mt-1">Customer Portal</p>
        </div>

        <div className="p-6 space-y-6">
          {/* User Info Card */}
          {session?.user && (
            <div className="p-4 bg-linear-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-600 hover:border-slate-500 transition">
              <div className="flex items-center gap-3">
                {"image" in session.user && session.user.image ? (
                  <img
                    src={String(session.user.image)}
                    alt={session.user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-400"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-cyan-400 flex items-center justify-center font-bold">
                    {session.user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-sm">{session.user.name}</p>
                  <p className="text-xs text-slate-400">{session.user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loyalty Stats */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Statistik
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {loyaltyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-lg bg-slate-700 border border-slate-600 hover:border-slate-500 transition"
                >
                  <div className="flex items-center gap-2 mb-2 text-xs text-slate-300">
                    <stat.icon className="w-4 h-4" />
                    <span>{stat.label}</span>
                  </div>
                  <p className="font-bold text-sm text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Menu */}
          <nav className="space-y-1">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Menu Utama
            </h3>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isItemActive = isActive(item.href);

              return (
                <div key={item.href}>
                  {item.submenu ? (
                    <button
                      onClick={() =>
                        setExpandedMenu(
                          expandedMenu === item.label ? null : item.label,
                        )
                      }
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                        isItemActive
                          ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white"
                          : "text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <Icon size={20} className="shrink-0" />
                      <span className="flex-1 text-left font-medium">
                        {item.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition ${
                          expandedMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                        isItemActive
                          ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white"
                          : "text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <Icon size={20} className="shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.submenu && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedMenu === item.label ? "max-h-48" : "max-h-0"
                      }`}
                    >
                      <div className="pl-8 py-1 space-y-1 bg-slate-700 bg-opacity-50">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                              isActive(subitem.href)
                                ? "bg-blue-500 text-white"
                                : "text-slate-300 hover:bg-slate-600"
                            }`}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Profile Menu */}
          <nav className="space-y-1 border-t border-slate-700 pt-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Akun
            </h3>
            {profileMenuItems.map((item) => {
              const Icon = item.icon;
              const isItemActive = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                    isItemActive
                      ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed border border-red-500"
          >
            <LogOut size={20} />
            <span>{isLoggingOut ? "Keluar..." : "Keluar"}</span>
          </button>
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
