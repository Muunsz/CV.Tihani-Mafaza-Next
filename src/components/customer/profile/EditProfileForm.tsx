"use client";

import React from "react";

import { useState } from "react";
import { COLORS } from "@/lib/constants";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Save,
  AlertCircle,
} from "lucide-react";

interface EditProfileFormProps {
  initialData?: {
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  onSubmit?: (data: {
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  }) => void;
}

export function EditProfileForm({
  initialData,
  onSubmit,
}: EditProfileFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+62 812 3456 7890",
      companyName: "PT Contoh Jaya",
      address: "Jl. Merdeka No. 123",
      city: "Bandung",
      province: "Jawa Barat",
      postalCode: "40123",
    },
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.fullName.trim()) {
      setError("Nama lengkap harus diisi");
      return;
    }

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 1000);
    } catch {
      setError("Terjadi kesalahan saat menyimpan profil");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
          <span className="text-xl">✓</span>
          <p className="text-sm text-green-700">Profil berhasil diperbarui</p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Nama Lengkap
        </label>
        <div className="relative">
          <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Email
        </label>
        <div className="relative">
          <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Nomor Telepon
        </label>
        <div className="relative">
          <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Company Name */}
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Nama Perusahaan
        </label>
        <div className="relative">
          <Building2
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Alamat
        </label>
        <div className="relative">
          <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* City */}
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Kota
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
          style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
        />
      </div>

      {/* Province */}
      <div>
        <label
          htmlFor="province"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Provinsi
        </label>
        <input
          id="province"
          name="province"
          type="text"
          value={formData.province}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
          style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
        />
      </div>

      {/* Postal Code */}
      <div>
        <label
          htmlFor="postalCode"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Kode Pos
        </label>
        <input
          id="postalCode"
          name="postalCode"
          type="text"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
          style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        <Save size={18} />
        {isLoading ? "Sedang menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}
