# Login System Fix - Documentation

## Changes Made

### 1. **NextAuth Configuration** (`/src/app/api/guest/auth/[...nextauth]/route.ts`)
- **Fixed password hashing**: Changed from SHA-256 to bcrypt for password comparison in credentials provider
- **Improved credentials provider**: Added active user check, last login tracking, and better error handling
- **Enhanced Google OAuth**: 
  - Auto-create customer role if missing
  - Auto-create user on first Google login
  - Update user avatar when logging in again
  - Better error logging
- **Fixed JWT callback**: Properly extracts and updates token with user role
- **Fixed session callback**: Ensures user role is included in session data
- **Added comprehensive error logging**: All auth steps are now logged with `[AUTH]` prefix for debugging

### 2. **LoginForm Component** (`/src/components/guest/auth/LoginForm.tsx`)
- **Improved normal login handler**:
  - Added detailed console logging with `[LOGIN]` prefix
  - Proper error state handling
  - Fetches session after login to verify user role
  - Redirects to correct dashboard based on role (admin, staff, customer, guest)
  
- **Improved Google login handler**:
  - Added detailed console logging with `[GOOGLE_LOGIN]` prefix
  - Includes callbackUrl for proper OAuth flow
  - Waits for session to be established (1 second)
  - Handles missing role gracefully (defaults to customer)
  - Better error messages

### 3. **Session Endpoint** (`/src/app/api/guest/auth/session/route.ts`) - NEW
- Created dedicated endpoint for fetching current user session
- Fetches fresh user data from database
- Returns user id, email, name, role, and avatar
- Handles missing users gracefully

### 4. **Auth Redirect Page** (`/src/app/guest/auth/redirect/page.tsx`)
- Updated to use correct session endpoint: `/api/guest/auth/session`
- Fixed dashboard redirect paths for all roles
- Added error logging and fallback redirect
- Improved loading state UI

### 5. **Next.js Configuration** (`/next.config.ts`)
- Added turbopack root configuration to fix build issues
- Keeps React Compiler enabled for performance

### 6. **Environment Variables** (`.env.example`) - NEW
- Created template for required environment variables
- Includes NextAuth secret and URL
- Includes Google OAuth credentials
- Includes database configuration

## Setup Instructions

### Prerequisites
1. Ensure PostgreSQL is running with the database `cv_tihani`
2. Run Prisma migrations: `npx prisma migrate dev`
3. Run Prisma seed: `npx prisma db seed`

### Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in required values:
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Set to `http://localhost:3000` for development
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Get from Google Cloud Console
   - `DATABASE_URL`: Your PostgreSQL connection string

### Testing Checklist

#### Normal Login (Email + Password)
- [ ] Navigate to `/guest/auth/login`
- [ ] Enter valid email and password
- [ ] Verify CAPTCHA
- [ ] Click "Masuk" button
- [ ] Check browser console for `[LOGIN]` logs
- [ ] Should redirect to correct dashboard based on role
- [ ] Check that last_login is updated in database

#### Google OAuth Login
- [ ] Click "Masuk dengan Google" button
- [ ] Complete Google authentication
- [ ] Check browser console for `[GOOGLE_LOGIN]` logs
- [ ] Should redirect to customer dashboard (or admin/staff if role assigned)
- [ ] Check that user was created if first time logging in
- [ ] Check that avatar is updated

#### Error Scenarios
- [ ] Wrong password: Should show "Email atau password salah"
- [ ] Non-existent user: Should show "Email atau password salah"
- [ ] Inactive user: Should show "Email atau password salah" (security)
- [ ] Missing CAPTCHA: Should show "Silakan verifikasi CAPTCHA terlebih dahulu"
- [ ] Network error during Google login: Should show "Gagal login dengan Google"

#### Session Management
- [ ] Login and check session via `/api/guest/auth/session`
- [ ] Verify role is correctly returned
- [ ] Check that JWT token contains user id and role
- [ ] Logout and verify session is cleared

## Database Schema Requirements

The following columns must exist in `users` table:
- `id`: UUID or Integer
- `email`: String (unique)
- `password_hash`: String (can be empty for OAuth users)
- `full_name`: String
- `avatar_url`: String (nullable)
- `is_active`: Boolean (default: true)
- `email_verified`: Boolean (default: false)
- `last_login`: Timestamp (nullable)
- `role_id`: Foreign key to roles table

The following columns must exist in `roles` table:
- `id`: UUID or Integer
- `name`: String (unique)
- `description`: String (nullable)

At minimum, these roles must exist:
- `admin`
- `staff`
- `customer`
- `guest` (optional)

## Debugging Tips

1. **Check console logs**: Look for `[AUTH]`, `[LOGIN]`, `[GOOGLE_LOGIN]`, or `[SESSION]` prefixes
2. **Check browser DevTools**: Network tab shows all API calls
3. **Check server logs**: Terminal shows backend logs
4. **Check database**: 
   - Verify user exists: `SELECT * FROM users WHERE email = 'your@email.com';`
   - Verify password hash matches: Compare with bcrypt hash
   - Verify role exists: `SELECT * FROM roles WHERE name = 'customer';`

## Common Issues and Solutions

### Issue: "Email atau password salah" even with correct credentials
**Solution**: 
- Check if password is hashed with bcrypt (not SHA-256)
- Check if user is_active = true
- Check if role exists in database

### Issue: Google login not creating user
**Solution**:
- Check if customer role exists
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Check NEXTAUTH_URL matches redirect URI in Google Cloud Console

### Issue: Redirect goes to wrong dashboard
**Solution**:
- Check user.role is correctly stored in database
- Check `/api/guest/auth/session` returns correct role
- Clear browser cookies and try again

### Issue: Build fails with Turbopack error
**Solution**:
- Ensure turbopack.root is set in next.config.ts
- Clear .next folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
