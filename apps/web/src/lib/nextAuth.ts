import { login, refresh } from "@/app/api/auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import clientPromise from "./mongodb";

async function refreshAccessToken(token: any) {
  console.log("refresh token", token);
  try {
    const res = await refresh(token.refresh_token);

    if (res.status !== 200) {
      throw res.data;
    }

    const refreshedTokens = res.data;

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
          console.log("login res", res);
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
    async jwt({ token, user, account }) {
      console.log("token", token);
      console.log("JWT Callback Triggered", {
        hasUser: !!user,
        hasAccount: !!account,
        expiry: token.accessTokenExpires,
        now: Date.now(),
      });

      // Initial sign in
      if (user && account) {
        return {
          ...token,
          id: user.id,
          access_token: account.access_token
            ? account.access_token
            : //@ts-ignore
              user?.access_token,
          refresh_token: account.refresh_token
            ? account.refresh_token
            : //@ts-ignore
              user?.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      //@ts-ignore
      if (Date.now() < token.expiresAt) {
        return token;
      }

      // Access token has expired, try to update it
      console.log("Token Expired - Triggering Refresh");
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      console.log("session", session);
      if (session && session.user) {
        //@ts-ignore
        session.user = token.user || session.user;
        //@ts-ignore
        session.access_token = token.access_token;
        //@ts-ignore
        session.refresh_token = token.refresh_token;
        //@ts-ignore
        session.error = token.error;
      }
      return session;
    },
  },
};
