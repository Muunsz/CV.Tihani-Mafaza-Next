"use client";

import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: "admin" | "staff" | "customer";
  status: "active" | "inactive";
  joinDate: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    fullName: "Admin Utama",
    email: "admin@tihani.com",
    phone: "+62-812-345-6789",
    company: "CV. Tihani Mafaza",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    fullName: "Staff Penjualan",
    email: "staff@tihani.com",
    phone: "+62-812-345-6790",
    company: "CV. Tihani Mafaza",
    role: "staff",
    status: "active",
    joinDate: "2024-02-01",
  },
  {
    id: "3",
    fullName: "PT Maju Jaya",
    email: "contact@majujaya.com",
    phone: "+62-274-999-8888",
    company: "PT Maju Jaya Investama",
    role: "customer",
    status: "active",
    joinDate: "2024-01-20",
  },
  {
    id: "4",
    fullName: "SMK Bina Insani",
    email: "info@smkbinainsani.com",
    phone: "+62-274-111-2222",
    company: "SMK Bina Insani Ibun",
    role: "customer",
    status: "active",
    joinDate: "2024-01-25",
  },
];

function UsersContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return COLORS.primary;
      case "staff":
        return COLORS.accent;
      case "customer":
        return "#10b981";
      default:
        return COLORS.gray;
    }
  };

  const getRoleBadgeText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "staff":
        return "Staff";
      case "customer":
        return "Customer";
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manajemen Pengguna
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Total {filteredUsers.length} pengguna
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg hover:shadow-lg transition"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={18} />
          Tambah Pengguna
        </button>
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
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
          style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
        >
          <option value="all">Semua Role</option>
          <option value="admin">Administrator</option>
          <option value="staff">Staff</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="border-b"
                style={{ backgroundColor: COLORS.primary + "08" }}
              >
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Nama & Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Perusahaan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.fullName}
                      </p>
                      <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                        <Mail size={14} />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <Phone size={14} />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{user.company}</td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1.5 rounded-full text-white text-xs font-semibold"
                      style={{
                        backgroundColor: getRoleBadgeColor(user.role),
                      }}
                    >
                      {getRoleBadgeText(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 size={18} style={{ color: COLORS.primary }} />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                        title="Hapus"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Menu"
                      >
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                    </div>
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

export default function UsersPage() {
  return (
    <RoleLayout
      role="admin"
      title="Manajemen Pengguna"
      subtitle="Kelola semua pengguna dalam sistem"
    >
      <UsersContent />
    </RoleLayout>
  );
}
