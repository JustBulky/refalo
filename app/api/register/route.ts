import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`register:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const { email, password, username } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  if (typeof email !== "string" || typeof password !== "string" || typeof username !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (email.length > 254 || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (password.length < 8 || password.length > 128) {
    return NextResponse.json({ error: "Password must be 8–128 characters" }, { status: 400 });
  }
  if (username.length < 2 || username.length > 32 || !/^[a-zA-Z0-9_-]+$/.test(username)) {
    return NextResponse.json({ error: "Username must be 2–32 alphanumeric characters" }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Email or username already taken" },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 12);

  // Bootstrap: first-ever user with matching ADMIN_EMAIL gets admin only if no admin exists yet.
  // ponytail: single bootstrap guard — add invite-token flow if multi-admin is ever needed
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminExists = adminEmail ? await prisma.user.findFirst({ where: { isAdmin: true } }) : true;
  const isAdmin = !adminExists && !!adminEmail && email === adminEmail;

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      username,
      isAdmin,
    },
  });

  return NextResponse.json({ id: user.id, username: user.username });
}
