"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ROLE_PERMISSIONS } from "@/lib/roles";
import { useSession, signIn, signOut } from "next-auth/react";
import { User, UserRole, ROLES } from "@/lib/roles";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role?: UserRole,
  ) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const isLoading = status === "loading";

  // Convert NextAuth session to our User type
  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      const userData: User = {
        id: session.user.id || "1",
        email: session.user.email || "",
        name: session.user.name || "",
        role: (session.user?.role as UserRole) || ROLES.CUSTOMER,
        createdAt: new Date(),
        isActive: true,
      };
      // Only update if user data changed
      if (!user || user.id !== userData.id || user.role !== userData.role) {
        setUser(userData);
      }
    } else {
      if (user !== null) setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const register = async () => {
    // TODO: Implement registration API call
    throw new Error("Registration not implemented yet");
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        userRole: user?.role ?? ROLES.GUEST,
        login,
        register,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
