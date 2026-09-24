import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!rateLimit(`codes:${session.user.id}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
  }

  const { brandSlug, code, url, description } = await req.json();

  if (!brandSlug || !code) {
    return NextResponse.json({ error: "brandSlug and code required" }, { status: 400 });
  }

  if (typeof code !== "string" || code.length < 1 || code.length > 100) {
    return NextResponse.json({ error: "Code must be 1–100 characters" }, { status: 400 });
  }

  if (description && (typeof description !== "string" || description.length > 200)) {
    return NextResponse.json({ error: "Description must be under 200 characters" }, { status: 400 });
  }

  if (url !== undefined && url !== null && url !== "") {
    if (typeof url !== "string" || url.length > 500) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        return NextResponse.json({ error: "URL must be http or https" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
  }

  const brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }

  const duplicate = await prisma.code.findFirst({
    where: { brandId: brand.id, code },
  });
  if (duplicate) {
    return NextResponse.json({ error: "This code has already been submitted for this brand." }, { status: 409 });
  }

  const created = await prisma.code.create({
    data: {
      brandId: brand.id,
      userId: session.user.id,
      code,
      url: url || null,
      description: description || null,
    },
  });

  return NextResponse.json(created);
}
