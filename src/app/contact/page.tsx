import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COLORS, CONTACT } from '@/lib/constants';
import { RequestForm } from '@/components/forms/RequestForm';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-4" style={{ color: COLORS.primary }}>
              Hubungi Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Tim kami siap melayani Anda 24 jam, setiap hari. Hubungi kami melalui berbagai
              saluran komunikasi untuk kemudahan Anda.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Phone */}
              <div className="p-8 rounded-lg border border-gray-200 text-center hover:shadow-lg transition">
                <Phone className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.accent }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>
                  Telepon
                </h3>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  {CONTACT.phone}
                </a>
              </div>

              {/* Email */}
              <div className="p-8 rounded-lg border border-gray-200 text-center hover:shadow-lg transition">
                <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.accent }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>
                  Email
                </h3>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  {CONTACT.email}
                </a>
              </div>

              {/* Address */}
              <div className="p-8 rounded-lg border border-gray-200 text-center hover:shadow-lg transition">
                <MapPin className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.accent }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>
                  Alamat
                </h3>
                <p className="text-gray-600 font-semibold text-sm">{CONTACT.address}</p>
              </div>
            </div>

            {/* Map Section */}
            <div className="rounded-lg overflow-hidden border border-gray-200 mb-16">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7178594906846!2d107.6095!3d-6.9023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTihani%20Mafaza!5e0!3m2!1sid!2sid"
                width="100%"
                height={400}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
                Kirim Pesan Langsung
              </h2>
              <p className="text-gray-600 text-lg">
                Silakan isi form di bawah ini untuk pertanyaan umum atau feedback Anda.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* Request Form */}
        <RequestForm />
      </main>
      <Footer />
    </div>
  );
}
