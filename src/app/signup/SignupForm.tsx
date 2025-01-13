"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup, SignupState } from "./action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SignupForm() {
  const [state, signupAction] = useActionState(signup, { errors: {} } as SignupState);
  const router = useRouter();

  useEffect(() => {
    if (state && 'success' in state && state.success) {
      router.push('/login');
    }
  }, [state, router]);

  return (
    <form action={signupAction} className="flex flex-col gap-4 w-full max-w-md mx-auto p-10">
      <div className="flex flex-col gap-2">
        <input 
          id="username" 
          name="username" 
          type="text" 
          placeholder="Username"
        />
        {state?.errors?.username && <p className="text-red-500 text-sm">{state.errors.username.join(", ")}</p>}
      </div>

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

      <div className="flex flex-col gap-2">
        <input 
          id="confirmPassword" 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirm Password"
        />
        {state?.errors?.confirmPassword && <p className="text-red-500 text-sm">{state.errors.confirmPassword.join(", ")}</p>}
      </div>
      
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Creating Account..." : "Sign Up"}
    </button>
  );
} 