'use client';

import { AdminDashboardLayout } from '@/components/admin/admin/AdminDashboardLayout';
import { COLORS } from '@/lib/constants';
import { Plus, Edit2, Eye, Mail } from 'lucide-react';
import { useState } from 'react';

const customersList = [
  {
    id: 1,
    name: 'PT. Maju Jaya Nusantara',
    email: 'contact@majujaya.com',
    phone: '(274) 555-0100',
    address: 'Jl. Gatot Subroto No. 100, Bandung',
    joinDate: '2023-06-15',
    totalOrders: 45,
    totalSpent: 'Rp 250.5M',
  },
  {
    id: 2,
    name: 'SMK Negeri 1 Bandung',
    email: 'admin@smkn1bdg.sch.id',
    phone: '(274) 555-0101',
    address: 'Jl. Cililin No. 25, Bandung',
    joinDate: '2023-08-20',
    totalOrders: 28,
    totalSpent: 'Rp 125.3M',
  },
];

function CustomersManagementContent() {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            Kelola Pelanggan
          </h1>
          <p className="text-gray-600">Kelola data pelanggan dan pesanan mereka</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={20} />
          Tambah Pelanggan
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
            Daftar Pelanggan ({customersList.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Nama Perusahaan</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Telepon</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Total Pesanan</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Total Belanja</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {customersList.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{customer.name}</td>
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                    <Mail size={16} style={{ color: COLORS.accent }} />
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {customer.totalOrders} order
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold" style={{ color: COLORS.primary }}>
                    {customer.totalSpent}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 hover:bg-blue-100 rounded transition"
                        title="View"
                        onClick={() => setSelectedCustomer(customer.id)}
                      >
                        <Eye size={16} style={{ color: COLORS.primary }} />
                      </button>
                      <button className="p-2 hover:bg-yellow-100 rounded transition" title="Edit">
                        <Edit2 size={16} style={{ color: COLORS.accent }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: COLORS.primary }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
              Detail Pelanggan
            </h2>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {customersList
            .filter((c) => c.id === selectedCustomer)
            .map((customer) => (
              <div key={customer.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600">Nama Perusahaan</label>
                  <p className="text-lg font-semibold mt-1">{customer.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-lg font-semibold mt-1">{customer.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Telepon</label>
                  <p className="text-lg font-semibold mt-1">{customer.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Alamat</label>
                  <p className="text-lg font-semibold mt-1">{customer.address}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Total Pesanan</label>
                  <p className="text-lg font-semibold mt-1">{customer.totalOrders}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Total Belanja</label>
                  <p className="text-lg font-semibold mt-1" style={{ color: COLORS.accent }}>
                    {customer.totalSpent}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default function CustomersManagement() {
  return (
    <AdminDashboardLayout activeTab="customers-management">
      <CustomersManagementContent />
    </AdminDashboardLayout>
  );
}
