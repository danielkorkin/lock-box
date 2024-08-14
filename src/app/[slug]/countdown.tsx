// app/[slug]/countdown.tsx
"use client";

import Countdown from "react-countdown";

export default function CountdownTimer({
	availableAt,
}: {
	availableAt: string;
}) {
	const date = new Date(availableAt).getTime();

	return (
		<div className="mt-4">
			<Countdown
				date={date}
				renderer={({ days, hours, minutes, seconds, completed }) => {
					if (completed) {
						return <span>The message is now available for decryption!</span>;
					} else {
						return (
							<span>
								Available in: {days}d {hours}h {minutes}m {seconds}s
							</span>
						);
					}
				}}
			/>
		</div>
	);
}
