'use client';

import { AdminSidebar } from '@/components/admin/shared/AdminSidebar';
import { AdminHeader } from '@/components/admin/shared/AdminHeader';
import { COLORS } from '@/lib/constants';
import { MOCK_ORDERS } from '@/lib/admin-constants';
import { FileText, Download, Filter, Plus } from 'lucide-react';
import { useState } from 'react';

export default function StaffOrdersPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders =
    filterStatus === 'all'
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((order) => order.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'processing':
        return '#3b82f6';
      case 'shipped':
        return '#8b5cf6';
      case 'delivered':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: 'Menunggu',
      processing: 'Diproses',
      shipped: 'Dikirim',
      delivered: 'Diterima',
      cancelled: 'Dibatalkan',
    };
    return labels[status] || status;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar role="staff" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <AdminHeader
          title="Manajemen Pesanan"
          subtitle="Kelola semua pesanan pelanggan Anda"
        />

        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {/* Toolbar */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                onClick={() => setFilterStatus('all')}
                style={{
                  backgroundColor: filterStatus === 'all' ? `${COLORS.primary}10` : 'transparent',
                  borderColor: filterStatus === 'all' ? COLORS.primary : '#e5e7eb',
                }}
              >
                <Filter size={18} />
                Semua ({MOCK_ORDERS.length})
              </button>
              {['pending', 'processing', 'shipped', 'delivered'].map((status) => (
                <button
                  key={status}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                  onClick={() => setFilterStatus(status)}
                  style={{
                    backgroundColor: filterStatus === status ? `${COLORS.primary}10` : 'transparent',
                    borderColor: filterStatus === status ? COLORS.primary : '#e5e7eb',
                  }}
                >
                  {getStatusLabel(status)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
                <Download size={18} />
                Export
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition hover:shadow"
                style={{ backgroundColor: COLORS.accent }}
              >
                <Plus size={18} />
                Pesanan Baru
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">No. Pesanan</th>
                    <th className="px-6 py-3 text-left font-semibold">Pelanggan</th>
                    <th className="px-6 py-3 text-left font-semibold">Tanggal</th>
                    <th className="px-6 py-3 text-left font-semibold">Total</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Pembayaran</th>
                    <th className="px-6 py-3 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{order.orderNumber}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-xs text-gray-600">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        Rp{order.totalAmount.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : order.paymentStatus === 'partial'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.paymentStatus === 'paid' && 'Lunas'}
                          {order.paymentStatus === 'partial' && 'Sebagian'}
                          {order.paymentStatus === 'unpaid' && 'Belum'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded hover:bg-gray-200 transition"
                          style={{ color: COLORS.primary }}
                        >
                          <FileText size={16} />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Menampilkan {filteredOrders.length} dari {MOCK_ORDERS.length} pesanan
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-2 border rounded hover:bg-gray-50">Sebelumnya</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-50">1</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-50">Selanjutnya</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
