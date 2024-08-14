// app/[slug]/decrypt.tsx
"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

export default function Decrypt({ slug }: { slug: string }) {
	const [decryptedMessage, setDecryptedMessage] = useState("");

	const handleDecrypt = async () => {
		const res = await fetch("/api/unlock", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ slug }),
		});

		if (res.status === 403) {
			alert("The message is not available yet.");
			return;
		}

		const data = await res.json();
		const encryptedMessage =
			document.querySelector("pre")?.textContent || "";
		const decrypted = CryptoJS.AES.decrypt(
			encryptedMessage,
			data.key
		).toString(CryptoJS.enc.Utf8);
		setDecryptedMessage(decrypted);
	};

	return (
		<>
			{decryptedMessage ? (
				<div className="mt-4 p-4 bg-green-100 rounded">
					<h2 className="text-xl font-bold">Decrypted Message</h2>
					<p>{decryptedMessage}</p>
				</div>
			) : (
				<button
					className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
					onClick={handleDecrypt}
				>
					Decrypt Message
				</button>
			)}
		</>
	);
}
