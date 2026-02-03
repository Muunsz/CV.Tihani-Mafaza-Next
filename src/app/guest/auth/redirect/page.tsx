"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      console.log("[REDIRECT] Session user:", session.user);
      const role = (session.user as any)?.role || "guest";
      console.log("[REDIRECT] User role:", role);
      
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "staff") {
        router.push("/staff/dashboard");
      } else if (role === "customer") {
        router.push("/customer/dashboard");
      } else {
        router.push("/guest/dashboard");
      }
    } else {
      console.log("[REDIRECT] No session found, redirecting to login");
      router.push("/guest/auth/login");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Mengalihkan...</p>
      </div>
    </div>
  );
}
