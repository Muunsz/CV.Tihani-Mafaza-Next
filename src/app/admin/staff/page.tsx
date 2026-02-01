'use client';

import { StaffDashboardLayout } from '@/components/admin/staff/StaffDashboardLayout';
import { StaffAnalytics } from '@/components/admin/staff/StaffAnalytics';
import { StaffOrdersTable } from '@/components/admin/staff/StaffOrdersTable';
import { COLORS } from '@/lib/constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', revenue: 4000, orders: 240 },
  { month: 'Feb', revenue: 3000, orders: 221 },
  { month: 'Mar', revenue: 2000, orders: 229 },
  { month: 'Apr', revenue: 2780, orders: 200 },
  { month: 'May', revenue: 1890, orders: 229 },
  { month: 'Jun', revenue: 2390, orders: 200 },
  { month: 'Jul', revenue: 3490, orders: 321 },
];

function StaffDashboardContent() {
  return (
    <div className="space-y-8">
      {/* Analytics Cards */}
      <StaffAnalytics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.primary }}>
            Pendapatan & Pesanan Bulanan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.accent}
                strokeWidth={2}
                name="Pendapatan (Rp)"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke={COLORS.primary}
                strokeWidth={2}
                name="Pesanan"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.primary }}>
            Produk Terlaris
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Kursi Kerja', sales: 138 },
              { name: 'Cetak Foto', sales: 460 },
              { name: 'Hannochs LED', sales: 80 },
              { name: 'Kertas HVS F4', sales: 175 },
            ].map((product, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0">
                <span className="text-sm text-gray-700">{product.name}</span>
                <span className="font-bold" style={{ color: COLORS.accent }}>
                  {product.sales}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <StaffOrdersTable />
    </div>
  );
}

export default function StaffDashboard() {
  return (
    <StaffDashboardLayout activeTab="dashboard">
      <StaffDashboardContent />
    </StaffDashboardLayout>
  );
}
