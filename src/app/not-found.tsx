import Link from 'next/link';
import { Button, Card, CardBody } from '@heroui/react';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { COLORS } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardBody className="text-center py-12 px-8">
          <div className="mb-6">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${COLORS.accent}20` }}
            >
              <AlertCircle className="w-8 h-8" style={{ color: COLORS.accent }} />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl font-semibold text-gray-900 mb-2">
            Halaman Tidak Ditemukan
          </p>
          <p className="text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah
            dihapus atau URL yang Anda masukkan salah.
          </p>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button
                size="lg"
                className="w-full text-white font-semibold"
                style={{ backgroundColor: COLORS.primary }}
                startContent={<Home className="w-5 h-5" />}
              >
                Kembali ke Beranda
              </Button>
            </Link>
            <Button
              size="lg"
              variant="bordered"
              className="w-full"
              startContent={<ArrowLeft className="w-5 h-5" />}
            >
              Kembali
            </Button>
          </div>

          <hr className="my-6" />

          <p className="text-sm text-gray-600 mb-4">Atau coba:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/products">
              <Button size="sm" variant="light">
                Produk
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" variant="light">
                Kontak
              </Button>
            </Link>
            <Link href="/faq">
              <Button size="sm" variant="light">
                FAQ
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
