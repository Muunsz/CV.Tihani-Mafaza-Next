"use client";

import React from "react";
import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import {
  Bell,
  Lock,
  Mail,
  Globe,
  Database,
  Shield,
  Save,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface SettingsSection {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: "general",
    label: "Pengaturan Umum",
    icon: Globe,
    color: COLORS.primary,
  },
  {
    id: "email",
    label: "Email & Notifikasi",
    icon: Mail,
    color: "#3b82f6",
  },
  {
    id: "security",
    label: "Keamanan",
    icon: Lock,
    color: "#ef4444",
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    color: "#8b5cf6",
  },
];

function SettingsContent() {
  const [activeSection, setActiveSection] = useState("general");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "CV. Tihani Mafaza",
    siteUrl: "https://tihanimafaza.com",
    description: "Penyedia Barang & Jasa Profesional",
    emailNotifications: true,
    twoFactorAuth: false,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    backupFrequency: "daily",
  });

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {saveSuccess && (
        <div className="flex gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-700">
              Pengaturan Berhasil Disimpan
            </p>
            <p className="text-xs text-green-600 mt-1">
              Perubahan Anda telah disimpan dan akan diterapkan segera
            </p>
          </div>
        </div>
      )}

      {/* Settings Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-4 rounded-lg border-2 text-left transition ${
                isActive
                  ? "border-current bg-opacity-5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{
                borderColor: isActive ? section.color : undefined,
                backgroundColor: isActive
                  ? `${section.color}08`
                  : undefined,
              }}
            >
              <Icon
                size={24}
                style={{ color: section.color }}
                className="mb-2"
              />
              <p
                className="font-semibold text-sm"
                style={{
                  color: isActive ? section.color : COLORS.primary,
                }}
              >
                {section.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* General Settings */}
        {activeSection === "general" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>
                Pengaturan Umum Website
              </h3>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Nama Website
              </label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                URL Website
              </label>
              <input
                type="url"
                name="siteUrl"
                value={formData.siteUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Deskripsi Website
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* Email & Notifications */}
        {activeSection === "email" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>
                Email & Notifikasi
              </h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  style={{ accentColor: COLORS.accent }}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">
                  Aktifkan Notifikasi Email
                </span>
              </label>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 flex gap-3">
                <Bell size={20} className="text-blue-600 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-700">
                    Notifikasi Email Aktif
                  </p>
                  <p className="text-blue-600 mt-1">
                    Anda akan menerima notifikasi tentang pesanan baru, status
                    pembayaran, dan update penting lainnya
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeSection === "security" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>
                Keamanan
              </h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={formData.twoFactorAuth}
                  onChange={handleChange}
                  style={{ accentColor: COLORS.accent }}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">
                  Aktifkan Two-Factor Authentication
                </span>
              </label>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Maksimal Percobaan Login
                </label>
                <select
                  name="maxLoginAttempts"
                  value={formData.maxLoginAttempts}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
                  style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
                >
                  <option value="3">3 kali</option>
                  <option value="5">5 kali</option>
                  <option value="10">10 kali</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Session Timeout (menit)
                </label>
                <input
                  type="number"
                  name="sessionTimeout"
                  value={formData.sessionTimeout}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
                  style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
                />
              </div>

              <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3">
                <Shield size={20} className="text-red-600 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-red-700">
                    Keamanan Tingkat Tinggi
                  </p>
                  <p className="text-red-600 mt-1">
                    Sistem keamanan berlapis aktif untuk melindungi data Anda
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database Settings */}
        {activeSection === "database" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>
                Database & Backup
              </h3>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Frekuensi Backup Otomatis
              </label>
              <select
                name="backupFrequency"
                value={formData.backupFrequency}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                className="py-3 px-4 rounded-lg font-semibold transition border border-gray-300 hover:bg-gray-50"
              >
                Backup Sekarang
              </button>
              <button className="py-3 px-4 rounded-lg font-semibold transition border border-gray-300 hover:bg-gray-50">
                Restore Backup
              </button>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm text-purple-700">
                <strong>Status:</strong> Backup terakhir pada 2024-02-03 14:30
                UTC
              </p>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t flex justify-end gap-3">
          <button className="px-6 py-2.5 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition">
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-white font-semibold transition hover:shadow-lg flex items-center gap-2"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <RoleLayout
      role="admin"
      title="Pengaturan Admin"
      subtitle="Kelola konfigurasi website dan keamanan sistem"
    >
      <SettingsContent />
    </RoleLayout>
  );
}
