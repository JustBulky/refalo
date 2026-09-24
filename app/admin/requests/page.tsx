import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = { title: "Brand Requests — Admin — Refalo" };

export default async function AdminRequestsPage() {
  const session = await auth();
  const user = session?.user as { isAdmin?: boolean } | undefined;
  if (!user?.isAdmin) redirect("/");

  const requests = await prisma.brandRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Brand Requests</h1>
        <Link href="/admin" className="text-sm text-zinc-400 hover:text-white transition-colors">
          ← Back to admin
        </Link>
      </div>

      {requests.length === 0 ? (
        <p className="text-zinc-500 text-sm">No brand requests yet.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-white text-sm">{r.name}</div>
                  <a
                    href={r.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    {r.website}
                  </a>
                  {r.reason && (
                    <p className="mt-1.5 text-sm text-zinc-400">{r.reason}</p>
                  )}
                  {r.email && (
                    <p className="mt-1 text-xs text-zinc-600">{r.email}</p>
                  )}
                </div>
                <span className="text-xs text-zinc-600 shrink-0">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
