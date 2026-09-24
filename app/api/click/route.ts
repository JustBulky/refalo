import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { codeId, brandSlug, isFounder, referrer } = await req.json();

  if (!codeId || !brandSlug) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Virtual founder codes don't have a DB record yet — skip FK write
  if (codeId === "virtual-founder") {
    return NextResponse.json({ ok: true });
  }

  await prisma.click.create({
    data: {
      codeId,
      brandSlug,
      isFounder: Boolean(isFounder),
      referrer: referrer ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
