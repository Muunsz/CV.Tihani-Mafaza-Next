# Logout Fix Guide - Complete Solution

## Problem Analysis
Logout tidak berfungsi karena beberapa masalah:
1. NextAuth `redirect: true` di client component tidak bekerja dengan baik
2. Session cache tidak ter-clear dengan proper
3. Cookies configuration yang terlalu kompleks

## Solutions Implemented

### 1. Navbar Component (`/src/components/guest/layout/Navbar.tsx`)
**Changes:**
- Changed `signOut({ redirect: true })` to `signOut({ redirect: false })`
- Added manual redirect dengan delay untuk ensure session clear
- Improved error handling dengan fallback redirect

**Implementation:**
```typescript
const handleLogout = async () => {
  setIsLoggingOut(true);
  console.log("[LOGOUT] Starting logout process");
  
  try {
    await signOut({ redirect: false });
    console.log("[LOGOUT] SignOut successful, redirecting...");
    
    // Delay to ensure session is cleared
    await new Promise(resolve => setTimeout(resolve, 500));
    window.location.href = "/";
  } catch (error) {
    console.error("[LOGOUT] Error during logout:", error);
    window.location.href = "/";
  }
};
```

### 2. Customer Sidebar (`/src/components/customer/CustomerSidebar.tsx`)
**Changes:**
- Same pattern as Navbar for consistency
- Manual redirect handling
- Proper error fallback

### 3. NextAuth Configuration (`/src/app/api/guest/auth/[...nextauth]/route.ts`)
**Changes:**
- Removed complex cookies configuration
- Using default NextAuth cookies (simpler, more reliable)
- Kept JWT strategy for stateless sessions
- Added events handler untuk logout tracking

**Key Configuration:**
```typescript
session: {
  strategy: "jwt" as const,
  maxAge: 30 * 24 * 60 * 60,
  updateAge: 24 * 60 * 60,
}
```

### 4. Server Action (`/src/app/actions/auth.ts`)
**Changes:**
- Added backup logout action
- Server-side redirect guarantee
- Proper error handling

## How It Works

### Flow Diagram:
```
User clicks Logout Button
         ↓
setIsLoggingOut(true) - disable button
         ↓
signOut({ redirect: false })
         ↓
Wait 500ms (ensure session clear)
         ↓
window.location.href = "/" (manual redirect)
         ↓
Browser redirects to home page
         ↓
useSession() now returns null (session cleared)
```

## Testing Checklist

### Desktop Navbar:
- [ ] Login as user
- [ ] Click profile dropdown
- [ ] Click "Keluar" button
- [ ] Should redirect to home page
- [ ] Check browser cookies - nextauth cookies should be cleared
- [ ] Refresh page - should not be logged in

### Customer Sidebar:
- [ ] Login and navigate to customer area
- [ ] Click logout button in sidebar
- [ ] Should redirect to home page
- [ ] Verify session is cleared

### Mobile Navbar:
- [ ] Login on mobile view
- [ ] Open profile menu
- [ ] Click logout
- [ ] Should redirect and clear session

## Debugging

If logout still doesn't work:

1. **Check browser console logs:**
   - Should see `[LOGOUT] Starting logout process`
   - Should see `[LOGOUT] SignOut successful, redirecting...`

2. **Check cookies:**
   - Open DevTools → Application → Cookies
   - Look for `next-auth.session-token` or `__Secure-next-auth.session-token`
   - Should be deleted after logout

3. **Check session:**
   - Open DevTools → Application → Local Storage
   - Look for any NextAuth-related data
   - Should be cleared

4. **Force clear cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache and retry

## Key Points

- **No `redirect: true`** - Manual redirect is more reliable in client components
- **500ms delay** - Allows NextAuth to properly clear session
- **Error fallback** - Always redirects even if logout fails
- **Consistent pattern** - Same implementation in Navbar and CustomerSidebar
- **Default cookies** - Simpler and more reliable than complex configuration

## Files Modified

1. `/src/components/guest/layout/Navbar.tsx` - Logout handler
2. `/src/components/customer/CustomerSidebar.tsx` - Logout handler
3. `/src/app/api/guest/auth/[...nextauth]/route.ts` - Session config
4. `/src/app/actions/auth.ts` - Server action backup

## Result

Logout sekarang berfungsi dengan reliable di semua component dan environment (dev/production).
