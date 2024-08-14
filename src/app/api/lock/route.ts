import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { customAlphabet } from "nanoid";
import CryptoJS from "crypto-js";

// Custom alphabet for generating slugs (using nanoid)
const alphabet =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const nanoid = customAlphabet(alphabet, 10); // 10-character slug

export async function POST(req: NextRequest) {
	const { message, availableAt } = await req.json();

	const publicKey = nanoid();
	const encryptedMessage = CryptoJS.AES.encrypt(
		message,
		publicKey
	).toString();

	// Generate a unique slug
	let slug: string;
	let isUnique = false;

	while (!isUnique) {
		slug = nanoid();
		const existingSlug = await prisma.publicMessage.findUnique({
			where: { slug },
		});
		if (!existingSlug) {
			isUnique = true;
		}
	}

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
