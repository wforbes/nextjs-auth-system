import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isAuthRoute = authRoutes.includes(path);

	const cookie = (await cookies()).get("session")?.value;
	const session = await decrypt(cookie);

	// on routing to protected page(s) when user is not logged in,
	// redirect to login page
	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	// on routing to auth page(s) when user is logged in,
	// 	redirect to dashboard by default
	if (isAuthRoute && session?.userId) {
		return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
	}

	return NextResponse.next();
}
