import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm';
import { COLORS } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Ganti Password - CV. Tihani Mafaza',
  description: 'Ubah password akun Anda',
};

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 mb-8 text-sm font-semibold hover:underline"
            style={{ color: COLORS.accent }}
          >
            <ArrowLeft size={18} />
            Kembali ke Profil
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>
              Ganti Password
            </h1>
            <p className="text-gray-600">
              Ubah password Anda untuk menjaga keamanan akun
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
            <ChangePasswordForm />
          </div>

          {/* Security Tips */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold mb-3 text-blue-900">Tips Keamanan Password</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol</li>
              <li>• Jangan gunakan informasi pribadi seperti tanggal lahir atau nama</li>
              <li>• Gunakan password yang unik dan tidak mudah ditebak</li>
              <li>• Jangan bagikan password Anda kepada siapa pun</li>
              <li>• Ubah password secara berkala untuk keamanan maksimal</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
