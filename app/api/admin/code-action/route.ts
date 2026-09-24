import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as { isAdmin?: boolean } | undefined;
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { codeId, action } = await req.json();
  if (!codeId || !action) {
    return NextResponse.json({ error: "codeId and action required" }, { status: 400 });
  }

  if (action === "approve") {
    await prisma.code.update({ where: { id: codeId }, data: { isApproved: true } });
  } else if (action === "reject") {
    await prisma.code.update({ where: { id: codeId }, data: { isApproved: false } });
  } else if (action === "verify") {
    await prisma.code.update({ where: { id: codeId }, data: { lastVerified: new Date() } });
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
