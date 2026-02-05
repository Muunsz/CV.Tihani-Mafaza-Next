"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    // Set timeout for loading state
    const timeout = setTimeout(() => {
      if (status === "loading") {
        setHasTimedOut(true);
        console.warn("[REDIRECT] Auth loading timeout - redirecting to login");
        router.push("/guest/auth/login");
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [status, router]);

  useEffect(() => {
    if (status === "loading" || hasTimedOut) return;

    if (session?.user) {
      try {
        // Get user role from NextAuth session and redirect
        // Use the correct type for session.user
        const role = session.user?.role || "customer";

        console.log("[REDIRECT] Redirecting user with role:", role);

        if (role === "admin") {
          router.push("/admin/dashboard");
        } else if (role === "staff") {
          router.push("/staff/dashboard");
        } else if (role === "customer") {
          router.push("/customer/dashboard");
        } else {
          router.push("/guest/dashboard");
        }
      } catch (error) {
        console.error("[REDIRECT] Error during redirect:", error);
        router.push("/guest/auth/login");
      }
    } else {
      console.log("[REDIRECT] No session found, redirecting to login");
      router.push("/guest/auth/login");
    }
  }, [session, status, router, hasTimedOut]);

  if (hasTimedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            ⚠️ Waktu habis memuat autentikasi
          </div>
          <p>Mengalihkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Mengalihkan...</p>
      </div>
    </div>
  );
}
