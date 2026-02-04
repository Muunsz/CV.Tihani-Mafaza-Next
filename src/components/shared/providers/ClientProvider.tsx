"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";

/**
 * Client Provider Wrapper
 *
 * This component wraps all client-side providers that require the 'use client' directive.
 * It's imported in the root layout to enable context-based components.
 */

interface ClientProviderProps {
  children: React.ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
  return (
    <SessionProvider basePath="/api/guest/auth">
      <AuthProvider>
        <HeroUIProvider disableAnimation={false}>{children}</HeroUIProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
