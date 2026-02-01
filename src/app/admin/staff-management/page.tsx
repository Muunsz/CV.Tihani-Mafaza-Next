'use client';

import { AdminDashboardLayout } from '@/components/admin/admin/AdminDashboardLayout';
import { COLORS } from '@/lib/constants';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

const staffList = [
  {
    id: 1,
    name: 'Ahmad Wijaya',
    position: 'Staff Sales',
    email: 'ahmad@tihani.com',
    phone: '0812-3456-7890',
    joinDate: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    position: 'Staff Operasional',
    email: 'siti@tihani.com',
    phone: '0812-9876-5432',
    joinDate: '2024-01-20',
    status: 'Active',
  },
];

function StaffManagementContent() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            Kelola Staff
          </h1>
          <p className="text-gray-600">Kelola data karyawan dan staff CV. Tihani Mafaza</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={20} />
          Tambah Staff
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: COLORS.accent }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>
            Form Tambah Staff Baru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Posisi"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="tel"
              placeholder="Telepon"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 px-4 py-2 text-white font-semibold rounded-lg transition hover:shadow-lg"
              style={{ backgroundColor: COLORS.primary }}
            >
              Simpan
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
            Daftar Staff ({staffList.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Nama</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Posisi</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Telepon</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{staff.name}</td>
                  <td className="px-6 py-4 text-gray-600">{staff.position}</td>
                  <td className="px-6 py-4 text-gray-600">{staff.email}</td>
                  <td className="px-6 py-4 text-gray-600">{staff.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded transition" title="View">
                        <Eye size={16} style={{ color: COLORS.primary }} />
                      </button>
                      <button className="p-2 hover:bg-yellow-100 rounded transition" title="Edit">
                        <Edit2 size={16} style={{ color: COLORS.accent }} />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded transition" title="Delete">
                        <Trash2 size={16} className="text-red-600" />
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
    <AdminDashboardLayout activeTab="staff-management">
      <StaffManagementContent />
    </AdminDashboardLayout>
  );
}
