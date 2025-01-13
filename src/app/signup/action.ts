"use server";

import { z } from "zod";
import pool from "@/db";
import bcrypt from "bcrypt";

export type SignupState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  }
}

const signupSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(64, { message: "Username must be less than 64 characters" })
    .trim(),
  email: z.string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export async function signup(prevState: SignupState, formData: FormData) {
  try {
    // Validate form data
    const result = signupSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors
      };
    }

    const { username, email, password } = result.data;

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return {
        errors: {
          email: ["User with this email or username already exists"]
        }
      };
    }

    // Hash password
    const saltRounds = 10;
    const passhash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    await pool.query(
      'INSERT INTO users (username, email, passhash) VALUES ($1, $2, $3)',
      [username, email, passhash]
    );

    // Instead of redirecting immediately, return a success state
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      errors: {
        email: ["An error occurred while creating your account. Please try again."]
      }
    };
  }
} 