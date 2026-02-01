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

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
