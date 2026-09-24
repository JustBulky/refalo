import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CodesList from "./CodesList";

export const metadata = { title: "Codes — Admin — Refalo" };

export default async function AdminCodesPage() {
  const session = await auth();
  const user = session?.user as { isAdmin?: boolean } | undefined;
  if (!user?.isAdmin) redirect("/");

  const codes = await prisma.code.findMany({
    where: { isFounder: false },
    include: {
      brand: { select: { name: true, slug: true } },
      user: { select: { username: true } },
    },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Community Codes</h1>
        <Link href="/admin" className="text-sm text-zinc-400 hover:text-white transition-colors">
          ← Back to admin
        </Link>
      </div>

      <CodesList initial={codes} />
    </div>
  );
}
