import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/captcha/verify
 * 
 * SERVER-SIDE CAPTCHA VERIFICATION ENDPOINT
 * 
 * Security Features:
 * ✅ Server-side verification (cannot be bypassed by client manipulation)
 * ✅ Automatic expiration (5 minutes)
 * ✅ One-time use (deleted after verification)
 * ✅ No sensitive data in client
 * 
 * Production Deployment:
 * - Replace global Map with Redis for distributed systems
 * - Add rate limiting to prevent brute force
 * - Consider using reCAPTCHA v3 for better UX/security balance
 */

// Global store - shared with generate endpoint
// In production, use Redis or database for distributed systems
declare global {
  var captchaStore: Map<string, { answer: string; timestamp: number }>;
}

if (!global.captchaStore) {
  global.captchaStore = new Map();
}

export async function POST(request: NextRequest) {
  try {
    const { id, answer } = await request.json();

    if (!id || !answer) {
      return NextResponse.json(
        { success: false, message: 'ID dan jawaban harus diisi' },
        { status: 400 }
      );
    }

    const storedCaptcha = global.captchaStore.get(id);

    if (!storedCaptcha) {
      return NextResponse.json(
        { success: false, message: 'CAPTCHA tidak valid atau sudah expired' },
        { status: 400 }
      );
    }

    // Check if CAPTCHA is expired (5 minutes)
    if (Date.now() - storedCaptcha.timestamp > 5 * 60 * 1000) {
      global.captchaStore.delete(id);
      return NextResponse.json(
        { success: false, message: 'CAPTCHA sudah expired, silakan muat ulang' },
        { status: 400 }
      );
    }

    // Verify answer
    const isCorrect = answer.trim() === storedCaptcha.answer;

    if (isCorrect) {
      // Delete CAPTCHA after successful verification
      global.captchaStore.delete(id);
      return NextResponse.json({
        success: true,
        message: 'CAPTCHA berhasil diverifikasi',
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'CAPTCHA tidak sesuai, silakan coba lagi' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal memverifikasi CAPTCHA' },
      { status: 500 }
    );
  }
}
