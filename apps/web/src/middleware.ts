import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === "/dashboard" && !req.nextauth.token?.isAdmin) {
      return new NextResponse("Your are not authorized!");
    }
  },

  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
  }
);

export const config = { matcher: ["/cart", "/order", "/payment", "/shipping", "/profile"] };
