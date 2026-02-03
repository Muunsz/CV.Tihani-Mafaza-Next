"use client";

import { COLORS } from "@/lib/constants";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  User,
  ArrowRight,
} from "lucide-react";
import { Card } from "@heroui/react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const roles = [
  {
    role: "admin",
    title: "Admin Dashboard",
    description: "Kelola seluruh sistem, user, dan konfigurasi server",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    color: "#0e2431",
  },
  {
    role: "staff",
    title: "Staff Dashboard",
    description: "Kelola pesanan, pelanggan, inventori, dan laporan penjualan",
    icon: UserCheck,
    href: "/admin/staff",
    color: "#ff4f00",
  },
  {
    role: "customer",
    title: "Customer Portal",
    description: "Pantau pesanan, riwayat kutipan, dan profil akun Anda",
    icon: Users,
    href: "/admin/customer",
    color: "#3b82f6",
  },
  {
    role: "guest",
    title: "Guest Portal",
    description: "Jelajahi katalog produk tanpa perlu login",
    icon: User,
    href: "/admin/guest",
    color: "#8b5cf6",
  },
];

export default function AdminGateway() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: COLORS.primary }}
          >
            Admin Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilih role dashboard yang ingin Anda akses untuk mengelola sistem
            CV. Tihani Mafaza
          </p>
          <blockquote
            className="mt-6 text-lg italic text-gray-700 border-l-4 px-4"
            style={{ borderColor: COLORS.accent }}
          >
            &quot;Kepuasan Anda adalah Prestasi Kami&quot; - &quot;A thousand
            miles journey begins with one small step&quot;
          </blockquote>
        </div>

        {/* Role Cards with DaisyUI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.role} href={item.href} className="group">
                <div
                  className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full border-l-4"
                  style={{ borderLeftColor: item.color }}
                >
                  {/* Card Content */}
                  <div className="card-body">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="card-title text-2xl mb-2">
                          {item.title}
                        </h2>
                        <p className="text-base-content/70 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon size={32} style={{ color: item.color }} />
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="divider my-4" />
                    <ul className="space-y-2 text-sm">
                      {item.role === "admin" && (
                        <>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Manajemen User & Role
                          </li>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            System Settings
                          </li>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Analytics & Reports
                          </li>
                        </>
                      )}
                      {item.role === "staff" && (
                        <>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Order Management
                          </li>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Customer Database
                          </li>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Inventory Tracking
                          </li>
                        </>
                      )}
                      {item.role === "customer" && (
                        <>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Pesanan Saya
                          </li>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Riwayat Kutipan
                          </li>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Profil Akun
                          </li>
                        </>
                      )}
                      {item.role === "guest" && (
                        <>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Browsing Produk
                          </li>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Wishlist
                          </li>
                          <li className="flex items-center gap-2">
                            <span
                              className="badge badge-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              ✓
                            </span>{" "}
                            Quick Inquiry
                          </li>
                        </>
                      )}
                    </ul>

                    {/* CTA Button */}
                    <div className="card-actions justify-end mt-6">
                      <button
                        className="btn text-white gap-2 group-hover:gap-3 transition-all"
                        style={{
                          backgroundColor: item.color,
                          borderColor: item.color,
                        }}
                      >
                        Akses {item.title}
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-gray-600">
          <p className="mb-2">
            CV. Tihani Mafaza - Penyedia Barang & Jasa Profesional
          </p>
          <p className="text-sm">Kepuasan Anda adalah Prestasi Kami</p>
        </div>
      </div>
    </div>
  );
}
