import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Password comparison function using bcrypt
async function comparePasswords(plain: string, hashed: string) {
  try {
    return await bcrypt.compare(plain, hashed);
  } catch (error) {
    console.error("[AUTH] Password comparison error:", error);
    return false;
  }
}

const isDevelopment = process.env.NODE_ENV === "development";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  basePath: "/api/guest/auth",
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: isDevelopment ? `next-auth.session-token` : `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: !isDevelopment,
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("[AUTH] Email or password missing");
            return null;
          }

          const user = await prisma.users.findUnique({
            where: { email: credentials.email },
            include: { roles: true }
          });

          if (!user || !user.password_hash) {
            console.log("[AUTH] User not found or password_hash missing");
            return null;
          }

          // Check if user is active
          if (!user.is_active) {
            console.log("[AUTH] User is inactive");
            return null;
          }

          const isPasswordValid = await comparePasswords(credentials.password, user.password_hash);

          if (!isPasswordValid) {
            console.log("[AUTH] Invalid password");
            return null;
          }

          // Update last login
          await prisma.users.update({
            where: { id: user.id },
            data: { last_login: new Date() }
          });

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.full_name,
            image: user.avatar_url,
            role: user.roles?.name || 'guest',
          };
        } catch (error) {
          console.error("[AUTH] Authorize error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/guest/auth/login",
    error: "/guest/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          // Check if user exists
          const existingUser = await prisma.users.findUnique({
            where: { email: user.email! },
            include: { roles: true }
          });

          if (!existingUser) {
            // Get or create customer role
            let customerRole = await prisma.roles.findUnique({
              where: { name: 'customer' }
            });

            if (!customerRole) {
              customerRole = await prisma.roles.create({
                data: {
                  name: 'customer',
                  description: 'Customer role'
                }
              });
            }

            // Create new user from Google
            await prisma.users.create({
              data: {
                email: user.email!,
                full_name: user.name || user.email!.split('@')[0],
                avatar_url: user.image,
                role_id: customerRole.id,
                is_active: true,
                email_verified: true,
                password_hash: '', // No password for OAuth users
              }
            });

            console.log("[AUTH] New Google user created:", user.email);
          } else {
            // Update user if needed
            await prisma.users.update({
              where: { id: existingUser.id },
              data: {
                avatar_url: user.image || existingUser.avatar_url,
                is_active: true,
              }
            });
          }

          return true;
        }

        return true;
      } catch (error) {
        console.error('[AUTH] SignIn callback error:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
          token.role = user.role;
          token.email = user.email;
        } else if (token.email) {
          // For subsequent requests, fetch fresh user data
          const dbUser = await prisma.users.findUnique({
            where: { email: token.email },
            include: { roles: true }
          });

          if (dbUser) {
            token.id = dbUser.id.toString();
            token.role = dbUser.roles?.name || 'guest';
          }
        }
      } catch (error) {
        console.error("[AUTH] JWT callback error:", error);
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
          session.user.email = token.email as string;
        }
      } catch (error) {
        console.error("[AUTH] Session callback error:", error);
      }
      return session;
    },
    async redirect({ url, baseUrl, user }) {
      // If callback URL is provided, use it
      if (url && url !== baseUrl) {
        try {
          // Only allow redirects to same origin
          const urlObj = new URL(url, baseUrl);
          if (urlObj.origin === baseUrl) {
            return url;
          }
        } catch {
          // Invalid URL, fall through to default redirect
        }
      }

      // Default redirect based on role after sign in
      if (user?.role) {
        switch (user.role) {
          case 'admin':
            return `${baseUrl}/admin/dashboard`;
          case 'staff':
            return `${baseUrl}/staff/dashboard`;
          case 'customer':
            return `${baseUrl}/customer/dashboard`;
          default:
            return `${baseUrl}`;
        }
      }

      return `${baseUrl}`;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        console.log("[AUTH_EVENTS] User signed out:", token?.email);
        // Clear any additional data if needed
      } catch (error) {
        console.error("[AUTH_EVENTS] SignOut error:", error);
      }
    },
  },
})
