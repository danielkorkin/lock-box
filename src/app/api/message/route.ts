// app/api/message/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const slug = searchParams.get("slug");

	if (!slug) {
		return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
	}

	const publicMessage = await prisma.publicMessage.findUnique({
		where: { slug },
		select: {
			encryptedMessage: true,
			availableAt: true,
		},
	});

	if (!publicMessage) {
		return NextResponse.json({ error: "Message not found" }, { status: 404 });
	}

	return NextResponse.json(publicMessage);
}
