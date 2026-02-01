'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Users, FileText, Settings, LogOut, Menu, X } from 'lucide-react';
import { COLORS } from '@/lib/constants';
import { useState } from 'react';

interface AdminSidebarProps {
  role: 'staff' | 'customer' | 'guest';
}

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getMenuItems = () => {
    const baseItems = [
      { label: 'Dashboard', href: `/admin/${role}`, icon: LayoutDashboard },
    ];

    if (role === 'staff') {
      return [
        ...baseItems,
        { label: 'Pesanan', href: `/admin/${role}/orders`, icon: ShoppingCart },
        { label: 'Permintaan Kutipan', href: `/admin/${role}/quotations`, icon: FileText },
        { label: 'Pelanggan', href: `/admin/${role}/customers`, icon: Users },
        { label: 'Inventori', href: `/admin/${role}/inventory`, icon: ShoppingCart },
        { label: 'Laporan', href: `/admin/${role}/reports`, icon: FileText },
        { label: 'Pengaturan', href: `/admin/${role}/settings`, icon: Settings },
      ];
    }

    if (role === 'customer') {
      return [
        ...baseItems,
        { label: 'Pesanan Saya', href: `/admin/${role}/orders`, icon: ShoppingCart },
        { label: 'Riwayat Kutipan', href: `/admin/${role}/quotations`, icon: FileText },
        { label: 'Profil', href: `/admin/${role}/profile`, icon: Users },
        { label: 'Pengaturan', href: `/admin/${role}/settings`, icon: Settings },
      ];
    }

    // Guest
    return [
      ...baseItems,
      { label: 'Produk', href: `/admin/${role}/products`, icon: ShoppingCart },
      { label: 'Bantuan', href: `/admin/${role}/help`, icon: FileText },
    ];
  };

  const menuItems = getMenuItems();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg"
        style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 transition-all duration-300 lg:relative lg:translate-x-0 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <h2 className="text-2xl font-bold">Tihani</h2>
          <p className="text-sm opacity-80 mt-1">Admin {role.charAt(0).toUpperCase() + role.slice(1)}</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  active ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Default export for compatibility
export default AdminSidebar;
