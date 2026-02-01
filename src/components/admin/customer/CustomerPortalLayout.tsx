'use client';

import { ReactNode, useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { COLORS } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CustomerPortalLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export function CustomerPortalLayout({ children, activeTab = 'dashboard' }: CustomerPortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const customerMenuItems = [
    { label: 'Dashboard', href: '/portal/customer', icon: '📊' },
    { label: 'Pesanan Saya', href: '/portal/customer/orders', icon: '📦' },
    { label: 'Quotations', href: '/portal/customer/quotations', icon: '📄' },
    { label: 'Riwayat', href: '/portal/customer/history', icon: '📋' },
    { label: 'Profil', href: '/portal/customer/profile', icon: '👤' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed lg:static w-64 h-full bg-white border-r border-gray-200 transform lg:transform-none transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Portal
          </h1>
          <p className="text-xs text-gray-600 mt-1">Pelanggan Tihani</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {customerMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? 'bg-orange-100 text-orange-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
              Portal Pelanggan
            </h2>
            <p className="text-sm text-gray-600">Kelola pesanan dan quotations Anda</p>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>

      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
