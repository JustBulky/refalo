import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as { isAdmin?: boolean } | undefined;
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { brandSlug, code, url, description } = await req.json();
  if (!brandSlug || !code) {
    return NextResponse.json({ error: "brandSlug and code required" }, { status: 400 });
  }

  const brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }

  // Remove old founder link for this brand
  await prisma.code.deleteMany({
    where: { brandId: brand.id, isFounder: true },
  });

  const created = await prisma.code.create({
    data: {
      brandId: brand.id,
      userId: null,
      code,
      url: url ?? null,
      description: description ?? null,
      isFounder: true,
      isPinned: true,
    },
  });

  return NextResponse.json(created);
}
