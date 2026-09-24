import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type Props = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: Props) {
  const session = await auth();
  const user = session?.user as { isAdmin?: boolean; id?: string } | undefined;
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const code = await prisma.code.findUnique({ where: { id } });
  if (!code) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.vote.deleteMany({ where: { codeId: id } });
  await prisma.code.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
