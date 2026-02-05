'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS } from '@/lib/constants';
import { ShoppingCart, AlertCircle } from 'lucide-react';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  onAddSuccess?: () => void;
}

export function AddToCartButton({ productId, productName, onAddSuccess }: AddToCartButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = async () => {
    // If not authenticated, show login prompt
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Add to cart API call
      console.log('Added to cart:', { productId, productName });
      
      if (onAddSuccess) {
        onAddSuccess();
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/auth/login?redirect=/products');
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full py-3 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        <ShoppingCart className="w-5 h-5" />
        {isLoading ? 'Menambahkan...' : 'Tambah ke Keranjang'}
      </button>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-bold text-gray-900">Masuk Terlebih Dahulu</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Anda harus masuk terlebih dahulu untuk menambahkan &quot;{productName}&quot; ke keranjang belanja Anda.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Lanjut Belanja
              </button>
              <button
                onClick={handleLoginRedirect}
                className="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition hover:shadow-lg"
                style={{ backgroundColor: COLORS.accent }}
              >
                Masuk Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
