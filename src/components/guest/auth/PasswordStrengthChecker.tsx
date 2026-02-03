'use client';

import React from 'react';
import { CircularProgress, Card, CardBody } from '@heroui/react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthCheckerProps {
  password: string;
  showChecker?: boolean;
}

export function PasswordStrengthChecker({
  password,
  showChecker = true,
}: PasswordStrengthCheckerProps) {
  const calculateStrength = (pwd: string) => {
    let strength = 0;
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /\d/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    };

    Object.values(checks).forEach((check) => {
      if (check) strength++;
    });

    return { strength, checks };
  };

  const { strength, checks } = calculateStrength(password);

  const getStrengthLabel = () => {
    if (strength <= 1) return 'Sangat Lemah';
    if (strength === 2) return 'Lemah';
    if (strength === 3) return 'Sedang';
    if (strength === 4) return 'Kuat';
    return 'Sangat Kuat';
  };

  const getStrengthColor = () => {
    if (strength <= 1) return 'danger';
    if (strength === 2) return 'warning';
    if (strength === 3) return 'success';
    if (strength >= 4) return 'success';
    return 'default';
  };

  const getColorClass = () => {
    if (strength <= 1) return 'text-red-500';
    if (strength === 2) return 'text-orange-500';
    if (strength === 3) return 'text-yellow-500';
    return 'text-green-500';
  };

  if (!password || !showChecker) return null;

  return (
    <Card className="mt-4">
      <CardBody className="gap-4 p-4">
        <div className="flex items-center gap-4">
          <div>
            <CircularProgress
              aria-label="Password strength"
              size="lg"
              value={(strength / 5) * 100}
              color={getStrengthColor()}
              formatOptions={{ style: 'percent' }}
              showValueLabel={false}
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Kekuatan Password</p>
            <p className={`text-sm font-semibold ${getColorClass()}`}>
              {getStrengthLabel()}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {strength}/5 kriteria terpenuhi
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2 border-t pt-3">
          <div className="flex items-center gap-2">
            {checks.length ? (
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <span className={`text-sm ${checks.length ? 'text-green-700' : 'text-gray-600'}`}>
              Minimal 8 karakter
            </span>
          </div>

          <div className="flex items-center gap-2">
            {checks.uppercase ? (
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <span
              className={`text-sm ${checks.uppercase ? 'text-green-700' : 'text-gray-600'}`}
            >
              Huruf besar (A-Z)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {checks.lowercase ? (
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <span
              className={`text-sm ${checks.lowercase ? 'text-green-700' : 'text-gray-600'}`}
            >
              Huruf kecil (a-z)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {checks.numbers ? (
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <span className={`text-sm ${checks.numbers ? 'text-green-700' : 'text-gray-600'}`}>
              Angka (0-9)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {checks.special ? (
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <span className={`text-sm ${checks.special ? 'text-green-700' : 'text-gray-600'}`}>
              Karakter khusus (!@#$%^&*)
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
