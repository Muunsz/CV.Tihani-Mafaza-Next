'use client';

import { useState } from 'react';
import { MessageCircle, Download, X } from 'lucide-react';
import Image from 'next/image';
import { COLORS } from '@/lib/constants';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownloadPDF = () => {
    // Create a simple PDF (you can integrate with a PDF library later)
    const element = document.createElement('a');
    element.setAttribute('href', '/downloads/company-profile.pdf');
    element.setAttribute('download', 'CV-Tihani-Mafaza-Company-Profile.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadLogo = () => {
    const element = document.createElement('a');
    element.setAttribute('href', '/images/LogoNoBg.png');
    element.setAttribute('download', 'CV-Tihani-Mafaza-Logo.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPortfolio = () => {
    const element = document.createElement('a');
    element.setAttribute('href', '/downloads/portfolio-perusahaan.pdf');
    element.setAttribute('download', 'CV-Tihani-Mafaza-Portfolio.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleWhatsApp = () => {
    const waLink = 'https://wa.me/628123456789?text=Halo%20CV%20Tihani%20Mafaza%2C%20saya%20ingin%20menanyakan%20lebih%20lanjut%20tentang%20produk%20dan%20layanan%20Anda.';
    window.open(waLink, '_blank');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Menu Items */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden w-56">
            {/* WhatsApp Option */}
            <button
              onClick={() => {
                handleWhatsApp();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-200 text-left"
            >
              <div className="w-8 h-8 relative flex-shrink-0">
                <Image
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Chat WhatsApp</p>
                <p className="text-xs text-gray-500">Hubungi kami sekarang</p>
              </div>
            </button>

            {/* Download Company Profile */}
            <button
              onClick={() => {
                handleDownloadPDF();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-200 text-left"
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.accent, color: 'white', borderRadius: '4px' }}>
                <Download className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Company Profile</p>
                <p className="text-xs text-gray-500">Download PDF</p>
              </div>
            </button>

            {/* Download Portfolio */}
            <button
              onClick={() => {
                handleDownloadPortfolio();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-200 text-left"
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF6B6B', color: 'white', borderRadius: '4px' }}>
                <Download className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Portfolio Perusahaan</p>
                <p className="text-xs text-gray-500">Download PDF</p>
              </div>
            </button>

            {/* Download Logo */}
            <button
              onClick={() => {
                handleDownloadLogo();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left"
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.primary, color: 'white', borderRadius: '4px' }}>
                <Download className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Logo Perusahaan</p>
                <p className="text-xs text-gray-500">Download PNG</p>
              </div>
            </button>
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition transform hover:scale-110"
          style={{ backgroundColor: COLORS.accent }}
          title={isOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
