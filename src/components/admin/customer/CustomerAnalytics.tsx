'use client';

import { COLORS } from '@/lib/constants';
import { ShoppingCart, FileText, User, CreditCard } from 'lucide-react';

const customerStats = [
  { title: 'Total Pesanan', value: 12, change: 2, icon: ShoppingCart },
  { title: 'Nilai Pembelian', value: 125000000, change: 15, icon: CreditCard, format: 'currency' },
  { title: 'Kutipan Aktif', value: 3, change: -1, icon: FileText },
  { title: 'Poin Loyalitas', value: 2500, change: 8, icon: User },
];

export function CustomerAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {customerStats.map((stat, idx) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        const displayValue =
          stat.format === 'currency'
            ? `Rp${(stat.value / 1000000).toFixed(0)}M`
            : stat.value.toLocaleString('id-ID');

        return (
          <div key={idx} className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold mt-2" style={{ color: COLORS.primary }}>
                  {displayValue}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: isPositive ? '#10b981' : '#ef4444',
                    }}
                  >
                    {isPositive ? '+' : ''}{stat.change}
                  </span>
                  <span className="text-gray-600 text-sm">vs bulan lalu</span>
                </div>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.accent}20` }}
              >
                <Icon size={24} style={{ color: COLORS.accent }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
