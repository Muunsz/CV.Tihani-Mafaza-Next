'use client';

import { COLORS, CONTACT } from '@/lib/constants';
import { Bell, Search, User, MessageSquare } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            {title}
          </h1>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Search size={18} style={{ color: COLORS.neutral }} />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent outline-none text-sm w-32"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell size={20} style={{ color: COLORS.primary }} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS.accent }}
            />
          </button>

          {/* Messages */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <MessageSquare size={20} style={{ color: COLORS.primary }} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS.accent }}
            />
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: COLORS.accent }}
            >
              <User size={18} />
            </div>
            <div className="hidden sm:block text-left text-sm">
              <p className="font-semibold" style={{ color: COLORS.primary }}>
                Admin
              </p>
              <p style={{ color: COLORS.neutral }}>Tihani</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Default export for compatibility
export default AdminHeader;
