'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Bagaimana cara melakukan pemesanan?',
    answer:
      'Anda dapat melakukan pemesanan melalui website kami dengan login ke akun Anda, atau langsung hubungi tim customer service kami via telepon/WhatsApp. Untuk pembelian pertama kali, silakan mendaftar terlebih dahulu.',
  },
  {
    question: 'Berapa lama waktu pengiriman?',
    answer:
      'Pengiriman ke Bandung City umumnya 1-2 hari kerja. Untuk area sekitarnya dapat memakan waktu 2-5 hari kerja, tergantung lokasi. Kami akan memberikan estimasi yang pasti setelah konfirmasi pesanan.',
  },
  {
    question: 'Apakah tersedia layanan pembayaran cicilan?',
    answer:
      'Kami menyediakan berbagai metode pembayaran termasuk transfer bank, kartu kredit, dan untuk pesanan dalam jumlah besar dapat dilakukan dengan cara cicilan atau DP dengan syarat dan ketentuan yang berlaku.',
  },
  {
    question: 'Apa yang harus dilakukan jika produk cacat?',
    answer:
      'Jika produk yang diterima tidak sesuai atau cacat, segera hubungi kami dengan melampirkan bukti foto/video. Kami akan melakukan proses klaim dan mengganti produk dengan yang baru tanpa biaya tambahan.',
  },
  {
    question: 'Apakah ada minimum order?',
    answer:
      'Tidak ada minimum order untuk pembelian online. Namun untuk pembelian dalam jumlah besar (grosir), kami memberikan harga spesial dan istimewa. Silakan hubungi tim sales kami untuk diskusi lebih lanjut.',
  },
  {
    question: 'Bagaimana cara mengajukan request barang khusus?',
    answer:
      'Gunakan fitur "Request Barang" di website kami, atau hubungi tim kami secara langsung. Jelaskan detail spesifikasi barang yang Anda butuhkan, dan kami akan mencari solusi terbaik untuk Anda.',
  },
];

export function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-gray-600 text-lg">
            Temukan jawaban atas pertanyaan umum tentang layanan kami
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition text-left"
              >
                <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                  style={{ color: COLORS.accent }}
                />
              </button>

              {/* Expanded Answer */}
              {expandedIndex === index && (
                <div
                  className="px-6 py-4 border-t border-gray-200 bg-gray-50"
                  style={{ borderTopColor: COLORS.accent }}
                >
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Belum menemukan jawaban yang dicari?</p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 rounded-lg text-white font-bold transition hover:shadow-lg"
            style={{ backgroundColor: COLORS.accent }}
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
