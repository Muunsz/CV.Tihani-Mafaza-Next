"use client";

import { StaffDashboardLayout } from "@/components/admin/staff/StaffDashboardLayout";
import { COLORS } from "@/lib/constants";
import { Bell, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function SettingsContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderAlerts: true,
    lowStockAlerts: true,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
          Pengaturan
        </h1>
        <p className="text-gray-600 mt-2">
          Kelola preferensi dan keamanan akun Anda
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: COLORS.accent }}
          >
            AS
          </div>
          <div>
            <h3 className="text-xl font-bold">Ahmad Suryanto</h3>
            <p className="text-gray-600">Staff - CV. Tihani Mafaza</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              defaultValue="Ahmad Suryanto"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.border,
                // @ts-expect-error: allow custom CSS property for Tailwind ring
                "--tw-ring-color": COLORS.accent,
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue="ahmad@tihani.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.border,
                // @ts-expect-error: allow custom CSS property for Tailwind ring
                "--tw-ring-color": COLORS.accent,
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Telepon</label>
            <input
              type="tel"
              defaultValue="+62 812-3456-7890"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.border,
                // @ts-expect-error: allow custom CSS property for Tailwind ring
                "--tw-ring-color": COLORS.accent,
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Departemen</label>
            <input
              type="text"
              defaultValue="Sales & Marketing"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.border,
                // @ts-expect-error: allow custom CSS property for Tailwind ring
                "--tw-ring-color": COLORS.accent,
              }}
            />
          </div>
        </div>

        <button
          className="mt-6 px-6 py-2 text-white rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          Simpan Perubahan
        </button>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lock size={24} style={{ color: COLORS.accent }} />
          <h2 className="text-xl font-bold">Keamanan</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Password Lama
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password lama"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 pr-10"
                style={{
                  borderColor: COLORS.border,
                  // @ts-expect-error: allow custom CSS property for Tailwind ring
                  "--tw-ring-color": COLORS.accent,
                }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Password Baru
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password baru"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.border,
                // @ts-expect-error: allow custom CSS property for Tailwind ring
                "--tw-ring-color": COLORS.accent,
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Konfirmasi Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Konfirmasi password baru"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.border,
                // @ts-expect-error: allow custom CSS property for Tailwind ring
                "--tw-ring-color": COLORS.accent,
              }}
            />
          </div>
        </div>

        <button
          className="mt-6 px-6 py-2 text-white rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          Ubah Password
        </button>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell size={24} style={{ color: COLORS.accent }} />
          <h2 className="text-xl font-bold">Notifikasi</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              key: "emailNotifications",
              label: "Notifikasi Email",
              desc: "Terima update via email",
            },
            {
              key: "smsNotifications",
              label: "Notifikasi SMS",
              desc: "Terima update via SMS",
            },
            {
              key: "pushNotifications",
              label: "Notifikasi Push",
              desc: "Terima notifikasi push di browser",
            },
            {
              key: "orderAlerts",
              label: "Alert Pesanan Baru",
              desc: "Dapatkan alert untuk pesanan baru",
            },
            {
              key: "lowStockAlerts",
              label: "Alert Stok Rendah",
              desc: "Dapatkan alert saat stok rendah",
            },
          ].map((notification) => (
            <div
              key={notification.key}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">{notification.label}</p>
                <p className="text-sm text-gray-600">{notification.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={settings[notification.key as keyof typeof settings]}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    [notification.key]: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded"
              />
            </div>
          ))}
        </div>

        <button
          className="mt-6 px-6 py-2 text-white rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          Simpan Pengaturan Notifikasi
        </button>
      </div>

      {/* Account Status */}
      <div
        className="bg-white rounded-lg shadow p-6 border-l-4"
        style={{ borderColor: COLORS.accent }}
      >
        <h3 className="text-lg font-bold mb-4">Status Akun</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Status Verifikasi</span>
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
              Terverifikasi
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Terakhir Login</span>
            <span className="text-gray-600">2024-01-25 14:30</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Bergabung Sejak</span>
            <span className="text-gray-600">12 Agustus 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StaffSettingsPage() {
  return (
    <StaffDashboardLayout activeTab="settings">
      <SettingsContent />
    </StaffDashboardLayout>
  );
}
