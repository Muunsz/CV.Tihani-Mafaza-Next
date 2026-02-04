import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ClientProvider } from "@/components/shared/providers/ClientProvider";
import { FloatingActionButton } from "@/components/guest/layout/FloatingActionButton";
import { validateEnv } from "@/lib/env";
import "./globals.css";

// Validate environment variables at startup
validateEnv();

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV. Tihani Mafaza - Penyedia Barang & Jasa Profesional",
  description:
    "Kepuasan Anda adalah Prestasi Kami. Penyedia barang & jasa berkualitas dengan harga transparan, layanan 24 jam, dan pengalaman lebih dari 15 tahun melayani institusi di Bandung.",
  generator: "v0.app",
  keywords: [
    "Tihani Mafaza",
    "Pengadaan Barang",
    "Penyedia Jasa",
    "Bandung",
    "Sekolah",
    "Konstruksi",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${_geist.className} font-sans antialiased`}>
        <ClientProvider>
          {children}
          <FloatingActionButton />
        </ClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
