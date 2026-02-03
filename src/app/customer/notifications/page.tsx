"use client";

import React, { useState } from "react";
import {
  Bell,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
  Truck,
} from "lucide-react";
import { COLORS } from "@/lib/constants";

interface Notification {
  id: string;
  type: "order" | "promo" | "system" | "account";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Pesanan Dikirim",
    message:
      "Pesanan ORD-001 telah dikirim dengan kurir JNE. No. Tracking: JNE-123456789",
    timestamp: "2024-02-03 14:30",
    read: false,
  },
  {
    id: "2",
    type: "promo",
    title: "Penawaran Spesial",
    message:
      "Hemat hingga 50% untuk semua produk elektronik hari ini!",
    timestamp: "2024-02-03 10:15",
    read: false,
  },
  {
    id: "3",
    type: "order",
    title: "Pesanan Dikonfirmasi",
    message:
      "Pesanan ORD-002 telah dikonfirmasi dan sedang diproses.",
    timestamp: "2024-02-02 15:45",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Update Sistem",
    message:
      "Website kami telah diperbarui dengan fitur baru. Terima kasih atas dukungannya.",
    timestamp: "2024-02-01 08:00",
    read: true,
  },
];

function NotificationIcon({ type }: { type: string }) {
  const icons = {
    order: <Truck size={20} className="text-blue-600" />,
    promo: <AlertCircle size={20} className="text-yellow-600" />,
    account: <Info size={20} className="text-blue-600" />,
    system: <Info size={20} className="text-gray-600" />,
  };
  return icons[type as keyof typeof icons] || icons.system;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifikasi Anda</h1>
            <p className="text-gray-600 mt-2">
              {unreadCount} notifikasi belum dibaca dari {notifications.length} total
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition"
            >
              Tandai Semua Dibaca
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-3 font-semibold transition relative`}
            style={{
              color: filter === "all" ? COLORS.accent : "#666",
            }}
          >
            Semua ({notifications.length})
            {filter === "all" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: COLORS.accent }}
              />
            )}
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-3 font-semibold transition relative`}
            style={{
              color: filter === "unread" ? COLORS.accent : "#666",
            }}
          >
            Belum Dibaca ({unreadCount})
            {filter === "unread" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: COLORS.accent }}
              />
            )}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <Bell size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">
                {filter === "unread"
                  ? "Tidak ada notifikasi belum dibaca"
                  : "Tidak ada notifikasi"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-lg border p-5 transition hover:shadow-md ${
                  !notification.read
                    ? "bg-gradient-to-r from-blue-50 to-white border-blue-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 pt-1">
                    <NotificationIcon type={notification.type} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-lg">
                          {notification.title}
                        </p>
                        <p className="text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-3">
                          {notification.timestamp}
                        </p>
                      </div>

                      {!notification.read && (
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0 mt-2"
                          style={{ backgroundColor: COLORS.accent }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition"
                        title="Tandai sebagai dibaca"
                      >
                        <CheckCircle size={18} className="text-green-600" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-1.5 hover:bg-red-100 rounded-lg transition"
                      title="Hapus"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Card */}
        <div
          className="mt-8 p-4 rounded-lg text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          <p className="text-sm">
            Aktifkan notifikasi push untuk mendapatkan update real-time tentang pesanan Anda
          </p>
        </div>
      </div>
    </div>
  );
}
