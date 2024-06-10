import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { Adapter } from "next-auth/adapters";
import { userLogin } from "../../auth";
import { writeToLocalStorage } from "@/lib/localStorage";

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return;
        const { email, password } = credentials;
        try {
          const res = await userLogin(email, password);
          if (res.status === 200) {
            const user = res.data;
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    async jwt({ token, user, session, account }) {
      if (user) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        return {
          ...token,
          id: user.id,
          access_token: account?.access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        //@ts-ignore
        session.user.id = token.sub;
        //@ts-ignore
        session.access_token = token.access_token;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
