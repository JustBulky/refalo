import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = { title: "Admin — Refalo" };

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user as { isAdmin?: boolean } | undefined;
  if (!user?.isAdmin) redirect("/");

  const [brandCount, codeCount, clickCount, requestCount] = await Promise.all([
    prisma.brand.count(),
    prisma.code.count(),
    prisma.click.count(),
    prisma.brandRequest.count(),
  ]);

  const recentClicks = await prisma.click.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { code: { include: { brand: true } } },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">Admin Panel</h1>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="text-2xl font-bold text-white">{brandCount}</div>
          <div className="text-xs text-zinc-500 mt-1">Brands</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="text-2xl font-bold text-white">{codeCount}</div>
          <div className="text-xs text-zinc-500 mt-1">Total codes</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="text-2xl font-bold text-white">{clickCount}</div>
          <div className="text-xs text-zinc-500 mt-1">Total clicks</div>
        </div>
      </div>

      <div className="flex gap-3 mb-10">
        <Link
          href="/admin/links"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Manage Founder Links
        </Link>
        <Link
          href="/admin/brands"
          className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          View Brands
        </Link>
        <Link
          href="/admin/codes"
          className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Manage Codes
        </Link>
        <Link
          href="/admin/requests"
          className="relative border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Brand Requests
          {requestCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {requestCount}
            </span>
          )}
        </Link>
      </div>

      <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
        Recent clicks
      </h2>
      <div className="space-y-2">
        {recentClicks.map((click) => (
          <div
            key={click.id}
            className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm"
          >
            <div>
              <span className="text-white">{click.code.brand.name}</span>
              <span className="text-zinc-500 ml-2 font-mono text-xs">{click.code.code}</span>
              {click.isFounder && (
                <span className="ml-2 text-xs text-indigo-400">Founder</span>
              )}
            </div>
            <div className="text-xs text-zinc-500">
              {new Date(click.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
