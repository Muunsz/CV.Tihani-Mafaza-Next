import { NextResponse } from 'next/server';
import { getRecaptchaSiteKey } from '@/lib/recaptcha-config';

/**
 * GET /api/captcha/config
 * 
 * Returns reCAPTCHA configuration needed by client
 * 
 * Server-side only endpoint that safely provides the public site key
 * to client components without exposing environment variables.
 * 
 * Response:
 * {
 *   siteKey: string
 * }
 */

export async function GET() {
  try {
    const siteKey = await getRecaptchaSiteKey();

    return NextResponse.json({
      siteKey,
    });
  } catch (error) {
    console.error('[reCAPTCHA Config] Error:', error);
    return NextResponse.json(
      { error: 'Failed to get reCAPTCHA configuration' },
      { status: 500 }
    );
  }
}
