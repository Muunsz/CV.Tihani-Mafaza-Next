'use client';

import { useRouter } from 'next/navigation';
import { Button, Card, CardBody } from '@heroui/react';
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { COLORS } from '@/lib/constants';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardBody className="text-center py-12 px-8">
          <div className="mb-6">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#FF6B6B20' }}
            >
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-2">500</h1>
          <p className="text-xl font-semibold text-gray-900 mb-2">
            Terjadi Kesalahan
          </p>
          <p className="text-gray-600 mb-2">
            Maaf, terjadi kesalahan pada server kami.
          </p>
          {error.message && (
            <p className="text-sm text-gray-500 mb-8 break-words">
              ({error.message})
            </p>
          )}

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full text-white font-semibold"
              style={{ backgroundColor: COLORS.primary }}
              startContent={<ArrowLeft className="w-5 h-5" />}
              onPress={() => router.back()}
            >
              Kembali ke Halaman Sebelumnya
            </Button>
            <Button
              size="lg"
              className="w-full text-white font-semibold"
              style={{ backgroundColor: COLORS.accent }}
              startContent={<RefreshCw className="w-5 h-5" />}
              onPress={reset}
            >
              Coba Lagi
            </Button>
            <Link href="/" className="block">
              <Button
                size="lg"
                variant="bordered"
                className="w-full"
                startContent={<Home className="w-5 h-5" />}
              >
                Kembali ke Beranda
              </Button>
            </Link>
          </div>

          <hr className="my-6" />

          <p className="text-xs text-gray-600">
            Error ID: {error.digest || 'N/A'}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
