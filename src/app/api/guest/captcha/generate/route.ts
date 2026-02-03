import { NextRequest, NextResponse } from 'next/server';

// Global store - shared with verify endpoint
// In production, use Redis or database for distributed systems
declare global {
  var captchaStore: Map<string, { answer: string; timestamp: number }>;
}

if (!global.captchaStore) {
  global.captchaStore = new Map();
}

// Generate random CAPTCHA
function generateCaptchaCode(): string {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate SVG CAPTCHA
function generateSvgCaptcha(text: string): string {
  const width = 200;
  const height = 60;
  const fontSize = 32;

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Background
  svg += `<rect width="${width}" height="${height}" fill="#f0f0f0" />`;

  // Add noise lines
  for (let i = 0; i < 5; i++) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ccc" stroke-width="1" opacity="0.5" />`;
  }

  // Add noise dots
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 2 + 1;
    svg += `<circle cx="${x}" cy="${y}" r="${radius}" fill="#999" opacity="0.3" />`;
  }

  // Add text with rotation
  const textX = width / 2;
  const textY = height / 2 + fontSize / 3;

  svg += `<text x="${textX}" y="${textY}" font-size="${fontSize}" font-weight="bold" `;
  svg += `text-anchor="middle" fill="#0800ff" font-family="Arial, sans-serif" `;
  svg += `letter-spacing="8">${text}</text>`;

  svg += `</svg>`;

  return svg;
}

export async function POST(request: NextRequest) {
  try {
    const id = Math.random().toString(36).substr(2, 9);
    const code = generateCaptchaCode();
    const svg = generateSvgCaptcha(code);

    // Store CAPTCHA with 5 minute expiry
    global.captchaStore.set(id, {
      answer: code,
      timestamp: Date.now(),
    });

    // Clean up old entries
    for (const [key, value] of global.captchaStore.entries()) {
      if (Date.now() - value.timestamp > 5 * 60 * 1000) {
        global.captchaStore.delete(key);
      }
    }

    return NextResponse.json({ svg, id });
  } catch (error) {
    console.error('CAPTCHA generation error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat CAPTCHA' },
      { status: 500 }
    );
  }
}
