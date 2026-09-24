import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`brand-request:${ip}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const { name, website, reason, email } = await req.json();

  if (!name || typeof name !== "string" || name.trim().length < 1) {
    return NextResponse.json({ error: "Brand name is required." }, { status: 400 });
  }
  if (!website || typeof website !== "string" || website.trim().length < 1) {
    return NextResponse.json({ error: "Brand website is required." }, { status: 400 });
  }

  const normalizedWebsite =
    website.match(/^https?:\/\//i) ? website : `https://${website}`;

  await prisma.brandRequest.create({
    data: {
      name: name.trim().slice(0, 100),
      website: normalizedWebsite.slice(0, 300),
      reason: reason ? String(reason).trim().slice(0, 500) : null,
      email: email ? String(email).trim().slice(0, 254) : null,
    },
  });

  return NextResponse.json({ ok: true });
}
