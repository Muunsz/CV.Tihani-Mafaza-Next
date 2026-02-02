import { LoginPageClient } from "./LoginPageClient";

export const metadata = {
  title: "Masuk - CV. Tihani Mafaza",
  description:
    "Masuk ke akun Anda untuk mengakses dashboard dan mengelola pesanan.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LoginPage() {
  return <LoginPageClient />;
}
