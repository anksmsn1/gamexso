// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function will run for every request and check if the user is authenticated
export default withAuth(
  function middleware(req) {
    // If the user is not authenticated, redirect to the login page
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only authorize if a token exists
    },
  }
);

// Specify the protected routes here
export const config = {
  matcher: [
    "/Siteadmin/dashboard/:path*",
    "/Siteadmin/cmslist/:path*",
    "/Siteadmin/features/:path*",
    "/Siteadmin/games/:path*",
    "/Siteadmin/partners/:path*",
    "/Siteadmin/testimonials/:path*",

], // Replace with the routes you want to protect
};
