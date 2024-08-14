"use client";

import { useState, useEffect } from "react";
import Countdown from "./countdown";
import Decrypt from "./decrypt";

export default function MessagePage({ params }: { params: { slug: string } }) {
	const [message, setMessage] = useState("");
	const [availableAt, setAvailableAt] = useState("");
	const [error, setError] = useState<string | null>(null);

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
				setAvailableAt(data.availableAt);
			} catch (error) {
				setError(error.message);
				console.error("Error fetching message:", error);
			}
		};

		fetchMessage();
	}, [params.slug]);

	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
			<h1 className="text-2xl font-bold mb-4">Encrypted Message</h1>
			{error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<>
					<p className="mb-4">The message is currently locked.</p>
					<pre className="bg-gray-100 p-2 rounded">{message}</pre>
					<Countdown availableAt={availableAt} />
					<Decrypt slug={params.slug} />
				</>
			)}
		</div>
	);
}
