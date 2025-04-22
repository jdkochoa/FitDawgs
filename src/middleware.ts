import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  console.log("Middleware active:", { isAuthenticated, pathname });

  const publicPaths = ["/", "/signup/name", "/signup/schedule", "/login"];

  // Redirect guests trying to access protected routes
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/calendar/:path*",
    "/add-workout/:path*",
    "/profile",
    "/calendar",
    "/add-workout",
  ],
};
