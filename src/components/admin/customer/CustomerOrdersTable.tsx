'use client';

import { COLORS } from '@/lib/constants';
import { ChevronRight, Download, FileText } from 'lucide-react';
import { useState } from 'react';

const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    items: 5,
    total: 15000000,
    status: 'delivered',
    invoice: true,
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    date: '2024-01-10',
    items: 3,
    total: 8500000,
    status: 'processing',
    invoice: false,
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    date: '2024-01-05',
    items: 8,
    total: 22000000,
    status: 'delivered',
    invoice: true,
  },
];

export function CustomerOrdersTable() {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'processing':
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
          Riwayat Pesanan
        </h3>
        <p className="text-sm text-gray-600 mt-1">Semua pesanan Anda dapat dilihat di sini</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">No. Pesanan</th>
              <th className="px-6 py-3 text-left font-semibold">Tanggal</th>
              <th className="px-6 py-3 text-left font-semibold">Item</th>
              <th className="px-6 py-3 text-left font-semibold">Total</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => {
              const statusColor = getStatusColor(order.status);
              return (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                >
                  <td className="px-6 py-4 font-semibold">{order.orderNumber}</td>
                  <td className="px-6 py-4">{new Date(order.date).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4">{order.items} item</td>
                  <td className="px-6 py-4 font-semibold">
                    Rp{(order.total / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
                      {order.status === 'delivered' ? 'Terkirim' : order.status === 'processing' ? 'Diproses' : 'Tertunda'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="hover:text-orange-500 transition" style={{ color: COLORS.primary }}>
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Expanded Order Details */}
      {selectedOrder && (
        <div className="border-t bg-gray-50 p-6">
          <div className="max-w-3xl">
            <h4 className="font-bold mb-4" style={{ color: COLORS.primary }}>
              Detail Pesanan {mockOrders.find((o) => o.id === selectedOrder)?.orderNumber}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Alamat Pengiriman</p>
                <p className="font-semibold">Jl. Merdeka No. 123, Bandung 40123</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Metode Pengiriman</p>
                <p className="font-semibold">JNE Express (3-5 hari kerja)</p>
              </div>
            </div>

            {mockOrders.find((o) => o.id === selectedOrder)?.invoice && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ color: COLORS.primary, borderColor: COLORS.accent }}>
                <Download size={18} />
                Download Invoice
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
