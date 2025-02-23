"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, LoginState } from "./action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LoginForm() {
	const [state, loginAction] = useActionState(login, { errors: {} } as LoginState);
	const router = useRouter();

	useEffect(() => {
		if (state && 'success' in state && state.success) {
			router.push('/dashboard');
		}
	}, [state, router]);

	return (
		<form action={loginAction} className="flex flex-col gap-4 w-full max-w-md mx-auto p-10">
			<div className="flex flex-col gap-2">
				<input 
					id="email" 
					name="email" 
					type="email" 
					placeholder="Email"
				/>
				{state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email.join(", ")}</p>}
			</div>
			
			<div className="flex flex-col gap-2">
				<input 
					id="password" 
					name="password" 
					type="password" 
					placeholder="Password"
				/>
				{state?.errors?.password && <p className="text-red-500 text-sm">{state.errors.password.join(", ")}</p>}
			</div>
			
			<SubmitButton />
		</form>
	)
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending}>
			{pending ? "Logging in..." : "Login"}
		</button>
	);
}
