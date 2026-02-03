"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Package,
  MessageSquare,
  DollarSign,
} from "lucide-react";
import { COLORS } from "@/lib/constants";
import { useState } from "react";

interface AdminSidebarProps {
  role: "staff" | "customer" | "guest" | "admin";
}

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const getMenuItems = () => {
    if (role === "admin") {
      return [
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          icon: LayoutDashboard,
          badge: null,
        },
        {
          section: "Manajemen",
          items: [
            { label: "Produk", href: "/admin/products", icon: Package },
            { label: "Pesanan", href: "/admin/orders", icon: ShoppingCart },
            { label: "Customers", href: "/admin/users", icon: Users },
            { label: "Staff", href: "/admin/staff-management", icon: Users },
          ],
        },
        {
          section: "Konten",
          items: [
            {
              label: "Promo & Diskon",
              href: "/admin/orders",
              icon: DollarSign,
            },
            { label: "FAQ", href: "/admin/orders", icon: FileText },
            { label: "Artikel", href: "/admin/orders", icon: FileText },
            { label: "Testimoni", href: "/admin/orders", icon: MessageSquare },
          ],
        },
        {
          section: "Laporan & Analytics",
          items: [
            { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
            { label: "Laporan Penjualan", href: "/admin/orders", icon: FileText },
          ],
        },
        {
          label: "Pengaturan",
          href: "/admin/settings",
          icon: Settings,
          badge: null,
        },
      ];
    }

    const baseItems = [
      {
        label: "Dashboard",
        href: `/admin/${role}`,
        icon: LayoutDashboard,
        badge: null,
      },
    ];

    if (role === "staff") {
      return [
        ...baseItems,
        {
          section: "Operasional",
          items: [
            { label: "Pesanan", href: `/staff/orders`, icon: ShoppingCart },
            {
              label: "Permintaan Kutipan",
              href: `/staff/quotations`,
              icon: FileText,
            },
            { label: "Pelanggan", href: `/staff/customers`, icon: Users },
            {
              label: "Inventori",
              href: `/staff/inventory`,
              icon: ShoppingCart,
            },
          ],
        },
        {
          section: "Laporan",
          items: [
            { label: "Laporan Penjualan", href: `/staff/reports`, icon: BarChart3 },
          ],
        },
        {
          label: "Pengaturan",
          href: `/staff/settings`,
          icon: Settings,
          badge: null,
        },
      ];
    }

    if (role === "customer") {
      return [
        ...baseItems,
        {
          section: "Transaksi Saya",
          items: [
            {
              label: "Pesanan Saya",
              href: `/customer/orders`,
              icon: ShoppingCart,
            },
            {
              label: "Riwayat Kutipan",
              href: `/customer/quotations`,
              icon: FileText,
            },
          ],
        },
        {
          label: "Profil",
          href: `/customer/profile`,
          icon: Users,
          badge: null,
        },
        {
          label: "Pengaturan",
          href: `/customer/profile`,
          icon: Settings,
          badge: null,
        },
      ];
    }

    // Guest
    return [
      ...baseItems,
      {
        section: "Jelajahi",
        items: [
          { label: "Produk Katalog", href: `/guest/products`, icon: Package },
          { label: "Bantuan & FAQ", href: `/guest/faq`, icon: FileText },
        ],
      },
    ];
  };

  const menuItems = getMenuItems();
  const isActive = (href: string) => pathname.startsWith(href);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg shadow-lg hover:shadow-xl transition"
        style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 transition-all duration-300 lg:relative lg:translate-x-0 z-30 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
      >
        {/* Header */}
        <div
          className="sticky top-0 p-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-white bg-opacity-20 flex items-center justify-center font-bold text-lg">
              TM
            </div>
            <div>
              <h2 className="text-xl font-bold">Tihani</h2>
              <p className="text-xs opacity-70">
                {role === "admin"
                  ? "Administrator"
                  : role === "staff"
                    ? "Staff"
                    : role === "customer"
                      ? "Pelanggan"
                      : "Tamu"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item: any, idx) => {
            if (item.section) {
              return (
                <div key={`section-${idx}`} className="mt-6 first:mt-0">
                  <p className="px-4 py-2 text-xs font-semibold uppercase opacity-60 tracking-wider">
                    {item.section}
                  </p>
                  <div className="space-y-1">
                    {item.items.map((subItem: any) => {
                      const Icon = subItem.icon;
                      const active = isActive(subItem.href);
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                            active
                              ? "bg-white bg-opacity-20 font-semibold"
                              : "hover:bg-white hover:bg-opacity-10"
                          }`}
                        >
                          <Icon size={18} className="flex-shrink-0" />
                          <span className="text-sm">{subItem.label}</span>
                          {subItem.badge && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Single menu item
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                  active
                    ? "bg-white bg-opacity-20 font-semibold"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-200 font-medium text-sm"
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Default export for compatibility
export default AdminSidebar;
