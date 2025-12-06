import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = [
  // '/user-profile',
  // '/loans',
  "/dashboardd",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // First, apply internationalization middleware
  const intlResponse = intlMiddleware(request);

  // Check if this is an auth page
  const isAuthPage = pathname.match(/^\/(ar|en)?\/auth\/(login|register)/);

  if (isAuthPage) {
    return intlResponse;
  }

  // Check if the current path matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) => {
    // Remove locale prefix from pathname for comparison
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
    return pathWithoutLocale.startsWith(route);
  });

  // Only check authentication for protected routes
  if (isProtectedRoute) {
    const authCookie = request.cookies.get("session_id");

    if (!authCookie) {
      // Get the locale from pathname or default to 'ar'
      const locale = pathname.match(/^\/(ar|en)/)?.[1] || "ar";
      // Redirect to login if not authenticated
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login`, request.url)
      );
    }
  }

  return intlResponse;
}

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
