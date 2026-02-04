"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const REDIRECT_TIMEOUT = 5000; // 5 seconds

export default function AuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn("[AUTH_REDIRECT] Redirect timeout - redirecting to login");
      setIsTimeout(true);
      router.push("/guest/auth/login");
    }, REDIRECT_TIMEOUT);

    if (session?.user) {
      // Clear timeout since we found the session
      clearTimeout(timeoutId);

      // Get user role from NextAuth session and redirect
      const role = (session.user as any)?.role || "customer";
      
      console.log("[AUTH_REDIRECT] Redirecting user with role:", role);

      const redirectMap: Record<string, string> = {
        admin: "/admin/dashboard",
        staff: "/staff/dashboard",
        customer: "/customer/dashboard",
        guest: "/guest/dashboard",
      };

      const targetUrl = redirectMap[role] || "/guest/dashboard";
      
      // Use replace to prevent back button issues
      router.replace(targetUrl);
    } else if (status === "unauthenticated") {
      // User is not authenticated
      clearTimeout(timeoutId);
      console.log("[AUTH_REDIRECT] User is unauthenticated - redirecting to login");
      router.push("/guest/auth/login");
    }

    return () => clearTimeout(timeoutId);
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          {!isTimeout ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Mengalihkan...</p>
              <p className="text-sm text-gray-500 mt-2">Mohon tunggu, Anda akan dialihkan ke dashboard</p>
            </>
          ) : (
            <>
              <div className="rounded-full h-12 w-12 bg-red-100 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">Pengalihan Timeout</p>
              <p className="text-sm text-gray-500 mt-2">Terjadi kesalahan saat mengalihkan. Silakan login kembali.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
