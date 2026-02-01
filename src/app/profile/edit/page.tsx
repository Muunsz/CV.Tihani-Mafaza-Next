import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EditProfileForm } from '@/components/profile/EditProfileForm';
import { COLORS } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Edit Profil - CV. Tihani Mafaza',
  description: 'Edit informasi profil Anda',
};

export default function EditProfilePage() {
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
              Edit Profil
            </h1>
            <p className="text-gray-600">
              Perbarui informasi profil Anda di sini
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
            <EditProfileForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
