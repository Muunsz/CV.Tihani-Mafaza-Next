"use client";

import React, { useState } from "react";
import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  Archive,
  Filter,
} from "lucide-react";

interface Notification {
  id: number;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    type: "success",
    title: "Pesanan Disetujui",
    message: "Pesanan ORD-001 dari PT Maju Jaya telah disetujui dan siap diproses",
    timestamp: "2024-02-03 14:30",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Stok Menipis",
    message: "Stok Laptop Acer E5-474 tinggal 3 unit tersisa",
    timestamp: "2024-02-03 12:15",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Report Harian Tersedia",
    message: "Laporan penjualan harian untuk tanggal 2024-02-02 siap untuk diunduh",
    timestamp: "2024-02-03 10:00",
    read: true,
  },
  {
    id: 4,
    type: "error",
    title: "Pembayaran Gagal",
    message: "Pesanan ORD-003 pembayaran gagal. Silakan hubungi customer",
    timestamp: "2024-02-02 18:45",
    read: true,
  },
  {
    id: 5,
    type: "success",
    title: "Pesanan Terkirim",
    message: "Pesanan ORD-002 telah terkirim ke alamat tujuan",
    timestamp: "2024-02-02 16:20",
    read: true,
  },
];

function NotificationIcon({ type }: { type: string }) {
  const icons = {
    success: <CheckCircle size={20} className="text-green-600" />,
    warning: <AlertCircle size={20} className="text-yellow-600" />,
    error: <AlertCircle size={20} className="text-red-600" />,
    info: <Info size={20} className="text-blue-600" />,
  };
  return icons[type as keyof typeof icons] || icons.info;
}

function NotificationBadge({ type }: { type: string }) {
  const styles = {
    success: { bg: "#10b98115", text: "#10b981" },
    warning: { bg: "#f5951515", text: "#f59e0b" },
    error: { bg: "#ef444415", text: "#ef4444" },
    info: { bg: "#3b82f515", text: "#3b82f5" },
  };
  const style = styles[type as keyof typeof styles] || styles.info;
  return (
    <div
      style={{ backgroundColor: style.bg, color: style.text }}
      className="w-1 h-full"
    />
  );
}

function AdminNotifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleDeleteAll = () => {
    if (confirm("Hapus semua notifikasi?")) {
      setNotifications([]);
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Notifikasi
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {unreadCount} notifikasi belum dibaca
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition"
          >
            Tandai Semua Terbaca
          </button>
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-50 transition"
          >
            Hapus Semua
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            filter === "all"
              ? "border-b-2 text-gray-900"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
          style={{
            borderColor: filter === "all" ? COLORS.accent : "transparent",
            color: filter === "all" ? COLORS.accent : undefined,
          }}
        >
          Semua ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            filter === "unread"
              ? "border-b-2 text-gray-900"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
          style={{
            borderColor: filter === "unread" ? COLORS.accent : "transparent",
            color: filter === "unread" ? COLORS.accent : undefined,
          }}
        >
          Belum Dibaca ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">
              {filter === "unread"
                ? "Tidak ada notifikasi belum dibaca"
                : "Tidak ada notifikasi"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-4 p-4 rounded-lg border border-gray-200 transition hover:shadow-md ${
                !notification.read ? "bg-blue-50" : "bg-white"
              }`}
            >
              <NotificationBadge type={notification.type} />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.timestamp}
                    </p>
                  </div>

                  {!notification.read && (
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                      style={{ backgroundColor: COLORS.accent }}
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="Tandai sebagai dibaca"
                  >
                    <CheckCircle size={18} className="text-green-600" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition"
                  title="Hapus"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function AdminNotificationsPage() {
  return (
    <RoleLayout
      role="admin"
      title="Notifikasi"
      subtitle="Kelola semua notifikasi sistem"
    >
      <AdminNotifications />
    </RoleLayout>
  );
}
