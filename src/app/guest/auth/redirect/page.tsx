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
      // Fetch user role and redirect
      fetch("/api/auth/user-role")
        .then((res) => res.json())
        .then((userData) => {
          if (userData.role === "admin") {
            router.push("/admin/dashboard");
          } else if (userData.role === "staff") {
            router.push("/admin/staff");
          } else {
            router.push("/profile");
          }
        })
        .catch(() => {
          router.push("/profile"); // fallback
        });
    } else {
      router.push("/auth/login");
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
