'use client';

import React from "react"

import { COLORS } from '@/lib/constants';
import { TrendingUp, ShoppingCart, Users, DollarSign } from 'lucide-react';

interface AnalyticsCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const analyticsData: AnalyticsCard[] = [
  {
    title: 'Total Pesanan',
    value: '1,245',
    change: '+12%',
    trend: 'up',
    icon: <ShoppingCart size={24} />,
    color: COLORS.accent,
  },
  {
    title: 'Total Pelanggan',
    value: '328',
    change: '+8%',
    trend: 'up',
    icon: <Users size={24} />,
    color: COLORS.primary,
  },
  {
    title: 'Revenue Bulan Ini',
    value: 'Rp 125.5M',
    change: '+15%',
    trend: 'up',
    icon: <DollarSign size={24} />,
    color: '#10b981',
  },
  {
    title: 'Konversi',
    value: '3.8%',
    change: '-2%',
    trend: 'down',
    icon: <TrendingUp size={24} />,
    color: '#f59e0b',
  },
];

export function StaffAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {analyticsData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">{card.title}</h3>
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${card.color}20`, color: card.color }}
            >
              {card.icon}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-3xl font-bold" style={{ color: COLORS.primary }}>
              {card.value}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 text-sm ${
              card.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <TrendingUp size={16} />
            <span>{card.change} dari bulan lalu</span>
          </div>
        </div>
      ))}
    </div>
  );
}
