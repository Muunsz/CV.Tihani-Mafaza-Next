'use client';

import { RoleLayout } from '@/components/admin/RoleLayout';
import { CustomerAnalytics } from '@/components/admin/customer/CustomerAnalytics';
import { CustomerOrdersTable } from '@/components/admin/customer/CustomerOrdersTable';
import { COLORS, CONTACT, MOCK_ORDERS } from '@/lib/constants';
import { MapPin, Phone, Mail, ShoppingCart, FileText } from 'lucide-react';

function CustomerDashboardContent() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div
        className="rounded-lg p-8 text-white"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Selamat Datang, PT Maju Jaya!</h2>
            <p className="opacity-90">Kelola pesanan dan permintaan kutipan Anda dengan mudah</p>
          </div>
          <button
            className="px-6 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg"
            style={{ backgroundColor: COLORS.accent }}
          >
            Pesan Produk
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <CustomerAnalytics />

      {/* Orders Table */}
      <CustomerOrdersTable />

      {/* Contact Info */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.primary }}>
          Hubungi Kami
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <Phone size={20} style={{ color: COLORS.accent }} className="flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-600 text-sm font-medium">Telepon</p>
              <p className="font-semibold text-lg">{CONTACT.phone}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail size={20} style={{ color: COLORS.accent }} className="flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-600 text-sm font-medium">Email</p>
              <p className="font-semibold text-lg">{CONTACT.email}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin size={20} style={{ color: COLORS.accent }} className="flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-600 text-sm font-medium">Alamat</p>
              <p className="font-semibold text-lg">{CONTACT.city}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerDashboard() {
  return (
    <RoleLayout
      role="customer"
      title="Dashboard Pelanggan"
      subtitle="Kelola pesanan dan riwayat pembelian Anda"
    >
      <CustomerDashboardContent />
    </RoleLayout>
  );
}
