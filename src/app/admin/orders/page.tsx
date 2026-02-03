"use client";

import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Printer,
  MoreVertical,
  Calendar,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  amount: number;
  items: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  paymentStatus: "paid" | "pending" | "failed";
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: "PT Maju Jaya",
    amount: 15000000,
    items: 5,
    status: "delivered",
    date: "2024-02-01",
    paymentStatus: "paid",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customer: "SMK Bina Insani",
    amount: 8500000,
    items: 3,
    status: "shipped",
    date: "2024-02-02",
    paymentStatus: "paid",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customer: "CV Semangat Kerja",
    amount: 22000000,
    items: 8,
    status: "processing",
    date: "2024-02-03",
    paymentStatus: "paid",
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customer: "Kober Mawar",
    amount: 5500000,
    items: 2,
    status: "pending",
    date: "2024-02-03",
    paymentStatus: "pending",
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    customer: "PT Sukses Bersama",
    amount: 12000000,
    items: 4,
    status: "cancelled",
    date: "2024-02-02",
    paymentStatus: "failed",
  },
];

function OrdersContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "#10b981";
      case "shipped":
        return "#3b82f6";
      case "processing":
        return COLORS.accent;
      case "pending":
        return "#f59e0b";
      case "cancelled":
        return "#ef4444";
      default:
        return COLORS.gray;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Terkirim";
      case "shipped":
        return "Sedang Dikirim";
      case "processing":
        return "Diproses";
      case "pending":
        return "Menunggu";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "failed":
        return "#ef4444";
      default:
        return COLORS.gray;
    }
  };

  const getPaymentText = (status: string) => {
    switch (status) {
      case "paid":
        return "Dibayar";
      case "pending":
        return "Menunggu";
      case "failed":
        return "Gagal";
      default:
        return status;
    }
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
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manajemen Pesanan
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Total {filteredOrders.length} pesanan
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-sm"
          >
            <Printer size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Cari nomor pesanan atau nama pelanggan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
          style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
        >
          <option value="all">Semua Status</option>
          <option value="pending">Menunggu</option>
          <option value="processing">Diproses</option>
          <option value="shipped">Sedang Dikirim</option>
          <option value="delivered">Terkirim</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="border-b"
                style={{ backgroundColor: COLORS.primary + "08" }}
              >
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Nomor Pesanan
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Pembayaran
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
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-semibold text-sm">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-sm">{order.customer}</td>
                  <td className="px-6 py-4 text-sm">{order.items} item</td>
                  <td className="px-6 py-4 font-semibold text-sm">
                    {formatPrice(order.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1.5 rounded-full text-white text-xs font-semibold"
                      style={{
                        backgroundColor: getStatusColor(order.status),
                      }}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1.5 rounded-full text-white text-xs font-semibold"
                      style={{
                        backgroundColor: getPaymentColor(order.paymentStatus),
                      }}
                    >
                      {getPaymentText(order.paymentStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="Lihat Detail"
                    >
                      <Eye size={18} style={{ color: COLORS.primary }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <RoleLayout
      role="admin"
      title="Manajemen Pesanan"
      subtitle="Kelola semua pesanan pelanggan"
    >
      <OrdersContent />
    </RoleLayout>
  );
}
