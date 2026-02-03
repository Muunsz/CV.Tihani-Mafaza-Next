'use client';

import { StaffDashboardLayout } from '@/components/admin/staff/StaffDashboardLayout';
import { COLORS } from '@/lib/constants';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 4000, target: 4500 },
  { month: 'Feb', sales: 3000, target: 4500 },
  { month: 'Mar', sales: 2000, target: 4500 },
  { month: 'Apr', sales: 2780, target: 4500 },
  { month: 'May', sales: 1890, target: 4500 },
  { month: 'Jun', sales: 2390, target: 4500 },
];

const categoryData = [
  { name: 'Elektronik', value: 35, color: COLORS.accent },
  { name: 'Furniture', value: 25, color: COLORS.primary },
  { name: 'Buku', value: 20, color: '#10b981' },
  { name: 'Medis', value: 15, color: '#f59e0b' },
  { name: 'Lainnya', value: 5, color: '#8b5cf6' },
];

function ReportsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            Laporan & Analytics
          </h1>
          <p className="text-gray-600 mt-2">Pantau performa bisnis secara mendetail</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar size={20} />
            Pilih Periode
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white rounded-lg" style={{ backgroundColor: COLORS.accent }}>
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
        <Filter size={20} style={{ color: COLORS.accent }} />
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: COLORS.accent }}>
            Semua Bulan
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium border hover:bg-gray-50">
            Kategori
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium border hover:bg-gray-50">
            Pelanggan
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold mt-2">Rp 247.4M</p>
          <p className="text-green-600 text-sm mt-2">+12% vs bulan lalu</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-2xl font-bold mt-2">1,245</p>
          <p className="text-green-600 text-sm mt-2">+8% vs bulan lalu</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Avg Order Value</p>
          <p className="text-2xl font-bold mt-2">Rp 2.1M</p>
          <p className="text-green-600 text-sm mt-2">+3% vs bulan lalu</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-2xl font-bold mt-2">328</p>
          <p className="text-green-600 text-sm mt-2">+5% vs bulan lalu</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales vs Target */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.primary }}>
            Penjualan vs Target
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill={COLORS.accent} name="Penjualan Aktual" />
              <Bar dataKey="target" fill={COLORS.primary} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.primary }}>
            Penjualan per Kategori
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
            Top 10 Produk Paling Laris
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Ranking</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Nama Produk</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Terjual</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Revenue</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">% Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, name: 'Cetak Foto', sold: 460, revenue: 11500000, percent: 4.6 },
                { rank: 2, name: 'Kursi Kerja High Quality', sold: 138, revenue: 89700000, percent: 36.2 },
                { rank: 3, name: 'Kertas HVS F4 80 GSM', sold: 175, revenue: 12600000, percent: 5.1 },
                { rank: 4, name: 'Hannochs LED 15W', sold: 80, revenue: 3200000, percent: 1.3 },
                { rank: 5, name: 'Buku Administrasi Sekolah', sold: 690, revenue: 13800000, percent: 5.6 },
                { rank: 6, name: 'Penggandaan Dokumen', sold: 5000, revenue: 2500000, percent: 1.0 },
                { rank: 7, name: 'Spuit 5cc Disposable', sold: 400, revenue: 500000, percent: 0.2 },
                { rank: 8, name: 'Whiteboard 240x120cm', sold: 25, revenue: 31250000, percent: 12.6 },
                { rank: 9, name: 'Laptop Acer E5-474', sold: 2, revenue: 20000000, percent: 8.1 },
                { rank: 10, name: 'Epson L3110', sold: 1, revenue: 3179500, percent: 1.3 },
              ].map((product) => (
                <tr key={product.rank} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-bold" style={{ color: COLORS.primary }}>
                    #{product.rank}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-center text-sm">{product.sold}</td>
                  <td className="px-6 py-4 text-right text-sm font-semibold">
                    Rp {(product.revenue / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                      {product.percent}%
                    </span>
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

export default function StaffReportsPage() {
  return (
    <StaffDashboardLayout activeTab="reports">
      <ReportsContent />
    </StaffDashboardLayout>
  );
}
