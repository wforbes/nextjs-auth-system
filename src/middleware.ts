import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

// Routes that require authentication
const protectedRoutes = ["/dashboard"];
// Routes that are only accessible when not authenticated
const authRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isAuthRoute = authRoutes.includes(path);

	// If the route doesn't need auth checking, continue
	if (!isProtectedRoute && !isAuthRoute) {
		return NextResponse.next();
	}

	// Get and verify session
	const cookie = (await cookies()).get("session")?.value;
	const session = await decrypt(cookie);
	console.log(session);
	const isAuthenticated = !!session?.userId;

	// Redirect authenticated users away from auth routes
	if (isAuthRoute && isAuthenticated) {
		return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
	}

	// Redirect unauthenticated users away from protected routes
	if (isProtectedRoute && !isAuthenticated) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
