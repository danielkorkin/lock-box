// app/api/unlock/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(req: NextRequest) {
	const { slug } = await req.json();

	const privateKey = await prisma.privateKey.findUnique({
		where: { slug },
	});

	if (!privateKey || new Date() < new Date(privateKey.availableAt)) {
		return NextResponse.json(
			{ error: "Not available yet" },
			{ status: 403 }
		);
	}

	return NextResponse.json({ key: privateKey.key });
}
