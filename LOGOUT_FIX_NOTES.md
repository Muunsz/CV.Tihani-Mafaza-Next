# Logout Fix Documentation

## Problem Analysis
Logout tidak berfungsi dengan benar karena:
1. Cookie configuration yang tidak konsisten antara development dan production
2. NextAuth cookies tidak di-clear dengan sempurna saat logout
3. Session state tidak ter-refresh setelah logout

## Solutions Implemented

### 1. NextAuth Configuration Fix (`/src/app/api/guest/auth/[...nextauth]/route.ts`)

**Cookie Configuration Improvement:**
- Menambahkan `trustHost: true` untuk production environments
- Explicit cookie configuration untuk semua NextAuth cookies:
  - `sessionToken` - Token session JWT
  - `callbackUrl` - Callback URL setelah login
  - `csrfToken` - CSRF protection token
- Domain configuration berdasarkan environment (dev vs production)
- Consistent `sameSite: "lax"` dan `secure` settings

**Key Changes:**
```typescript
cookies: {
  sessionToken: { /* ... */ },
  callbackUrl: { /* ... */ },
  csrfToken: { /* ... */ },
}
```

### 2. Navbar Component Enhancement (`/src/components/guest/layout/Navbar.tsx`)

**Added Logout Handler:**
```typescript
const [isLoggingOut, setIsLoggingOut] = useState(false);

const handleLogout = async () => {
  try {
    setIsLoggingOut(true);
    console.log("[LOGOUT] Starting logout process");
    
    const result = await signOut({
      redirect: true,
      callbackUrl: "/",
    });
    
    console.log("[LOGOUT] SignOut result:", result);
  } catch (error) {
    console.error("[LOGOUT] Error during logout:", error);
    window.location.href = "/";
  } finally {
    setIsLoggingOut(false);
  }
};
```

**Benefits:**
- Error handling dengan fallback manual redirect
- Loading state untuk mencegah double-click
- Debug logging untuk troubleshooting
- Diterapkan di semua logout buttons (desktop, mobile, mobile menu)

### 3. Logout API Route (`/src/app/api/guest/auth/logout/route.ts`)

**Improved Endpoint:**
```typescript
export async function POST(request: NextRequest) {
  // 1. Check active session
  // 2. Call signOut() untuk invalidate session
  // 3. Explicitly clear NextAuth cookies
  // 4. Return success response
}
```

**Cookie Clearing:**
- Otomatis mendeteksi environment (dev/production)
- Clear semua 3 NextAuth cookies:
  - session-token
  - callback-url
  - csrf-token
- Menggunakan `maxAge: 0` untuk menghapus cookie

## Testing Checklist

### Desktop Mode
- [ ] Login dengan email/password → redirect ke dashboard
- [ ] Login dengan Google → redirect ke dashboard
- [ ] Profile dropdown → Keluar button ada
- [ ] Click Keluar → redirect ke home page
- [ ] Session cleared → unauthenticated

### Mobile Mode
- [ ] Login dengan email/password → redirect ke dashboard
- [ ] Profile picture muncul di navbar (bukan Masuk/Daftar)
- [ ] Click profile picture → dropdown muncul
- [ ] Click Keluar → redirect ke home page
- [ ] Mobile menu logout → berfungsi dengan baik

### Mobile Menu
- [ ] Beranda link → navigasi ke home
- [ ] Menu items → dapat expand/collapse
- [ ] Keluar button di mobile menu → redirect to home

## Debug Logging

Enable console logs dengan prefix:
- `[LOGOUT]` - Logout flow di client
- `[LOGOUT_API]` - Logout API endpoint
- `[AUTH]` - Authentication callbacks
- `[GOOGLE_LOGIN]` - Google OAuth flow

Monitor browser console untuk:
- Message: "Starting logout process"
- Message: "SignOut result" dengan result object
- Error messages jika ada masalah

## Environment Variables Required

```
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000 (dev) atau https://yourdomain.com (prod)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_URL=your_database_url
NODE_ENV=development atau production
```

## Troubleshooting

### Issue: Still logged in after logout
**Solution:**
1. Check browser cookies - NextAuth cookies should be cleared
2. Hard refresh (Ctrl+F5) to clear cached session
3. Check console for [LOGOUT] logs
4. Verify NEXTAUTH_SECRET is set correctly

### Issue: Infinite redirect loop
**Solution:**
1. Check `callbackUrl` in signOut configuration
2. Verify middleware.ts routing is correct
3. Ensure `/` route is public and accessible

### Issue: Logout button not responding
**Solution:**
1. Check `isLoggingOut` state - should prevent multiple clicks
2. Verify NextAuth is properly configured
3. Check browser console for errors
4. Ensure signOut function is imported from correct location

## Files Modified
1. `/next.config.ts` - Turbopack root configuration
2. `/src/app/api/guest/auth/[...nextauth]/route.ts` - Cookie & session config
3. `/src/components/guest/layout/Navbar.tsx` - Logout handler & UI
4. `/src/app/api/guest/auth/logout/route.ts` - Logout API endpoint
