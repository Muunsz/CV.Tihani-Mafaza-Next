'use client';

import { AdminSidebar } from '@/components/admin/shared/AdminSidebar';
import { AdminHeader } from '@/components/admin/shared/AdminHeader';
import { ReactNode } from 'react';

interface RoleLayoutProps {
  children: ReactNode;
  role: 'staff' | 'customer' | 'guest' | 'admin';
  title: string;
  subtitle?: string;
}

export function RoleLayout({ children, role, title, subtitle }: RoleLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar role={role as any} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader title={title} subtitle={subtitle} />

        {/* Content Area with proper scrolling */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
