// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
	const [message, setMessage] = useState("");
	const [availableAt, setAvailableAt] = useState("");
	const router = useRouter();

	const handleLock = async () => {
		const response = await fetch("/api/lock", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message, availableAt }),
		});
		const data = await response.json();
		if (data.slug) {
			router.push(`/${data.slug}`);
		}
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
			<h1 className="text-2xl font-bold mb-4">Lock Box</h1>
			<textarea
				className="w-full p-2 border rounded mb-4"
				placeholder="Enter your message..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<input
				type="datetime-local"
				className="w-full p-2 border rounded mb-4"
				value={availableAt}
				onChange={(e) => setAvailableAt(e.target.value)}
			/>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded"
				onClick={handleLock}
			>
				Lock it
			</button>
		</div>
	);
}