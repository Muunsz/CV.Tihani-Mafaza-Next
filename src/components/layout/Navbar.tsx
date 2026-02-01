'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY, NAVIGATION, COLORS } from '@/lib/constants';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg' 
        : 'bg-white border-b border-gray-100'
    }`}>
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
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 flex-1 lg:flex-none">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/LogoNoBg.png"
                alt="CV. Tihani Mafaza"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-gray-900 text-sm" style={{ color: COLORS.primary }}>
                {COMPANY.name}
              </p>
              <p className="text-xs text-gray-500">{COMPANY.tagline}</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {NAVIGATION.map((item) => (
              <div key={item.label} className="relative group">
                <Link href={item.href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-800 transition flex items-center gap-1">
                  {item.label}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem) => (
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
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/auth/login"
              className="px-6 py-2 rounded-lg font-semibold transition hover:bg-gray-100 border border-gray-200"
              style={{ color: COLORS.accent }}
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-2 rounded-lg text-white font-semibold transition hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: COLORS.accent }}
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Auth Buttons - Right */}
          <div className="md:hidden flex items-center gap-1 order-last">
            <Link
              href="/auth/login"
              className="px-3 py-2 rounded-lg font-semibold text-sm transition hover:bg-gray-100 border border-gray-200"
              style={{ color: COLORS.accent }}
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="px-3 py-2 rounded-lg text-white font-semibold text-sm transition hover:opacity-90"
              style={{ backgroundColor: COLORS.accent }}
            >
              Daftar
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {NAVIGATION.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setExpandedMenu(expandedMenu === item.label ? null : item.label)
                  }
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition ${
                        expandedMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {item.submenu && expandedMenu === item.label && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 mt-4">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
