import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { ForgotPasswordForm } from "@/components/guest/auth/ForgotPasswordForm";
import { COLORS } from "@/lib/constants";

export const metadata = {
  title: "Lupa Password - CV. Tihani Mafaza",
  description: "Reset password Anda dengan memasukkan email yang terdaftar.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
            <ForgotPasswordForm />
          </div>

          {/* Help Text */}
          <div
            className="mt-8 p-4 rounded-lg"
            style={{ backgroundColor: `${COLORS.primary}10` }}
          >
            <p className="text-sm text-gray-700">
              <strong>Butuh bantuan?</strong> Hubungi tim support kami di{" "}
              <a
                href="mailto:support@tihani.com"
                className="hover:underline"
                style={{ color: COLORS.accent }}
              >
                support@tihani.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
