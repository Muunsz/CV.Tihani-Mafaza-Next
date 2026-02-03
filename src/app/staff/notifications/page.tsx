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
} from "lucide-react";

interface Notification {
  id: number;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    type: "info",
    title: "Pesanan Baru Menunggu Approval",
    message: "Pesanan ORD-005 dari Kober Mawar menunggu persetujuan Anda",
    timestamp: "2024-02-03 15:45",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Pesanan Telah Disetujui",
    message: "Pesanan ORD-004 telah disetujui oleh admin. Siapkan barang untuk pengiriman",
    timestamp: "2024-02-03 14:20",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Batas Waktu Approval Dekat",
    message: "Pesanan ORD-003 harus diapprove dalam 2 jam lagi",
    timestamp: "2024-02-03 13:00",
    read: true,
  },
  {
    id: 4,
    type: "info",
    title: "Pengiriman Berhasil",
    message: "Pesanan ORD-002 telah berhasil dikirim kepada customer",
    timestamp: "2024-02-02 16:30",
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

function StaffNotifications() {
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
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 font-semibold transition`}
          style={{
            borderBottom: filter === "all" ? `3px solid ${COLORS.accent}` : "none",
            color: filter === "all" ? COLORS.accent : "#666",
          }}
        >
          Semua ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 font-semibold transition`}
          style={{
            borderBottom: filter === "unread" ? `3px solid ${COLORS.accent}` : "none",
            color: filter === "unread" ? COLORS.accent : "#666",
          }}
        >
          Belum Dibaca ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
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
              className={`flex gap-4 p-4 rounded-lg border transition hover:shadow-md ${
                !notification.read
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex-shrink-0">
                <NotificationIcon type={notification.type} />
              </div>

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
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS.accent }}
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-1 hover:bg-gray-100 rounded transition"
                    title="Tandai sebagai dibaca"
                  >
                    <CheckCircle size={18} className="text-green-600" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="p-1 hover:bg-red-100 rounded transition"
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

export default function StaffNotificationsPage() {
  return (
    <RoleLayout
      role="staff"
      title="Notifikasi"
      subtitle="Kelola notifikasi pesanan dan persetujuan"
    >
      <StaffNotifications />
    </RoleLayout>
  );
}
