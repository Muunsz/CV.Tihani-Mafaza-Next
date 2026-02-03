import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

const isDevelopment = process.env.NODE_ENV === "development";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  basePath: "/api/guest/auth",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
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
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
          include: { roles: true }
        })

        if (!user || !user.password_hash) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password_hash)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.full_name,
          image: user.avatar_url,
          role: user.roles.name,
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
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await prisma.users.findUnique({
            where: { email: user.email! },
            include: { roles: true }
          });

          if (!existingUser) {
            // Get customer role
            const customerRole = await prisma.roles.findUnique({
              where: { name: 'customer' }
            });

            if (!customerRole) {
              console.error('Customer role not found');
              return false;
            }

            // Create new user
            await prisma.users.create({
              data: {
                email: user.email!,
                full_name: user.name!,
                avatar_url: user.image,
                role_id: customerRole.id,
                is_active: true,
                email_verified: true,
              }
            });
          }

          return true;
        } catch (error) {
          console.error('Error handling Google sign in:', error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // Get user from database to include role
        const dbUser = await prisma.users.findUnique({
          where: { email: user.email! },
          include: { roles: true }
        });

        if (dbUser) {
          token.id = dbUser.id.toString();
          token.role = dbUser.roles.name;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
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
})
