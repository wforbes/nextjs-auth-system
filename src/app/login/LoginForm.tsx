"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, LoginState } from "./action";

export function LoginForm() {
	const [state, loginAction] = useActionState(login, { errors: {} } as LoginState);

	return (
		<form action={loginAction} className="flex flex-col gap-4 w-full p-10">
			
			<div className="flex flex-col gap-2">
				<input id="email" name="email" type="email" placeholder="Email" />
				{state?.errors?.email && <p className="text-red-500">{state.errors.email.join(", ")}</p>}
			</div>
			
			<div className="flex flex-col gap-2">
				<input id="password" name="password" type="password" placeholder="Password" />
				{state?.errors?.password && <p className="text-red-500">{state.errors.password.join(", ")}</p>}
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
