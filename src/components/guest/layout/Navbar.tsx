"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { COMPANY, NAVIGATION, COLORS } from "@/lib/constants";
import { Menu, X, ChevronDown, User } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Helper to safely read user image without changing global types
  const getUserImage = (u: unknown): string | null => {
    if (typeof u === "object" && u !== null && "image" in u) {
      const img = (u as { image?: unknown }).image;
      if (typeof img === "string" && img.length > 0) return img;
    }
    return null;
  };

  const avatarUrl = getUserImage(session?.user);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    console.log("[LOGOUT] Starting logout process");

    try {
      // Clear local storage/session storage
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }

      // Call NextAuth signOut with redirect
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });

      console.log("[LOGOUT] SignOut initiated successfully");
    } catch (error) {
      console.error("[LOGOUT] Error during logout:", error);
      // Force redirect to home even if logout fails
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 order-first"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo - Center/Left */}
          <div className="flex items-center gap-2 shrink-0 flex-1 lg:flex-none relative">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <Image
                  src="/images/LogoNoBg.png"
                  alt="CV. Tihani Mafaza"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p
                  className="font-bold text-gray-900 text-sm"
                  style={{ color: COLORS.primary }}
                >
                  {COMPANY.name}
                </p>
                <p className="text-xs text-gray-500">{COMPANY.tagline}</p>
              </div>
            </Link>

            {/* Mobile Logo Dropdown */}
            {session && (
              <div className="lg:hidden relative">
                <button
                  onClick={() =>
                    setExpandedMenu(expandedMenu === "logo" ? null : "logo")
                  }
                  className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition focus:outline-none ml-2"
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {expandedMenu === "logo" && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      href={
                        session.user?.role === "admin" ||
                        session.user?.role === "staff"
                          ? "/admin/dashboard"
                          : session.user?.role === "customer"
                            ? "/customer/dashboard"
                            : "/profile"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      onClick={() => setExpandedMenu(null)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/customer/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setExpandedMenu(null)}
                    >
                      Profil
                    </Link>
                    <button
                      onClick={() => {
                        setExpandedMenu(null);
                        handleLogout();
                      }}
                      disabled={isLoggingOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? "Keluar..." : "Keluar"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {NAVIGATION.map((item) => {
              const hasSub = "submenu" in item && Array.isArray(item.submenu);
              const submenu = hasSub
                ? (
                    item as {
                      submenu: readonly { label: string; href: string }[];
                    }
                  ).submenu
                : undefined;

              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-800 transition flex items-center gap-1"
                  >
                    {item.label}
                    {hasSub && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasSub && (
                    <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {submenu!.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-gray-800 first:rounded-t-md last:rounded-b-md transition"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA/Profile Dropdown (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition focus:outline-none">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                  <span className="font-semibold text-gray-800">
                    {session.user?.name || "Akun"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    href={
                      session.user?.role === "admin" ||
                      session.user?.role === "staff"
                        ? "/admin/dashboard"
                        : session.user?.role === "customer"
                          ? "/customer/dashboard"
                          : "/profile"
                    }
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/customer/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? "Keluar..." : "Keluar"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/guest/auth/login"
                  className="px-6 py-2 rounded-lg font-semibold transition hover:bg-gray-100 border border-gray-200"
                  style={{ color: COLORS.accent }}
                >
                  Masuk
                </Link>
                <Link
                  href="/guest/auth/register"
                  className="px-6 py-2 rounded-lg text-white font-semibold transition hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Auth Buttons/Profile - Right */}
          <div className="md:hidden flex items-center gap-1 order-last">
            {session ? (
              <div className="relative group">
                <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-100 transition focus:outline-none">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    href={
                      session.user?.role === "admin" ||
                      session.user?.role === "staff"
                        ? "/admin/dashboard"
                        : session.user?.role === "customer"
                          ? "/customer/dashboard"
                          : "/profile"
                    }
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/customer/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? "Keluar..." : "Keluar"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/guest/auth/login"
                  className="px-3 py-2 rounded-lg font-semibold text-sm transition hover:bg-gray-100 border border-gray-200"
                  style={{ color: COLORS.accent }}
                >
                  Masuk
                </Link>
                <Link
                  href="/guest/auth/register"
                  className="px-3 py-2 rounded-lg text-white font-semibold text-sm transition hover:opacity-90"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {NAVIGATION.map((item) => {
              const hasSub = "submenu" in item && Array.isArray(item.submenu);
              const submenu = hasSub
                ? (
                    item as {
                      submenu: readonly { label: string; href: string }[];
                    }
                  ).submenu
                : undefined;

              return (
                <div key={item.label}>
                  {hasSub ? (
                    <button
                      onClick={() =>
                        setExpandedMenu(
                          expandedMenu === item.label ? null : item.label,
                        )
                      }
                      className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition ${
                          expandedMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mobile Submenu */}
                  {hasSub && expandedMenu === item.label && (
                    <div className="pl-4 space-y-1">
                      {submenu!.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex flex-col gap-2 mt-4">
              {session ? (
                <div className="px-3 py-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt="Avatar"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/customer/profile"
                      className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Profil
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      disabled={isLoggingOut}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? "Keluar..." : "Keluar"}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block w-full px-3 py-2 rounded-lg font-semibold transition text-center border border-gray-200 hover:bg-gray-100"
                    style={{ color: COLORS.accent }}
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block w-full px-3 py-2 rounded-lg text-white font-semibold transition text-center hover:opacity-90"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
