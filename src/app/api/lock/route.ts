// app/api/lock/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

export async function POST(req: NextRequest) {
	const { message, availableAt } = await req.json();

	const slug = uuidv4();
	const publicKey = uuidv4();
	const encryptedMessage = CryptoJS.AES.encrypt(
		message,
		publicKey
	).toString();

	await prisma.publicMessage.create({
		data: {
			slug,
			encryptedMessage,
			availableAt: new Date(availableAt),
		},
	});

	await prisma.privateKey.create({
		data: {
			slug,
			key: publicKey,
			availableAt: new Date(availableAt),
		},
	});

	return NextResponse.json({ slug });
}
