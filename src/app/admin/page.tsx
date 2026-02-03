"use client";

import { COLORS } from "@/lib/constants";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  User,
  ArrowRight,
  ShoppingCart,
  Package,
  BarChart3,
} from "lucide-react";
import { RoleLayout } from "@/components/admin/RoleLayout";

const roles = [
  {
    role: "admin",
    title: "Admin Dashboard",
    description: "Kelola seluruh sistem, user, dan konfigurasi server",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    color: COLORS.primary,
    features: [
      "Manajemen User & Role",
      "System Settings",
      "Analytics & Reports",
    ],
  },
  {
    role: "staff",
    title: "Staff Dashboard",
    description: "Kelola pesanan, pelanggan, inventori, dan laporan penjualan",
    icon: UserCheck,
    href: "/staff/page",
    color: COLORS.accent,
    features: [
      "Order Management",
      "Customer Database",
      "Inventory Tracking",
    ],
  },
  {
    role: "customer",
    title: "Customer Portal",
    description: "Pantau pesanan, riwayat kutipan, dan profil akun Anda",
    icon: Users,
    href: "/customer/page",
    color: "#3b82f6",
    features: [
      "Pesanan Saya",
      "Riwayat Kutipan",
      "Profil Akun",
    ],
  },
];

export default function AdminGateway() {
  return (
    <RoleLayout
      role="admin"
      title="Admin Portal"
      subtitle="Pilih dashboard yang ingin Anda akses untuk mengelola sistem"
    >
      <div className="space-y-12">
        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.role} href={item.href} className="group">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full overflow-hidden">
                  {/* Header with color accent */}
                  <div
                    className="h-1"
                    style={{ backgroundColor: item.color }}
                  />

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <Icon size={28} style={{ color: item.color }} />
                    </div>

                    {/* Title & Description */}
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: COLORS.primary }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {item.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-semibold transition hover:shadow-lg group-hover:gap-3"
                      style={{ backgroundColor: item.color }}
                    >
                      Akses Dashboard
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 font-semibold">
            CV. Tihani Mafaza - Penyedia Barang & Jasa Profesional
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Kepuasan Anda adalah Prestasi Kami
          </p>
        </div>
      </div>
    </RoleLayout>
  );
}
