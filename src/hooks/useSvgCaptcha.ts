'use client';

import { useState, useCallback } from 'react';

export interface CaptchaData {
  svg: string;
  id: string;
}

export function useSvgCaptcha() {
  const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // Generate new CAPTCHA
  const generateCaptcha = useCallback(async () => {
    try {
      const response = await fetch('/api/captcha/generate', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate CAPTCHA');
      }

      const data = await response.json();
      setCaptchaData(data);
      setUserInput('');
      setIsVerified(false);
      setError('');
    } catch (err) {
      setError('Gagal membuat CAPTCHA');
      console.error(err);
    }
  }, []);

  // Verify CAPTCHA
  const verifyCaptcha = useCallback(
    async (inputValue: string) => {
      if (!captchaData) {
        setError('CAPTCHA belum dibuat');
        return false;
      }

      try {
        const response = await fetch('/api/captcha/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: captchaData.id,
            answer: inputValue,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setIsVerified(true);
          setError('');
          return true;
        } else {
          setError(data.message || 'CAPTCHA tidak sesuai, silakan coba lagi');
          setIsVerified(false);
          return false;
        }
      } catch (err) {
        setError('Gagal memverifikasi CAPTCHA');
        console.error(err);
        return false;
      }
    },
    [captchaData]
  );

  // Reset
  const reset = useCallback(() => {
    setUserInput('');
    setIsVerified(false);
    setError('');
    generateCaptcha();
  }, [generateCaptcha]);

  return {
    captchaData,
    userInput,
    setUserInput,
    isVerified,
    error,
    generateCaptcha,
    verifyCaptcha,
    reset,
  };
}
