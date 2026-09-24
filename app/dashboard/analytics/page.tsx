import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Analytics — Refalo" };

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const codes = await prisma.code.findMany({
    where: { userId: session.user.id },
    include: {
      brand: true,
      clicks: { orderBy: { createdAt: "desc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">Analytics</h1>

      {codes.length === 0 ? (
        <p className="text-zinc-500 text-sm">No codes submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {codes.map((code) => {
            const clicksByDay = code.clicks.reduce<Record<string, number>>(
              (acc, click) => {
                const day = click.createdAt.toISOString().slice(0, 10);
                acc[day] = (acc[day] ?? 0) + 1;
                return acc;
              },
              {}
            );

            return (
              <div
                key={code.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {code.brand.name}
                    </div>
                    <div className="font-mono text-xs text-zinc-400">{code.code}</div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-white font-medium">{code.clicks.length} total clicks</div>
                    <div className="text-xs text-zinc-500">
                      {code.workedCount}W / {code.failedCount}F votes
                    </div>
                  </div>
                </div>

                {Object.keys(clicksByDay).length > 0 && (
                  <div className="mt-3 border-t border-zinc-800 pt-3">
                    <div className="text-xs text-zinc-500 mb-2">Clicks by day</div>
                    <div className="space-y-1">
                      {Object.entries(clicksByDay)
                        .slice(0, 7)
                        .map(([day, count]) => (
                          <div key={day} className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500 w-24">{day}</span>
                            <div className="flex-1 bg-zinc-800 rounded h-1.5">
                              <div
                                className="bg-indigo-500 h-1.5 rounded"
                                style={{
                                  width: `${Math.min(100, (count / code.clicks.length) * 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs text-zinc-400 w-6 text-right">{count}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
