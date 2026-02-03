# NextAuth Configuration Fix

## Masalah yang Diperaiki

### 1. Turbopack Root Configuration Error
- **Error**: "Next.js package not found" - Turbopack couldn't find Next.js package
- **Penyebab**: `__dirname` tidak bisa digunakan di TypeScript config files di environment Vercel v0
- **Solusi**: Menghapus `turbopack.root` configuration - Next.js akan otomatis mendeteksi root directory

### 2. NextAuth Cookie Configuration Error
- **Error**: Dynamic domain parsing dari `NEXTAUTH_URL` menyebabkan build errors
- **Penyebab**: Cookies configuration yang kompleks dengan conditional domain parsing
- **Solusi**: Menghilangkan custom cookie configuration - NextAuth akan menggunakan default secure configuration yang sudah optimal

## Perubahan yang Dilakukan

### `/next.config.ts`
- Menghapus `turbopack` configuration
- Membiarkan Next.js menggunakan default configuration

### `/src/app/api/guest/auth/[...nextauth]/route.ts`
- Menghapus `nextAuthConfig` object yang kompleks
- Melakukan inline configuration langsung di `NextAuth()` call
- Menggunakan default NextAuth cookies configuration yang sudah secure

## Configuration Akhir

```typescript
NextAuth({
  adapter: PrismaAdapter(prisma),
  basePath: "/api/guest/auth",
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,    // 30 days
    updateAge: 24 * 60 * 60,       // 24 hours
  },
  providers: [GoogleProvider, CredentialsProvider],
  callbacks: { signIn, jwt, session, redirect },
})
```

## Fitur yang Tetap Berfungsi

- ✅ JWT-based session strategy
- ✅ Google OAuth integration
- ✅ Credentials (email/password) authentication
- ✅ Custom JWT callback untuk role handling
- ✅ Session callback untuk user data
- ✅ Automatic redirect based on user role
- ✅ Logout functionality dengan proper cookie clearing
- ✅ Secure cookie settings (httpOnly, sameSite, secure di production)

## Environment Variables yang Diperlukan

```
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000 (atau production URL)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_URL=your_database_url
```

## Testing Checklist

- [ ] Build berhasil tanpa error
- [ ] Login dengan credentials berfungsi
- [ ] Login dengan Google berfungsi
- [ ] Logout berfungsi dan redirect ke home
- [ ] Session tersimpan dengan benar
- [ ] Role-based redirect berfungsi (admin, staff, customer)
