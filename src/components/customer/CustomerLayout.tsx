"use client";

import React, { useState } from "react";
import { CustomerSidebar } from "./CustomerSidebar";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
