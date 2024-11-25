import { PrismaAdapter } from "@/lib/auth/prisma-adapter"
import NextAuth  from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { NextRequest } from "next/server"

async function auth(req: NextRequest) {
return {
  adapter: PrismaAdapter(req),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope:
          'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        },
      };
    },
  },
}
}
  
const handler = async (req: NextRequest, routeContext: { params: { nextauth: string[] } }): Promise<any> => {
return NextAuth(req, routeContext, await auth(req))
}

export { handler as GET, handler as POST }