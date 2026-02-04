"use client";

import React, { useState, useEffect } from "react";
import { CustomerSidebar } from "./CustomerSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/guest/auth/login");
        return;
      }
      if (userRole !== "customer") {
        // Redirect to appropriate dashboard based on role
        if (userRole === "admin") {
          router.push("/admin/dashboard");
        } else if (userRole === "staff") {
          router.push("/staff/dashboard");
        } else {
          router.push("/guest");
        }
      }
    }
  }, [isAuthenticated, userRole, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated || userRole !== "customer") {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
