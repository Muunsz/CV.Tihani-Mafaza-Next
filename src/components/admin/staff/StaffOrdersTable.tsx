'use client';

import { COLORS } from '@/lib/constants';
import { Eye, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerCompany: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Ibu Siti, S.Pd',
    customerCompany: 'SDN Merdeka Bandung',
    totalAmount: 5000000,
    status: 'delivered',
    orderDate: '2024-01-15',
    items: 12,
  },
  {
    id: 'ORD-002',
    customerName: 'Bapak Ahmad',
    customerCompany: 'PT Maju Jaya',
    totalAmount: 15750000,
    status: 'shipped',
    orderDate: '2024-01-18',
    items: 25,
  },
  {
    id: 'ORD-003',
    customerName: 'Dr. Suharto',
    customerCompany: 'Klinik Sehat Sejahtera',
    totalAmount: 8500000,
    status: 'confirmed',
    orderDate: '2024-01-20',
    items: 8,
  },
  {
    id: 'ORD-004',
    customerName: 'Kepala Sekolah',
    customerCompany: 'SMPN 1 Bandung',
    totalAmount: 12300000,
    status: 'pending',
    orderDate: '2024-01-22',
    items: 18,
  },
  {
    id: 'ORD-005',
    customerName: 'Manager Keuangan',
    customerCompany: 'RS Citra Medika',
    totalAmount: 6800000,
    status: 'cancelled',
    orderDate: '2024-01-23',
    items: 5,
  },
];

const statusConfig = {
  pending: { color: '#f59e0b', label: 'Menunggu' },
  confirmed: { color: '#3b82f6', label: 'Dikonfirmasi' },
  shipped: { color: '#8b5cf6', label: 'Terkirim' },
  delivered: { color: '#10b981', label: 'Diterima' },
  cancelled: { color: '#ef4444', label: 'Dibatalkan' },
};

export function StaffOrdersTable() {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'shipped':
        return <CheckCircle size={16} />;
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                ID Pesanan
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: COLORS.primary }}>
                Perusahaan
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold" style={{ color: COLORS.primary }}>
                Total
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: COLORS.primary }}>
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold" style={{ color: COLORS.primary }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-sm font-medium" style={{ color: COLORS.primary }}>
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-gray-500 text-xs">{order.items} item</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.customerCompany}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-right">
                  Rp {(order.totalAmount / 1000000).toFixed(1)}M
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="p-1 rounded"
                      style={{
                        backgroundColor: `${statusConfig[order.status].color}20`,
                        color: statusConfig[order.status].color,
                      }}
                    >
                      {getStatusIcon(order.status)}
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: statusConfig[order.status].color }}
                    >
                      {statusConfig[order.status].label}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="p-2 hover:bg-blue-50 rounded transition"
                      title="Lihat Detail"
                    >
                      <Eye size={16} className="text-blue-600" />
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
  );
}
