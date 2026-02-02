'use server';

/**
 * reCAPTCHA Configuration - SERVER ONLY
 * 
 * IMPORTANT SECURITY NOTES:
 * - NEXT_PUBLIC_RECAPTCHA_SITE_KEY: Public key, but should be fetched via API
 * - RECAPTCHA_SECRET_KEY: Private key, MUST NEVER be exposed to client
 *                         Use only in server-side API routes
 * 
 * This file is 'use server' to ensure environment variables are never leaked to client.
 * Client code should fetch the site key via /api/captcha/config endpoint.
 */

/**
 * Server Action: Get the reCAPTCHA site key
 * Use this only in Server Components or API Routes
 */
export async function getRecaptchaSiteKey(): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    // Fallback to test key for development (works in localhost only)
    console.warn(
      '[reCAPTCHA] Warning: NEXT_PUBLIC_RECAPTCHA_SITE_KEY not set. Using test key. ' +
      'Set env variable for production.'
    );
    return '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  }

  return siteKey;
}

/**
 * Server Action: Get the reCAPTCHA secret key
 * NEVER expose this to the client - for server use only
 */
export async function getRecaptchaSecretKey(): Promise<string> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      '[reCAPTCHA] Error: RECAPTCHA_SECRET_KEY is not configured. ' +
      'Set this in your server environment variables (.env.local or .env).'
    );
  }

  return secretKey;
}

/**
 * Server Action: Verify reCAPTCHA token
 * This should be called from API routes only - never from client
 */
export async function verifyRecaptchaToken(token: string): Promise<{
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
}> {
  const secretKey = await getRecaptchaSecretKey();

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    if (!response.ok) {
      throw new Error(`reCAPTCHA API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[reCAPTCHA] Verification error:', error);
    return {
      success: false,
      error_codes: ['verification_failed'],
    };
  }
}
