'use client';

import { StaffDashboardLayout } from '@/components/admin/staff/StaffDashboardLayout';
import { COLORS } from '@/lib/constants';
import { Plus, Edit, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minStock: number;
  lastRestocked: string;
  status: 'available' | 'low' | 'out';
}

const mockInventory: InventoryItem[] = [
  {
    id: 'INV-001',
    name: 'Kursi Kerja - Kursi Kantor High Quality',
    sku: 'KURSI-001',
    category: 'Furniture',
    quantity: 45,
    minStock: 10,
    lastRestocked: '2024-01-20',
    status: 'available',
  },
  {
    id: 'INV-002',
    name: 'Kertas HVS F4 80 GSM',
    sku: 'KERTAS-001',
    category: 'ATK',
    quantity: 8,
    minStock: 20,
    lastRestocked: '2024-01-18',
    status: 'low',
  },
  {
    id: 'INV-003',
    name: 'EPSON L3110 Printer Multifungsi',
    sku: 'PRINTER-001',
    category: 'Elektronik',
    quantity: 0,
    minStock: 5,
    lastRestocked: '2024-01-10',
    status: 'out',
  },
  {
    id: 'INV-004',
    name: 'Buku Administrasi Sekolah',
    sku: 'BUKU-001',
    category: 'Buku & Referensi',
    quantity: 65,
    minStock: 15,
    lastRestocked: '2024-01-22',
    status: 'available',
  },
  {
    id: 'INV-005',
    name: 'Onemed Spuit 5cc Disposable',
    sku: 'MEDIS-001',
    category: 'Medis',
    quantity: 5,
    minStock: 50,
    lastRestocked: '2024-01-15',
    status: 'low',
  },
];

function InventoryContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            Manajemen Inventori
          </h1>
          <p className="text-gray-600 mt-2">Kelola stok barang dan monitoring ketersediaan</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={20} />
          Tambah Barang
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Barang</p>
          <p className="text-3xl font-bold mt-2" style={{ color: COLORS.primary }}>
            {mockInventory.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Stok Rendah</p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#f59e0b' }}>
                {mockInventory.filter((item) => item.status === 'low').length}
              </p>
            </div>
            <AlertCircle size={32} style={{ color: '#f59e0b' }} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Stok Habis</p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#ef4444' }}>
                {mockInventory.filter((item) => item.status === 'out').length}
              </p>
            </div>
            <AlertCircle size={32} style={{ color: '#ef4444' }} />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Nama Barang
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Kategori
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Stok
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Min. Stok
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Terakhir Restock
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: COLORS.primary }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {mockInventory.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.sku}</td>
                  <td className="px-6 py-4 text-sm">{item.category}</td>
                  <td className="px-6 py-4 text-center font-semibold">{item.quantity}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{item.minStock}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {item.status === 'available' && (
                        <>
                          <CheckCircle size={16} className="text-green-600" />
                          <span className="text-xs font-semibold text-green-600">Tersedia</span>
                        </>
                      )}
                      {item.status === 'low' && (
                        <>
                          <AlertCircle size={16} className="text-yellow-600" />
                          <span className="text-xs font-semibold text-yellow-600">Rendah</span>
                        </>
                      )}
                      {item.status === 'out' && (
                        <>
                          <AlertCircle size={16} className="text-red-600" />
                          <span className="text-xs font-semibold text-red-600">Habis</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.lastRestocked}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded transition">
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded transition">
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

export default function StaffInventoryPage() {
  return (
    <StaffDashboardLayout activeTab="inventory">
      <InventoryContent />
    </StaffDashboardLayout>
  );
}
