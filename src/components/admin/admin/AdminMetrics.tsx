'use client';

import { COLORS } from '@/lib/constants';
import { BarChart3, Users, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const adminMetrics = [
  {
    title: 'Total Pendapatan Bulan Ini',
    value: 1250000000,
    change: 12,
    icon: DollarSign,
    format: 'currency',
    color: '#10b981',
  },
  {
    title: 'Total Pesanan',
    value: 248,
    change: 8,
    icon: BarChart3,
    color: COLORS.accent,
  },
  {
    title: 'Pelanggan Aktif',
    value: 1542,
    change: 5,
    icon: Users,
    color: '#3b82f6',
  },
  {
    title: 'Pertumbuhan YoY',
    value: 34,
    change: 3,
    icon: TrendingUp,
    format: 'percent',
    color: '#8b5cf6',
  },
];

export function AdminMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {adminMetrics.map((metric, idx) => {
        const Icon = metric.icon;
        const isPositive = metric.change > 0;
        const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
        
        let displayValue = metric.value.toLocaleString('id-ID');
        
        if (metric.format === 'currency') {
          displayValue = `Rp${(metric.value / 1000000000).toFixed(1)}M`;
        } else if (metric.format === 'percent') {
          displayValue = `${metric.value}%`;
        }

        return (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${metric.color}15` }}
              >
                <Icon size={28} style={{ color: metric.color }} />
              </div>
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{
                  backgroundColor: isPositive ? '#dcfce7' : '#fee2e2',
                }}
              >
                <TrendIcon
                  size={16}
                  style={{
                    color: isPositive ? '#10b981' : '#ef4444',
                  }}
                />
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: isPositive ? '#10b981' : '#ef4444',
                  }}
                >
                  {isPositive ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
            <p
              className="text-2xl font-bold mt-2"
              style={{ color: COLORS.primary }}
            >
              {displayValue}
            </p>
            <p className="text-xs text-gray-500 mt-2">vs bulan lalu</p>
          </div>
        );
      })}
    </div>
  );
}
