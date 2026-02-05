"use client";

import React from "react";
import { hasPermission, canAccessResource, UserRole } from "@/lib/roles";

interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: string;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
  userRole?: UserRole;
}

/**
 * Component to guard content based on user role and permissions
 * Usage:
 * <PermissionGuard permission="manage_products" userRole={userRole}>
 *   <ManageProducts />
 * </PermissionGuard>
 */
export function PermissionGuard({
  children,
  permission,
  requiredRoles,
  fallback = null,
  userRole = "guest",
}: PermissionGuardProps) {
  // Check permission if provided
  if (permission && !hasPermission(userRole, permission)) {
    return <>{fallback}</>;
  }

  // Check required roles if provided
  if (requiredRoles && !canAccessResource(userRole, requiredRoles)) {
    return <>{fallback}</>;
  }

  // If no permission or required role check fails, show fallback
  if (!permission && !requiredRoles) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Higher-order component to protect components with permission requirements
 */
export function withPermission<P extends { userRole?: UserRole }>(
  Component: React.ComponentType<P>,
  permission: string,
  fallback?: React.ReactNode,
) {
  return function ProtectedComponent(props: P) {
    const userRole = props.userRole || "guest";

    return (
      <PermissionGuard
        permission={permission}
        userRole={userRole}
        fallback={fallback}
      >
        <Component {...props} />
      </PermissionGuard>
    );
  };
}
