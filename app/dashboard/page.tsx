import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = { title: "Dashboard — Refalo" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const codes = await prisma.code.findMany({
    where: { userId: session.user.id },
    include: { brand: true, clicks: true },
    orderBy: { createdAt: "desc" },
  });

  const totalClicks = codes.reduce((sum, c) => sum + c.clicks.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-zinc-400 text-sm mb-8">
        Welcome back, <span className="text-white">{session.user.name}</span>
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="text-2xl font-bold text-white">{codes.length}</div>
          <div className="text-xs text-zinc-500 mt-1">Codes submitted</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="text-2xl font-bold text-white">{totalClicks}</div>
          <div className="text-xs text-zinc-500 mt-1">Total clicks</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="text-2xl font-bold text-white">
            {codes.reduce((sum, c) => sum + c.workedCount, 0)}
          </div>
          <div className="text-xs text-zinc-500 mt-1">Worked votes</div>
        </div>
      </div>

      {/* Recent codes */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
          Your codes
        </h2>
        <Link
          href="/dashboard/analytics"
          className="text-xs text-indigo-400 hover:underline"
        >
          View analytics
        </Link>
      </div>

      {codes.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-500 text-sm">
          No codes yet.{" "}
          <Link href="/categories" className="text-indigo-400 hover:underline">
            Browse brands
          </Link>{" "}
          and submit your first code.
        </div>
      ) : (
        <div className="space-y-3">
          {codes.slice(0, 5).map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
            >
              <div>
                <Link
                  href={`/referral/${c.brand.slug}`}
                  className="text-sm font-medium text-white hover:text-indigo-300"
                >
                  {c.brand.name}
                </Link>
                <div className="font-mono text-xs text-zinc-400 mt-0.5">{c.code}</div>
              </div>
              <div className="text-right text-xs text-zinc-500">
                <div>{c.clicks.length} clicks</div>
                <div>{c.workedCount}W / {c.failedCount}F</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
