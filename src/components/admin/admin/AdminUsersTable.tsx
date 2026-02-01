'use client';

import { COLORS } from '@/lib/constants';
import { Eye, Edit2, Trash2 } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Ahmad Wijaya',
    email: 'ahmad@tihani.com',
    role: 'Staff Sales',
    status: 'Active',
    joinDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    email: 'siti@tihani.com',
    role: 'Staff Operasional',
    status: 'Active',
    joinDate: '2024-01-20',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    email: 'budi@tihani.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-12-01',
  },
  {
    id: 4,
    name: 'Rina Kusuma',
    email: 'rina@tihani.com',
    role: 'Staff Customer Service',
    status: 'Inactive',
    joinDate: '2024-02-10',
  },
];

export function AdminUsersTable() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
          Daftar Pengguna Sistem
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Bergabung</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
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
  );
}
