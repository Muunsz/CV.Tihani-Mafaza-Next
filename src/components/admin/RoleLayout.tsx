"use client";

import { AdminSidebar } from "@/components/admin/shared/AdminSidebar";
import { AdminHeader } from "@/components/admin/shared/AdminHeader";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface RoleLayoutProps {
  children: ReactNode;
  role: "staff" | "customer" | "guest" | "admin";
  title: string;
  subtitle?: string;
}

export function RoleLayout({
  children,
  role,
  title,
  subtitle,
}: RoleLayoutProps) {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/guest/auth/login");
        return;
      }
      if (userRole !== role) {
        // Redirect to appropriate dashboard based on role
        if (userRole === "admin") {
          router.push("/admin/dashboard");
        } else if (userRole === "staff") {
          router.push("/staff/dashboard");
        } else if (userRole === "customer") {
          router.push("/customer/dashboard");
        } else {
          router.push("/guest");
        }
      }
    }
  }, [isAuthenticated, userRole, role, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated || userRole !== role) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar role={role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader title={title} subtitle={subtitle} />

        {/* Content Area with proper scrolling */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
