"use client";

import { COMPANY, COLORS, CONTACT, NAVIGATION } from "@/lib/constants";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  AtSignIcon as WhatsappIcon,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/LogoNoBg.png"
                alt={COMPANY.name}
                className="w-12 h-12 object-contain"
              />
              <div>
                <p className="font-bold text-white">{COMPANY.name}</p>
                <p className="text-xs text-gray-400">{COMPANY.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {COMPANY.description}
            </p>
            <p className="italic text-sm text-gray-400">&quot;{COMPANY.motto}&quot;</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Menu Utama</h3>
            <ul className="space-y-2">
              {NAVIGATION.slice(0, 3).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:text-orange-400 transition text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-4">Kategori Produk</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition text-sm"
                >
                  Elektronik
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition text-sm"
                >
                  Furniture & ATK
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition text-sm"
                >
                  Material Bangunan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition text-sm"
                >
                  Jasa & Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  style={{ color: COLORS.accent }}
                />
                <span className="text-sm leading-relaxed">
                  {CONTACT.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: COLORS.accent }}
                />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-sm hover:text-white transition"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: COLORS.accent }}
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm hover:text-white transition"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {currentYear} {COMPANY.name}. Hak Cipta Dilindungi. Semua hak
            reserved.
          </p>
          <div className="flex justify-center md:justify-end gap-6">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Syarat & Ketentuan
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition hover:-translate-y-1 z-40"
        style={{ backgroundColor: "#25D366" }}
        title="Chat via WhatsApp"
      >
        <svg
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.567.994-2.540 2.346-2.54 3.861 0 1.52.983 2.868 2.54 3.861a9.879 9.879 0 005.031 1.378h.004c5.487 0 9.974-4.487 9.974-9.981C21.474 6.487 16.987 2 11.5 2a9.997 9.997 0 00-9.52 6.236A9.998 9.998 0 002 11.5c0 5.491 4.477 9.978 9.97 9.978h.002c2.708 0 5.275-.859 7.418-2.40l.12 2.26c-.5.15-1.097.29-1.697.29-5.539 0-10.04-4.49-10.04-10.023.01-5.533 4.51-10.023 10.05-10.023h.003z" />
        </svg>
      </a>
    </footer>
  );
}
