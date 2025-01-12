"use server";

import { z } from "zod";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";

export type LoginState = {
	errors?: {
		email?: string[];
		password?: string[];
	}
}

const testUser = {
	id: "1",
	email: "will@wforbes.net",
	password: "12345678"
};

const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }).trim().toLowerCase(),
	password: z.string()
	.min(8, { message: "Password must be at least 8 characters" })
	.trim()
});

export async function login(prevState: LoginState, formData: FormData) {
	const result = loginSchema.safeParse(Object.fromEntries(formData));
	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors
		};
	}

	const { email, password } = result.data;

	if (email !== testUser.email || password !== testUser.password) {
		return {
			errors: {
				email: ["Invalid email or password"]
			}
		};
	}

	await createSession(testUser.id);

	redirect("/dashboard");
}

export async function logout() { }
