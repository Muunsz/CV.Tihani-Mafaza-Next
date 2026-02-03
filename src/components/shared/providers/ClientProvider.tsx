"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";

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
    <SessionProvider>
      <HeroUIProvider>{children}</HeroUIProvider>
    </SessionProvider>
  );
}
