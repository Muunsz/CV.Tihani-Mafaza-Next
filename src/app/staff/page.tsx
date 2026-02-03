"use client";

import Link from "next/link";
import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import {
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  Package,
  Eye,
  Download,
} from "lucide-react";
import { useState } from "react";

// Mock data untuk pending orders yang perlu approval
const pendingOrders = [
  {
    id: "ORD-001",
    customer: "PT Maju Jaya",
    amount: 15000000,
    items: 5,
    status: "pending_approval",
    date: "2024-02-03",
    details: "5x Laptop Acer E5-474 Core i5",
  },
  {
    id: "ORD-002",
    customer: "SMK Bina Insani",
    amount: 8500000,
    items: 3,
    status: "pending_approval",
    date: "2024-02-03",
    details: "3x Mesin Absen Digital",
  },
  {
    id: "ORD-003",
    customer: "Kober Mawar",
    amount: 5500000,
    items: 2,
    status: "pending_approval",
    date: "2024-02-02",
    details: "2x Printer Epson L3110",
  },
];

const approvedOrders = [
  {
    id: "ORD-100",
    customer: "PT Sukses Bersama",
    amount: 12000000,
    items: 4,
    status: "approved",
    date: "2024-02-01",
    shippingStatus: "shipped",
  },
  {
    id: "ORD-101",
    customer: "CV Semangat Kerja",
    amount: 22000000,
    items: 8,
    status: "approved",
    date: "2024-01-31",
    shippingStatus: "delivered",
  },
];

const stats = [
  {
    label: "Total Pesanan Menunggu",
    value: pendingOrders.length.toString(),
    icon: Clock,
    color: "#f59e0b",
  },
  {
    label: "Pesanan Disetujui",
    value: approvedOrders.length.toString(),
    icon: CheckCircle,
    color: "#10b981",
  },
  {
    label: "Total Nilai Pending",
    value: `Rp${(pendingOrders.reduce((a, b) => a + b.amount, 0) / 1000000).toFixed(0)}M`,
    icon: TrendingUp,
    color: COLORS.accent,
  },
  {
    label: "Pelanggan Aktif",
    value: "24",
    icon: Users,
    color: "#3b82f6",
  },
];

function StaffDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [filter, setFilter] = useState("pending");

  const handleApproveOrder = (orderId: string) => {
    alert(`Pesanan ${orderId} telah disetujui!`);
    // Here you would call an API to approve the order
  };

  const handleRejectOrder = (orderId: string) => {
    alert(`Pesanan ${orderId} telah ditolak!`);
    // Here you would call an API to reject the order
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders Management Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold"
            style={{ color: COLORS.primary }}
          >
            Manajemen Pesanan
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                filter === "pending"
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                backgroundColor: filter === "pending" ? COLORS.accent : undefined,
              }}
            >
              <Clock size={16} className="inline mr-1" />
              Menunggu Approval ({pendingOrders.length})
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                filter === "approved"
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                backgroundColor: filter === "approved" ? "#10b981" : undefined,
              }}
            >
              <CheckCircle size={16} className="inline mr-1" />
              Disetujui ({approvedOrders.length})
            </button>
          </div>
        </div>

        {/* Pending Orders Table */}
        {filter === "pending" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="border-b"
                    style={{ backgroundColor: COLORS.primary + "08" }}
                  >
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      No. Pesanan
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Pelanggan
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Detail
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pendingOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-sm">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.details}
                      </td>
                      <td className="px-6 py-4 font-semibold text-sm">
                        {formatPrice(order.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                          >
                            <Eye size={14} className="inline mr-1" />
                            Detail
                          </button>
                          <button
                            onClick={() => handleApproveOrder(order.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition hover:shadow-lg"
                            style={{ backgroundColor: "#10b981" }}
                          >
                            <CheckCircle size={14} className="inline mr-1" />
                            Setujui
                          </button>
                          <button
                            onClick={() => handleRejectOrder(order.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg bg-red-600 hover:bg-red-700 transition"
                          >
                            <AlertCircle size={14} className="inline mr-1" />
                            Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Approved Orders Table */}
        {filter === "approved" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="border-b"
                    style={{ backgroundColor: COLORS.primary + "08" }}
                  >
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      No. Pesanan
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Pelanggan
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Status Pengiriman
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {approvedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-sm">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-sm">{order.items} item</td>
                      <td className="px-6 py-4 font-semibold text-sm">
                        {formatPrice(order.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{
                            backgroundColor:
                              order.shippingStatus === "delivered"
                                ? "#10b981"
                                : "#3b82f6",
                          }}
                        >
                          {order.shippingStatus === "delivered"
                            ? "Terkirim"
                            : "Sedang Dikirim"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                          <Download size={14} className="inline mr-1" />
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div
              className="p-6 border-b"
              style={{ borderColor: COLORS.primary + "20" }}
            >
              <h3
                className="text-xl font-bold"
                style={{ color: COLORS.primary }}
              >
                Detail Pesanan {selectedOrder.id}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">
                    Pelanggan
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    {selectedOrder.customer}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">
                    Tanggal
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    {formatDate(selectedOrder.date)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-600 font-semibold uppercase">
                  Detail Pesanan
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {selectedOrder.details}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Jumlah Item: {selectedOrder.items}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Pesanan</p>
                <p
                  className="text-2xl font-bold mt-1"
                  style={{ color: COLORS.accent }}
                >
                  {formatPrice(selectedOrder.amount)}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() =>
                    handleApproveOrder(selectedOrder.id)
                  }
                  className="flex-1 py-2.5 font-semibold rounded-lg text-white transition hover:shadow-lg"
                  style={{ backgroundColor: "#10b981" }}
                >
                  Setujui Pesanan
                </button>
                <button
                  onClick={() =>
                    handleRejectOrder(selectedOrder.id)
                  }
                  className="flex-1 py-2.5 font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 transition"
                >
                  Tolak Pesanan
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2.5 font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StaffDashboardPage() {
  return (
    <RoleLayout
      role="staff"
      title="Staff Dashboard"
      subtitle="Kelola pesanan pelanggan dan approval transaksi"
    >
      <StaffDashboard />
    </RoleLayout>
  );
}
