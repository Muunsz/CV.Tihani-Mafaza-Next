'use client';

import { COLORS } from '@/lib/constants';
import { Mail, Phone, MapPin, Edit, Trash2, Plus } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Ibu Siti, S.Pd',
    company: 'SDN Merdeka Bandung',
    email: 'siti@sdnmerdeka.sch.id',
    phone: '+62 812-3456-7890',
    city: 'Bandung',
    totalOrders: 15,
    totalSpent: 75500000,
    joinDate: '2020-03-15',
  },
  {
    id: 'CUST-002',
    name: 'Bapak Ahmad',
    company: 'PT Maju Jaya',
    email: 'ahmad@majujaya.com',
    phone: '+62 812-1234-5678',
    city: 'Jakarta',
    totalOrders: 28,
    totalSpent: 185300000,
    joinDate: '2019-06-20',
  },
  {
    id: 'CUST-003',
    name: 'Dr. Suharto',
    company: 'Klinik Sehat Sejahtera',
    email: 'suharto@kliniksehat.com',
    phone: '+62 812-9876-5432',
    city: 'Bandung',
    totalOrders: 8,
    totalSpent: 42800000,
    joinDate: '2021-01-10',
  },
  {
    id: 'CUST-004',
    name: 'Kepala Sekolah',
    company: 'SMPN 1 Bandung',
    email: 'kepala@smpn1bandung.sch.id',
    phone: '+62 812-5555-5555',
    city: 'Bandung',
    totalOrders: 12,
    totalSpent: 68900000,
    joinDate: '2020-11-05',
  },
  {
    id: 'CUST-005',
    name: 'Manager Keuangan',
    company: 'RS Citra Medika',
    email: 'keuangan@citra.com',
    phone: '+62 812-6666-6666',
    city: 'Surabaya',
    totalOrders: 20,
    totalSpent: 125600000,
    joinDate: '2019-09-12',
  },
];

export function StaffCustomersTable() {
  return (
    <div className="space-y-4">
      {/* Header dengan tombol tambah */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manajemen Pelanggan
          </h2>
          <p className="text-gray-600 mt-1">Total {mockCustomers.length} pelanggan aktif</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={20} />
          Tambah Pelanggan
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Nama Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Perusahaan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Kontak
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Pesanan
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Total Belanja
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">ID: {customer.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-900">{customer.company}</p>
                        <p className="text-xs text-gray-500">{customer.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={14} />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={14} />
                        <span className="text-xs">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">
                    Rp {(customer.totalSpent / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 hover:bg-blue-50 rounded transition"
                        title="Edit"
                      >
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded transition"
                        title="Hapus"
                      >
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
