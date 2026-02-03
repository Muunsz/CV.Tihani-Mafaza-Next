'use client';

import { AdminSidebar } from '@/components/admin/shared/AdminSidebar';
import { AdminHeader } from '@/components/admin/shared/AdminHeader';
import { COLORS } from '@/lib/constants';
import { MOCK_QUOTATIONS } from '@/lib/admin-constants';
import { Mail, FileText, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function StaffQuotationsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredQuotations =
    filterStatus === 'all'
      ? MOCK_QUOTATIONS
      : MOCK_QUOTATIONS.filter((q) => q.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return '#3b82f6';
      case 'reviewed':
        return '#f59e0b';
      case 'quoted':
        return '#8b5cf6';
      case 'converted':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      new: 'Baru',
      reviewed: 'Ditinjau',
      quoted: 'Dikutasi',
      converted: 'Terkoversi',
      rejected: 'Ditolak',
    };
    return labels[status] || status;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar role="staff" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <AdminHeader
          title="Permintaan Kutipan"
          subtitle="Kelola permintaan kutipan harga dari pelanggan"
        />

        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['all', 'new', 'reviewed', 'quoted', 'converted', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                  filterStatus === status
                    ? 'text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: filterStatus === status ? COLORS.primary : undefined,
                }}
              >
                {status === 'all'
                  ? `Semua (${MOCK_QUOTATIONS.length})`
                  : `${getStatusLabel(status)} (${
                      MOCK_QUOTATIONS.filter((q) => q.status === status).length
                    })`}
              </button>
            ))}
          </div>

          {/* Quotations Grid */}
          <div className="space-y-4">
            {filteredQuotations.map((quotation) => (
              <div
                key={quotation.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                        {quotation.requestNumber}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {quotation.customerName}
                        {quotation.institution && ` • ${quotation.institution}`}
                      </p>
                    </div>
                    <span
                      className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: getStatusColor(quotation.status) }}
                    >
                      {getStatusLabel(quotation.status)}
                    </span>
                  </div>

                  {/* Items Preview */}
                  <div className="mb-4 bg-gray-50 rounded p-3">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Barang yang Diminta:</p>
                    <div className="space-y-1">
                      {quotation.items.map((item, idx) => (
                        <p key={idx} className="text-sm">
                          {item.quantity}x {item.productName}
                          {item.specifications && ` (${item.specifications})`}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm font-semibold">{quotation.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Telepon</p>
                      <p className="text-sm font-semibold">{quotation.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Target Harga</p>
                      <p className="text-sm font-semibold">
                        {quotation.priceTarget
                          ? `Rp${quotation.priceTarget.toLocaleString('id-ID')}`
                          : 'Belum ada'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Tanggal Pengajuan</p>
                      <p className="text-sm font-semibold">
                        {new Date(quotation.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {quotation.notes && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Catatan:</p>
                      <p className="text-sm text-gray-700">{quotation.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition">
                      <Mail size={16} />
                      Balas Email
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition">
                      <FileText size={16} />
                      Lihat Detail
                    </button>
                    {quotation.status === 'new' || quotation.status === 'reviewed' ? (
                      <>
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition hover:shadow"
                          style={{ backgroundColor: '#10b981' }}
                        >
                          <Check size={16} />
                          Buat Kutipan
                        </button>
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition hover:shadow"
                          style={{ backgroundColor: '#ef4444' }}
                        >
                          <X size={16} />
                          Tolak
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
