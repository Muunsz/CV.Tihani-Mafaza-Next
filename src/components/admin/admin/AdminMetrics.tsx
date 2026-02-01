'use client';

import { COLORS } from '@/lib/constants';
import { BarChart3, Users, TrendingUp, DollarSign } from 'lucide-react';

const adminMetrics = [
  {
    title: 'Total Pendapatan Bulan Ini',
    value: 1250000000,
    change: 12,
    icon: DollarSign,
    format: 'currency',
  },
  {
    title: 'Total Pesanan',
    value: 248,
    change: 8,
    icon: BarChart3,
  },
  {
    title: 'Pelanggan Aktif',
    value: 1542,
    change: 5,
    icon: Users,
  },
  {
    title: 'Pertumbuhan YoY',
    value: 34,
    change: 3,
    icon: TrendingUp,
    format: 'percent',
  },
];

export function AdminMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {adminMetrics.map((metric, idx) => {
        const Icon = metric.icon;
        const isPositive = metric.change > 0;
        let displayValue = metric.value.toLocaleString('id-ID');
        
        if (metric.format === 'currency') {
          displayValue = `Rp${(metric.value / 1000000000).toFixed(1)}M`;
        } else if (metric.format === 'percent') {
          displayValue = `${metric.value}%`;
        }

        return (
          <div key={idx} className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
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
                    {isPositive ? '+' : ''}{metric.change}%
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
