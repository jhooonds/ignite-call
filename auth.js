import NextAuth from "next-auth"
import { PrismaAdapter } from "./lib/auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import Google  from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope:
           'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
        },
      },
      profile(profile) {
         return {
          id: profile.sub,
          name: profile.name,
          username: '',
          email: profile.email,
          avatar_url: profile.picture
         } 
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes('https://www.googleapis.com/auth/calendar')) {
        return Promise.resolve('/register/connect-calendar?error=permissions');
      }
      return true;
    },
    async session({ session, user }) {
      return {
        ...session,
        user,
      };
    },
  },
})