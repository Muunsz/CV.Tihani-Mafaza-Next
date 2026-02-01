import { useEffect, useState } from 'react';

/**
 * useRecaptchaSiteKey
 * 
 * Client-side hook to fetch reCAPTCHA site key from API
 * 
 * Usage:
 * ```typescript
 * 'use client';
 * import { useRecaptchaSiteKey } from '@/hooks/useRecaptchaSiteKey';
 * 
 * export function MyComponent() {
 *   const { siteKey, isLoading, error } = useRecaptchaSiteKey();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   
 *   return <ReCaptcha sitekey={siteKey} />;
 * }
 * ```
 */

export function useRecaptchaSiteKey() {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const response = await fetch('/api/captcha/config');

        if (!response.ok) {
          throw new Error('Failed to fetch reCAPTCHA configuration');
        }

        const data = await response.json();
        setSiteKey(data.siteKey);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        console.error('[reCAPTCHA] Error fetching site key:', message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteKey();
  }, []);

  return { siteKey, isLoading, error };
}
