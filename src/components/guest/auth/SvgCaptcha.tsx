"use client";

import React from "react";
import { useEffect } from "react";
import { useSvgCaptcha } from "@/hooks/useSvgCaptcha";
import { COLORS } from "@/lib/constants";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

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
  } = useSvgCaptcha("/api/guest/captcha/generate", "/api/guest/captcha/verify");

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 4);
    setUserInput(value);
    onInputChange(value);
  };

  const handleVerify = async () => {
    const result = await verifyCaptcha(userInput);
    onVerified(result);
  };

  const handleRefresh = () => {
    generateCaptcha();
    setUserInput("");
    onInputChange("");
  };

  return (
    <div className="space-y-4">
      {/* CAPTCHA Title */}
      <div>
        <label className="block text-sm font-semibold mb-3" style={{ color: COLORS.primary }}>
          Verifikasi CAPTCHA
        </label>
        <p className="text-xs text-gray-600">
          Masukkan kode dari gambar di bawah untuk melanjutkan
        </p>
      </div>

      {/* CAPTCHA Container */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {/* CAPTCHA SVG Display */}
        <div className="flex-1 relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 p-3 flex items-center justify-center min-h-20 sm:min-h-auto">
          {captchaData ? (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                width="100%"
                height="60"
                dangerouslySetInnerHTML={{ __html: captchaData.svg }}
                style={{ maxWidth: "200px", margin: "0 auto" }}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Memuat CAPTCHA...</p>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          type="button"
          className="p-3 rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition duration-200 flex items-center justify-center"
          title="Refresh CAPTCHA"
          style={{ borderColor: COLORS.accent + "40" }}
        >
          <RefreshCw size={24} style={{ color: COLORS.accent }} />
        </button>
      </div>

      {/* Input Field */}
      <div className="flex flex-col gap-2">
        <input
          id="captcha-input"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Masukkan 4 karakter"
          maxLength={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition text-center text-lg font-bold tracking-widest"
          style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
        />
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        type="button"
        disabled={userInput.length < 4 || isVerified}
        className="w-full py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        {isVerified ? "CAPTCHA Sudah Terverifikasi" : "Verifikasi CAPTCHA"}
      </button>

      {/* Error Message */}
      {error && !isVerified && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {isVerified && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex gap-3">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-700">
              CAPTCHA Terverifikasi
            </p>
            <p className="text-xs text-green-600">
              Anda dapat melanjutkan proses pendaftaran
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
