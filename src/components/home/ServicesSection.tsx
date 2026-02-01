'use client';

import { COLORS } from '@/lib/constants';
import { Clock, Truck, Shield, Headphones, DollarSign, RefreshCw } from 'lucide-react';

const services = [
  {
    icon: Clock,
    title: 'Layanan 24 Jam',
    description: 'Tim customer service kami siap melayani Anda kapan saja, siang atau malam.',
  },
  {
    icon: Truck,
    title: 'Pengiriman Cepat',
    description: 'Pengiriman ke seluruh Bandung dan sekitarnya dengan jaminan tepat waktu.',
  },
  {
    icon: Shield,
    title: 'Jaminan Kualitas',
    description: 'Semua produk melalui quality control ketat sebelum dikirim ke Anda.',
  },
  {
    icon: DollarSign,
    title: 'Harga Transparan',
    description: 'Harga yang jelas tanpa biaya tersembunyi. Terbuka untuk negosiasi grosir.',
  },
  {
    icon: RefreshCw,
    title: 'Kebijakan Return',
    description: 'Garansi uang kembali jika produk tidak sesuai dengan deskripsi.',
  },
  {
    icon: Headphones,
    title: 'Support Terbaik',
    description: 'Tim support siap membantu menyelesaikan masalah Anda dengan cepat.',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
            Layanan & Dukungan Kami
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Komitmen kami adalah memberikan pengalaman terbaik dalam setiap aspek layanan.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <IconComponent className="w-10 h-10 mb-4" style={{ color: COLORS.accent }} />
                <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.primary }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
