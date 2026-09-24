import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { BRANDS } from "@/lib/brands";
import Link from "next/link";

export const metadata = { title: "Brands — Admin — Refalo" };

export default async function AdminBrandsPage() {
  const session = await auth();
  const user = session?.user as { isAdmin?: boolean } | undefined;
  if (!user?.isAdmin) redirect("/");

  const envKeys = BRANDS.map((b) => ({
    ...b,
    hasEnv: Boolean(process.env[b.affiliateEnvKey]),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Brands</h1>
        <Link href="/admin" className="text-sm text-zinc-400 hover:text-white transition-colors">
          ← Back to admin
        </Link>
      </div>

      <div className="space-y-2">
        {envKeys.map((b) => (
          <div
            key={b.slug}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm font-medium text-white">{b.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{b.category}</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <span className="font-mono text-zinc-500">{b.affiliateEnvKey}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                  b.hasEnv
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${b.hasEnv ? "bg-emerald-400" : "bg-red-400"}`} />
                {b.hasEnv ? "Env set" : "Missing"}
              </span>
              <Link
                href={`/referral/${b.slug}`}
                target="_blank"
                className="text-zinc-400 hover:text-indigo-400 transition-colors"
              >
                View page →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
