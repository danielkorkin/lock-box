// src/app/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Countdown from "./countdown";
import Decrypt from "./decrypt";

export default function MessagePage({ params }: { params: { slug: string } }) {
	const [message, setMessage] = useState("");
	const [availableAt, setAvailableAt] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMessage = async () => {
			try {
				const res = await fetch(`/api/message?slug=${params.slug}`);

				if (!res.ok) {
					throw new Error("Failed to fetch message");
				}

				const data = await res.json();

				if (!data.encryptedMessage || !data.availableAt) {
					throw new Error("Incomplete message data");
				}

				setMessage(data.encryptedMessage);

				// Convert UTC time to local time for display
				const localAvailableAt = new Date(
					data.availableAt
				).toLocaleString();
				setAvailableAt(localAvailableAt);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unexpected error occurred");
				}
				console.error("Error fetching message:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMessage();
	}, [params.slug]);

	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
			<h1 className="text-2xl font-bold mb-4">Encrypted Message</h1>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<>
					<p className="mb-4">The message is currently locked.</p>
					<pre className="bg-gray-100 p-2 rounded overflow-x-auto whitespace-pre-wrap break-words max-h-96">
						{message}
					</pre>
					<Countdown availableAt={availableAt} />
					<Decrypt slug={params.slug} />
				</>
			)}
		</div>
	);
}
