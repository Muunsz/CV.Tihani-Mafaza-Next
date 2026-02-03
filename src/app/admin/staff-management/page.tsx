"use client";

import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

interface StaffMember {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "Active" | "Inactive";
  department: string;
}

const staffList: StaffMember[] = [
  {
    id: 1,
    name: "Ahmad Wijaya",
    position: "Staff Sales",
    email: "ahmad@tihani.com",
    phone: "0812-3456-7890",
    joinDate: "2024-01-15",
    status: "Active",
    department: "Sales",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    position: "Staff Operasional",
    email: "siti@tihani.com",
    phone: "0812-9876-5432",
    joinDate: "2024-01-20",
    status: "Active",
    department: "Operations",
  },
  {
    id: 3,
    name: "Budi Santoso",
    position: "Manager Logistik",
    email: "budi@tihani.com",
    phone: "0812-5555-6666",
    joinDate: "2023-11-10",
    status: "Active",
    department: "Logistics",
  },
];

function StaffManagementContent() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manajemen Staff
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Total {filteredStaff.length} staff terdaftar
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={18} />
          Tambah Staff
        </button>
      </div>

      {/* Search */}
      <div className="relative">
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

      {/* Add Staff Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.primary }}>
            Tambah Staff Baru
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
              style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
            />
            <input
              type="text"
              placeholder="Posisi"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
              style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
              style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
            />
            <input
              type="tel"
              placeholder="Telepon"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
              style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
            />
            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
              style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
            >
              <option value="">Pilih Department</option>
              <option value="sales">Sales</option>
              <option value="operations">Operations</option>
              <option value="logistics">Logistics</option>
              <option value="finance">Finance</option>
            </select>
            <input
              type="password"
              placeholder="Password Awal"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
              style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              className="px-6 py-2.5 rounded-lg text-white font-semibold transition hover:shadow-lg"
              style={{ backgroundColor: COLORS.accent }}
            >
              Simpan Staff
            </button>
          </div>
        </div>
      )}

      {/* Staff Table */}
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
                  Posisi
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Bergabung
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{staff.name}</p>
                      <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                        <Mail size={14} />
                        {staff.email}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <Phone size={14} />
                        {staff.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{staff.position}</td>
                  <td className="px-6 py-4 text-sm">{staff.department}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1.5 rounded-full text-white text-xs font-semibold bg-green-600">
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(staff.joinDate)}
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

export default function StaffManagement() {
  return (
    <RoleLayout
      role="admin"
      title="Manajemen Staff"
      subtitle="Kelola staff dan akses pengguna"
    >
      <StaffManagementContent />
    </RoleLayout>
  );
}
