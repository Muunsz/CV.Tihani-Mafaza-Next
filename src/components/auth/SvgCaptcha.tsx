"use client";

import React from "react";
import { useEffect } from "react";
import { useSvgCaptcha } from "@/hooks/useSvgCaptcha";
import { COLORS } from "@/lib/constants";
import { RefreshCw } from "lucide-react";
import { Input, Button } from "@heroui/react";

interface SvgCaptchaProps {
  onVerified: (verified: boolean) => void;
  onInputChange: (value: string) => void;
  inputValue: string;
}

export function SvgCaptcha({
  onVerified,
  onInputChange,
  inputValue,
}: SvgCaptchaProps) {
  const {
    captchaData,
    userInput,
    setUserInput,
    isVerified,
    error,
    generateCaptcha,
    verifyCaptcha,
  } = useSvgCaptcha();

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    onInputChange(value);
  };

  const handleVerify = async () => {
    const result = await verifyCaptcha(userInput);
    onVerified(result);
  };

  const handleRefresh = () => {
    generateCaptcha();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* CAPTCHA SVG Display */}
        {captchaData && (
          <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2 border border-gray-300 flex items-center justify-center">
            <div
              dangerouslySetInnerHTML={{ __html: captchaData.svg }}
              className="w-full"
            />
          </div>
        )}

        {/* Refresh Button */}
        <Button
          onClick={handleRefresh}
          type="button"
          isIconOnly
          variant="bordered"
          size="lg"
          className="text-gray-700"
          title="Refresh CAPTCHA"
        >
          <RefreshCw size={20} />
        </Button>
      </div>

      {/* Input Field */}
      <div>
        <Input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Masukkan 4 angka"
          maxLength={4}
          label="Masukkan kode CAPTCHA di atas"
          variant="bordered"
          size="lg"
          className="w-full"
        />
      </div>

      {/* Verify Button */}
      <Button
        onClick={handleVerify}
        type="button"
        size="lg"
        className="w-full text-white font-semibold"
        style={{ backgroundColor: COLORS.accent }}
      >
        Verifikasi CAPTCHA
      </Button>

      {/* Status Messages */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {isVerified && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
          <p className="text-sm text-green-700">
            CAPTCHA terverifikasi dengan baik!
          </p>
        </div>
      )}
    </div>
  );
}
