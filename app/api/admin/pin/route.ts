import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as { isAdmin?: boolean } | undefined;
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { codeId, pinned } = await req.json();
  await prisma.code.update({
    where: { id: codeId },
    data: { isPinned: Boolean(pinned) },
  });

  return NextResponse.json({ ok: true });
}
