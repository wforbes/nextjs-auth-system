"use client";
import { logout } from "@/app/login/action";

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4 w-[50%] mx-auto">
			<div className="flex justify-end">
				<button onClick={() => logout()}>Logout</button>
			</div>
			<h1 className="text-2xl font-bold">Dashboard</h1>
			<p className="text-sm text-gray-500">Welcome to the dashboard</p>
		</div>
	);
}
