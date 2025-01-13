"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import pool from "@/db";
import bcrypt from "bcrypt";

export type LoginState = {
	errors?: {
		email?: string[] | undefined;
		password?: string[] | undefined;
	},
	success?: boolean;
}

const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }).trim().toLowerCase(),
	password: z.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.trim()
});

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
	try {
		const result = loginSchema.safeParse(Object.fromEntries(formData));
		if (!result.success) {
			return {
				errors: result.error.flatten().fieldErrors
			};
		}

		const { email, password } = result.data;

		// Use a single generic error message for security
		const invalidCredentialsError = {
			errors: {
				email: ["Invalid email or password"]
			}
		};

		try {
			const userResult = await pool.query(
				"SELECT id, email, passhash FROM users WHERE email = $1",
				[email]
			);

			if (userResult.rows.length === 0) {
				return invalidCredentialsError;
			}

			const user = userResult.rows[0];
			const isPasswordCorrect = await bcrypt.compare(password, user.passhash);

			if (!isPasswordCorrect) {
				return invalidCredentialsError;
			}

			await createSession(user.id.toString());
			return { success: true };
		} catch (dbError) {
			console.error("Database error during login:", dbError);
			return {
				errors: {
					email: ["An error occurred during login. Please try again."]
				}
			};
		}
	} catch (error) {
		console.error("Unexpected error during login:", error);
		return {
			errors: {
				email: ["An unexpected error occurred. Please try again."]
			}
		};
	}
}

export async function logout() {
	await deleteSession();
	redirect("/login");
}
