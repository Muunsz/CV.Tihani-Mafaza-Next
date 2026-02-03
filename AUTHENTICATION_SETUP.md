# Authentication Setup Guide

## Overview
This guide covers the complete setup and testing of both credential-based (email/password) and Google OAuth authentication for the CV Tihani Mafaza Next.js application.

## Environment Variables Required

Create or update your `.env.local` file with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cv_database

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# CAPTCHA (if using)
CAPTCHA_SECRET_KEY=your_captcha_secret
```

## Authentication Flow

### 1. Login with Email & Password

**Flow:**
1. User enters email and password on login page
2. Form validates CAPTCHA
3. Credentials sent to `/api/guest/auth/callback/credentials`
4. NextAuth verifies password using bcrypt
5. On success, JWT token created with user role
6. User redirected to `/guest/auth/redirect`
7. Redirect page reads session and sends to appropriate dashboard

**Key Files:**
- `src/components/guest/auth/LoginForm.tsx` - Form component
- `src/app/api/guest/auth/[...nextauth]/route.ts` - NextAuth configuration
- `src/app/guest/auth/redirect/page.tsx` - Post-login redirect handler

### 2. Google OAuth Login

**Flow:**
1. User clicks "Masuk dengan Google" button
2. User redirected to Google consent screen
3. After authorization, user data returned to callback
4. NextAuth's signIn callback creates user if new, or updates if exists
5. User role automatically assigned as "customer" for new users
6. JWT token created with role
7. User redirected to `/guest/auth/redirect`
8. Appropriate dashboard shown based on role

**Key Files:**
- `src/components/guest/auth/LoginForm.tsx` - Google sign-in button
- `src/app/api/guest/auth/[...nextauth]/route.ts` - Google OAuth handler

## Database Schema Requirements

The authentication system requires these tables:

### users table
```sql
- id (PRIMARY KEY)
- email (UNIQUE)
- password_hash (nullable for OAuth users)
- full_name
- avatar_url
- role_id (FOREIGN KEY to roles)
- is_active
- email_verified
- email_verified_at
- last_login
- created_at
- updated_at
```

### roles table
```sql
- id (PRIMARY KEY)
- name (UNIQUE)
- description
- permissions (JSON, optional)
- created_at
- updated_at
```

### Required Roles
- `admin` - Full system access
- `staff` - Staff dashboard access
- `customer` - Customer dashboard access (default for Google OAuth)
- `guest` - Limited guest access

## Session Management

### Session Storage
- **Strategy:** JWT (not database sessions)
- **Max Age:** 30 days
- **Update Age:** 24 hours
- **Cookie:** Secure, httpOnly, sameSite=lax

### Available Session Data
```typescript
session.user = {
  id: string,
  email: string,
  name: string,
  image?: string,
  role: 'admin' | 'staff' | 'customer' | 'guest'
}
```

## API Endpoints

### NextAuth Built-in Endpoints
- `GET /api/guest/auth/signin` - Sign-in page
- `POST /api/guest/auth/callback/credentials` - Credentials callback
- `GET /api/guest/auth/callback/google` - Google OAuth callback
- `GET /api/guest/auth/session` - Get current session

### Custom API Endpoints
- `GET /api/guest/user-session` - Get current user session with role (alternative to built-in)

## Testing Checklist

### Before Testing
- [ ] Database configured and migrated
- [ ] Environment variables set
- [ ] NextAuth secret generated
- [ ] Google OAuth credentials configured
- [ ] User accounts created in database

### Credential Login Testing
```bash
# 1. Navigate to login page
http://localhost:3000/guest/auth/login

# 2. Test with valid credentials
Email: test@example.com
Password: correct_password

# 3. Verify redirect to correct dashboard
# Should redirect to /customer/dashboard (or role-appropriate dashboard)

# 4. Test with invalid password
Email: test@example.com
Password: wrong_password
# Should show: "Email atau password salah"

# 5. Test with non-existent email
Email: nonexistent@example.com
Password: any_password
# Should show: "Email atau password salah"
```

### Google OAuth Testing
```bash
# 1. Click "Masuk dengan Google" button
# 2. Complete Google consent flow
# 3. Should create user with customer role if new
# 4. Should redirect to /customer/dashboard

# 5. Login again with same Google account
# Should not show consent screen again (already authenticated)
# Should still have customer role
```

### Session Testing
```bash
# Get current session in browser console:
const session = await fetch('/api/guest/auth/session').then(r => r.json())
console.log(session)

# Should show user data with role
```

### Role-Based Redirect Testing
| Role | Expected Redirect |
|------|-------------------|
| admin | /admin/dashboard |
| staff | /staff/dashboard |
| customer | /customer/dashboard |
| guest | /guest/dashboard |

## Common Issues & Solutions

### Issue: "Email atau password salah" even with correct password
**Solution:**
- Verify password is hashed with bcrypt in database
- Check password_hash column has value
- Ensure user.is_active = true
- Check console logs for "[AUTH]" prefix messages

### Issue: Google OAuth shows error
**Solution:**
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local
- Check Google Console project has correct redirect URIs:
  - `http://localhost:3000/api/guest/auth/callback/google`
  - Production: `https://yourdomain.com/api/guest/auth/callback/google`

### Issue: Session not persisting after login
**Solution:**
- Check browser cookies for `next-auth.session-token`
- Verify NEXTAUTH_SECRET is set
- Check browser console for CORS or network errors
- Try incognito/private mode

### Issue: Blank page after login instead of redirect
**Solution:**
- Check browser console for JavaScript errors
- Verify user.role is set in database
- Check [REDIRECT] logs in server console
- Ensure dashboard routes exist and are accessible

## Debugging

All authentication events log with prefixes for easy debugging:

```javascript
// In browser console or server logs:
[LOGIN] - Credential login events
[GOOGLE_LOGIN] - Google OAuth events  
[AUTH] - General NextAuth events
[REDIRECT] - Post-login redirect events
[USER_SESSION] - Session API calls
```

Enable detailed logging by checking server console during login process.

## Password Hashing

Passwords must be hashed with bcrypt before storing:

```typescript
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash(plainPassword, 10);
// Store hashedPassword in database
```

## Security Notes

1. **Never store plain passwords** - Always use bcrypt hashing
2. **NEXTAUTH_SECRET** - Generate secure random string:
   ```bash
   openssl rand -base64 32
   ```
3. **Secure cookies** - httpOnly cookies prevent XSS attacks
4. **CAPTCHA** - Prevents brute force attacks on login
5. **Role-based access** - Enforce on frontend and backend
6. **Password reset** - Should send secure token via email (not implemented yet)

## Next Steps

1. Test both login methods thoroughly
2. Implement password reset flow
3. Add email verification for new signups
4. Implement rate limiting on login attempts
5. Add 2FA for admin accounts
6. Setup production environment variables
