"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import {
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  Tabs,
  Tab,
  Avatar,
  Checkbox,
  Pagination,
  Skeleton,
} from "@heroui/react";
import {
  Bell,
  Trash2,
  Check,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import { COLORS } from "@/lib/constants";

interface Notification {
  id: string;
  type: "order" | "promo" | "system" | "account";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: any;
  color: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Pesanan Dikirim",
    message:
      "Pesanan ORD-2024-001 telah dikirim dengan kurir JNE. No. Tracking: JNE-123456789",
    timestamp: "2024-01-20 14:30",
    read: false,
    icon: CheckCircle,
    color: "success",
  },
  {
    id: "2",
    type: "promo",
    title: "Penawaran Spesial",
    message:
      "Hemat hingga 50% untuk semua produk elektronik hari ini! Jangan lewatkan kesempatan emas ini.",
    timestamp: "2024-01-20 10:15",
    read: false,
    icon: AlertCircle,
    color: "warning",
  },
  {
    id: "3",
    type: "account",
    title: "Verifikasi Email",
    message:
      "Silakan verifikasi email Anda untuk mengaktifkan akun. Klik link yang telah kami kirimkan.",
    timestamp: "2024-01-19 09:00",
    read: true,
    icon: Info,
    color: "info",
  },
  {
    id: "4",
    type: "order",
    title: "Pesanan Dikonfirmasi",
    message:
      "Pesanan Anda ORD-2024-002 telah dikonfirmasi dan sedang diproses.",
    timestamp: "2024-01-18 15:45",
    read: true,
    icon: Check,
    color: "primary",
  },
  {
    id: "5",
    type: "system",
    title: "Pemeliharaan Sistem",
    message:
      "Website kami akan melakukan pemeliharaan pada tanggal 25 Januari pukul 23:00 - 02:00.",
    timestamp: "2024-01-17 08:00",
    read: true,
    icon: AlertCircle,
    color: "secondary",
  },
  {
    id: "6",
    type: "promo",
    title: "Flashsale Dimulai",
    message:
      "Flashsale Laptop dimulai sekarang! Stok terbatas, buruan pesan sebelum kehabisan.",
    timestamp: "2024-01-16 12:00",
    read: true,
    icon: AlertCircle,
    color: "warning",
  },
];

const notificationTypes = [
  { key: "all", label: "Semua" },
  { key: "order", label: "Pesanan" },
  { key: "promo", label: "Promosi" },
  { key: "account", label: "Akun" },
  { key: "system", label: "Sistem" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const filteredNotifications =
    selectedType === "all"
      ? notifications
      : notifications.filter((n) => n.type === selectedType);
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleDeleteSelected = () => {
    setNotifications(
      notifications.filter((n) => !selectedNotifications.includes(n.id)),
    );
    setSelectedNotifications([]);
  };

  const handleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(
        selectedNotifications.filter((notifId) => notifId !== id),
      );
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifikasi</h1>
            {unreadCount > 0 && (
              <Badge color="danger" content={unreadCount} className="mt-2">
                <span className="text-sm text-gray-600">
                  {unreadCount} notifikasi belum dibaca
                </span>
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button size="sm" variant="flat" onPress={handleMarkAllAsRead}>
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs
          selectedKey={selectedType}
          onSelectionChange={(key) => {
            setSelectedType(key as string);
            setCurrentPage(1);
          }}
          className="mb-6"
        >
          {notificationTypes.map((type) => (
            <Tab key={type.key} title={type.label} />
          ))}
        </Tabs>

        {/* Bulk Actions */}
        {selectedNotifications.length > 0 && (
          <Card className="mb-6">
            <CardBody className="p-4 flex-row items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedNotifications.length} notifikasi dipilih
              </span>
              <Button
                size="sm"
                color="danger"
                variant="flat"
                startContent={<Trash2 className="w-4 h-4" />}
                onPress={handleDeleteSelected}
              >
                Hapus
              </Button>
            </CardBody>
          </Card>
        )}

        {/* Notifications List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : paginatedNotifications.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tidak ada notifikasi</p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-3 mb-8">
            {paginatedNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`transition ${
                    !notification.read
                      ? "border-l-4"
                      : "border-l-4 border-gray-200"
                  }`}
                  style={{
                    borderLeftColor: !notification.read
                      ? COLORS.accent
                      : "#e5e7eb",
                  }}
                >
                  <CardBody className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <Checkbox
                        isSelected={selectedNotifications.includes(
                          notification.id,
                        )}
                        onChange={() =>
                          handleSelectNotification(notification.id)
                        }
                        className="mt-1"
                      />

                      {/* Icon */}
                      <div
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: `${COLORS.primary}20`,
                        }}
                      >
                        <IconComponent
                          className="w-5 h-5"
                          style={{ color: COLORS.accent }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p
                              className={`font-semibold ${
                                !notification.read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.read && (
                            <Badge
                              isOneChar
                              color="primary"
                              content=" "
                              shape="circle"
                              className="mt-1"
                            />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {notification.timestamp}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 ml-2">
                        {!notification.read && (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => handleDelete(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && filteredNotifications.length > itemsPerPage && (
          <div className="flex justify-center">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
