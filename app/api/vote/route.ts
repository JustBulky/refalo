import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!rateLimit(`vote:${session.user.id}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many votes. Try again later." }, { status: 429 });
  }

  const { codeId, worked } = await req.json();
  if (!codeId || typeof worked !== "boolean") {
    return NextResponse.json({ error: "codeId and worked required" }, { status: 400 });
  }

  const existing = await prisma.vote.findUnique({
    where: { userId_codeId: { userId: session.user.id, codeId } },
  });

  if (existing) {
    return NextResponse.json({ error: "Already voted" }, { status: 409 });
  }

  await prisma.$transaction([
    prisma.vote.create({
      data: { userId: session.user.id, codeId, worked },
    }),
    prisma.code.update({
      where: { id: codeId },
      data: worked
        ? { workedCount: { increment: 1 } }
        : { failedCount: { increment: 1 } },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
