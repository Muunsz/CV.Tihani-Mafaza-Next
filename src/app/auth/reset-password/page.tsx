import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const metadata = {
  title: 'Reset Password - CV. Tihani Mafaza',
  description: 'Reset password Anda dengan memasukkan password baru.',
};

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
            <ResetPasswordForm token={searchParams.token} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
