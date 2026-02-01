'use client';

import React from "react"

import { useState } from 'react';
import { AdminHeader } from '@/components/admin/shared/AdminHeader';
import { AdminSidebar } from '@/components/admin/shared/AdminSidebar';
import { COLORS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';

export interface StaffDashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export function StaffDashboardLayout({ children, activeTab }: StaffDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar role="staff" />
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 lg:hidden"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader
          title="Staff Dashboard"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          role="staff"
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-100 p-4 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
