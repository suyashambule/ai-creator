import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create a matcher for protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  // Remove '/' from protected routes
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // <-- await here!

  if (isProtectedRoute(req) && !userId) {
    // If user is not authenticated, redirect to sign-in
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)'
  ],
};
