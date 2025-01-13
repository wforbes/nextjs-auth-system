import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
	throw new Error("SESSION_SECRET environment variable is not set");
}
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
	userId: string;
	expiresAt: Date;
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt });
	(await cookies()).set("session", session, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		expires: expiresAt,
		sameSite: "lax"
	});
}

export async function deleteSession() {
	(await cookies()).delete("session");
}

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);
}

export async function decrypt(session: string | undefined) {
	if (!session) {
		return null;
	}

	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		// Invalid or expired token
		console.error("Failed to verify session:", error);
		return null;
	}
}
