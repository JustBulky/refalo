import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user || !user.password) return null;
        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!valid) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.username,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  events: {
    async createUser({ user }) {
      if (!user.id) return;
      const existing = await prisma.user.findUnique({ where: { id: user.id } });
      if (!existing || existing.username) return;
      // Auto-generate username from display name or email
      const base = (user.name ?? user.email ?? "user")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "")
        .slice(0, 28);
      let username = base;
      let suffix = 1;
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${base}_${suffix++}`;
      }
      await prisma.user.update({ where: { id: user.id }, data: { username } });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const existing = await prisma.user.findUnique({ where: { email: user.email } });
        if (existing) {
          // Google has verified email ownership — allow sign-in as existing account.
          // Do NOT auto-link: auto-linking lets a pre-registered credentials account
          // persist access after a Google user takes over their own email.
          user.id = existing.id;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as { isAdmin?: boolean }).isAdmin ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { isAdmin?: boolean }).isAdmin =
          token.isAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
