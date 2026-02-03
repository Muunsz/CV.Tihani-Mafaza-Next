'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import { AlertCircle, LogIn } from 'lucide-react';
import { COLORS } from '@/lib/constants';

export function CartProtectionModal() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLoginClick = () => {
    router.push('/auth/login');
    onOpenChange();
  };

  const handleRegisterClick = () => {
    router.push('/auth/register');
    onOpenChange();
  };

  return (
    <>
      {/* Modal for login protection */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Masuk Terlebih Dahulu
            </div>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-600">
              Untuk menambahkan produk ke keranjang, Anda harus masuk terlebih dahulu.
              Jika belum memiliki akun, silakan daftar sekarang.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onOpenChange}>
              Batal
            </Button>
            <Button
              className="text-white"
              style={{ backgroundColor: COLORS.accent }}
              startContent={<LogIn className="w-4 h-4" />}
              onPress={handleLoginClick}
            >
              Masuk
            </Button>
            <Button
              className="text-white"
              style={{ backgroundColor: COLORS.primary }}
              onPress={handleRegisterClick}
            >
              Daftar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Export open function */}
      <div data-cart-modal-trigger style={{ display: 'none' }} onClick={onOpen}>
        open
      </div>
    </>
  );
}

// Export hook untuk trigger modal
export function useCartProtection() {
  const handleCartClick = () => {
    const trigger = document.querySelector('[data-cart-modal-trigger]');
    if (trigger) {
      (trigger as HTMLElement).click();
    }
  };

  return { handleCartClick };
}
