import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create a matcher for protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  // Remove '/' from protected routes
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // <-- await here!
  
  if (isProtectedRoute(req)) {
    // Check for guest mode cookie
    const guestMode = req.cookies.get('guestMode')?.value === 'true';
    
    // Allow access if user is authenticated or in guest mode
    if (!userId && !guestMode) {
      // If neither authenticated nor guest mode, redirect to sign-in
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)'
  ],
};
