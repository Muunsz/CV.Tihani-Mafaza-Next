import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { RegisterForm } from "@/components/guest/auth/RegisterForm";
import { COLORS } from "@/lib/constants";

export const metadata = {
  title: "Daftar - CV. Tihani Mafaza",
  description:
    "Daftar akun baru untuk memesan produk dan layanan dari CV. Tihani Mafaza.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Bergabunglah dengan Kami
            </h1>
            <p className="text-gray-600 text-lg">
              Daftar sekarang dan nikmati akses ke katalog lengkap produk dan
              layanan kami.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${COLORS.accent}20` }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color: COLORS.accent }}
                >
                  ✓
                </span>
              </div>
              <h3 className="font-semibold mb-2">Harga Transparan</h3>
              <p className="text-sm text-gray-600">
                Lihat harga final dan DPP dengan jelas tanpa biaya tersembunyi.
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${COLORS.accent}20` }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color: COLORS.accent }}
                >
                  ✓
                </span>
              </div>
              <h3 className="font-semibold mb-2">Layanan 24/7</h3>
              <p className="text-sm text-gray-600">
                Tim support kami siap membantu kapan saja Anda membutuhkan.
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${COLORS.accent}20` }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color: COLORS.accent }}
                >
                  ✓
                </span>
              </div>
              <h3 className="font-semibold mb-2">Pengiriman Cepat</h3>
              <p className="text-sm text-gray-600">
                Pengiriman ke seluruh Indonesia dengan tracking real-time.
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
            <RegisterForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
