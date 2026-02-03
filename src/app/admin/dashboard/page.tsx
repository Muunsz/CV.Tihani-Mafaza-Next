"use client";

import { RoleLayout } from "@/components/admin/RoleLayout";
import { AdminMetrics } from "@/components/admin/admin/AdminMetrics";
import { COLORS } from "@/lib/constants";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, TrendingUp, Users, Zap } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const revenueData = [
  { month: "Jan", revenue: 4.2, target: 4.5 },
  { month: "Feb", revenue: 3.8, target: 4.5 },
  { month: "Mar", revenue: 5.2, target: 4.5 },
  { month: "Apr", revenue: 4.9, target: 4.5 },
  { month: "May", revenue: 6.1, target: 4.5 },
  { month: "Jun", revenue: 5.8, target: 4.5 },
  { month: "Jul", revenue: 7.2, target: 4.5 },
];

const userData = [
  { type: "Admin", count: 5 },
  { type: "Staff", count: 24 },
  { type: "Customer", count: 542 },
  { type: "Guest", count: 1250 },
];

function AdminDashboardContent() {
  return (
    <div className="space-y-8">
      {/* Admin Metrics */}
      <AdminMetrics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3
            className="text-lg font-bold mb-6"
            style={{ color: COLORS.primary }}
          >
            Tren Pendapatan vs Target
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.accent}
                strokeWidth={2}
                name="Pendapatan (M)"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={COLORS.primary}
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target (M)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3
            className="text-lg font-bold mb-6"
            style={{ color: COLORS.primary }}
          >
            Distribusi User
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={COLORS.accent} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: COLORS.primary }}
          >
            Kesehatan Sistem
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={18} style={{ color: COLORS.accent }} />
                <span className="font-semibold">Server Status</span>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} style={{ color: COLORS.accent }} />
                <span className="font-semibold">Database</span>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                Optimal
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} style={{ color: COLORS.accent }} />
                <span className="font-semibold">Active Users</span>
              </div>
              <span className="font-bold">1,847</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: COLORS.primary }}
          >
            Pesanan Terbaru
          </h3>
          <div className="space-y-3">
            {[
              {
                id: "ORD-001",
                customer: "PT Maju Jaya",
                amount: 15000000,
                time: "2 jam lalu",
              },
              {
                id: "ORD-002",
                customer: "PT Berkah Sejahtera",
                amount: 8500000,
                time: "4 jam lalu",
              },
              {
                id: "ORD-003",
                customer: "CV Semangat Kerja",
                amount: 22000000,
                time: "6 jam lalu",
              },
              {
                id: "ORD-004",
                customer: "PT Maju Jaya",
                amount: 12000000,
                time: "1 hari lalu",
              },
            ].map((order) => (
              <div key={order.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{order.id}</p>
                    <p className="text-xs text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      Rp{(order.amount / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-xs text-gray-600">{order.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: COLORS.primary }}
          >
            Notifikasi Penting
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <AlertCircle
                size={20}
                className="text-yellow-600 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="font-semibold text-sm text-yellow-900">
                  Stok Menipis
                </p>
                <p className="text-xs text-yellow-800">
                  Kursi Kerja tinggal 5 unit
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <AlertCircle
                size={20}
                className="text-blue-600 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="font-semibold text-sm text-blue-900">
                  Backup Harian
                </p>
                <p className="text-xs text-blue-800">
                  Backup selesai jam 03:00 AM
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <AlertCircle
                size={20}
                className="text-green-600 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="font-semibold text-sm text-green-900">
                  Update Tersedia
                </p>
                <p className="text-xs text-green-800">
                  Versi sistem 2.1.0 siap diupdate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3
          className="text-lg font-bold mb-4"
          style={{ color: COLORS.primary }}
        >
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Buat User", icon: "👤" },
            { label: "View Laporan", icon: "📊" },
            { label: "Backup DB", icon: "💾" },
            { label: "Settings", icon: "⚙️" },
          ].map((action) => (
            <button
              key={action.label}
              className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-center"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <span className="text-sm font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <RoleLayout
      role="admin"
      title="Admin Dashboard"
      subtitle="Kelola sistem dan monitor performa secara real-time"
    >
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <AdminDashboardContent />
        </div>
      </div>
    </RoleLayout>
  );
}
