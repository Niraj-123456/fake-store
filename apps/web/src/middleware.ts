import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // return NextResponse.redirect(new URL("/", req.url));
  },
  {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
  }
);

export const config = { matcher: ["/cart"] };
