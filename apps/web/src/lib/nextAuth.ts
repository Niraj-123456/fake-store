import { login } from "@/app/api/auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import clientPromise from "./mongodb";

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
        console.log("credentials", credentials);
        const { email, password } = credentials;
        try {
          const res = await login(email, password);
          if (res.status === 200) {
            const user = res.data;
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log("error 36", error);
          throw error;
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
          access_token: account?.access_token
            ? account.access_token
            : //@ts-ignore
              user?.access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        //@ts-ignore
        session.user.id = token.sub as string;
        //@ts-ignore
        session.access_token = token.access_token;
      }
      return session;
    },
  },
};
