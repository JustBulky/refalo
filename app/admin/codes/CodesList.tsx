"use client";

import { useState } from "react";
import Link from "next/link";
import PinButton from "./PinButton";
import DeleteButton from "./DeleteButton";

type Code = {
  id: string;
  code: string;
  isPinned: boolean;
  isApproved: boolean;
  lastVerified: Date | string | null;
  workedCount: number;
  failedCount: number;
  description: string | null;
  brand: { name: string; slug: string };
  user: { username: string | null } | null;
};

async function codeAction(codeId: string, action: string) {
  await fetch("/api/admin/code-action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ codeId, action }),
  });
}

export default function CodesList({ initial }: { initial: Code[] }) {
  const [codes, setCodes] = useState(initial);
  const [tab, setTab] = useState<"pending" | "approved">("pending");

  const filtered = codes.filter((c) => (tab === "pending" ? !c.isApproved : c.isApproved));

  async function approve(id: string) {
    await codeAction(id, "approve");
    setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, isApproved: true } : c)));
  }

  async function reject(id: string) {
    await codeAction(id, "reject");
    setCodes((prev) => prev.filter((c) => c.id !== id));
  }

  async function verify(id: string) {
    await codeAction(id, "verify");
    setCodes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, lastVerified: new Date().toISOString() } : c))
    );
  }

  const pendingCount = codes.filter((c) => !c.isApproved).length;

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTab("pending")}
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            tab === "pending"
              ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
              : "border-zinc-700 text-zinc-400 hover:text-white"
          }`}
        >
          Pending {pendingCount > 0 && <span className="ml-1 text-xs bg-indigo-600 text-white rounded-full px-1.5">{pendingCount}</span>}
        </button>
        <button
          onClick={() => setTab("approved")}
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            tab === "approved"
              ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
              : "border-zinc-700 text-zinc-400 hover:text-white"
          }`}
        >
          Approved
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-zinc-500 text-sm">No codes here.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3.5"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-white">{c.code}</span>
                    {c.isPinned && (
                      <span className="text-xs text-indigo-400 border border-indigo-500/40 rounded-full px-2 py-0.5">
                        Pinned
                      </span>
                    )}
                    {c.lastVerified && (
                      <span className="text-xs text-emerald-400 border border-emerald-500/40 rounded-full px-2 py-0.5">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    <Link href={`/referral/${c.brand.slug}`} className="hover:text-zinc-300 transition-colors">
                      {c.brand.name}
                    </Link>
                    {c.user && <span className="ml-2">by {c.user.username}</span>}
                    {c.description && <span className="ml-2 text-zinc-600">— {c.description}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-zinc-600">{c.workedCount}W / {c.failedCount}F</span>
                {tab === "pending" ? (
                  <>
                    <button
                      onClick={() => approve(c.id)}
                      className="text-xs px-2.5 py-1 rounded bg-emerald-900/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(c.id)}
                      className="text-xs px-2.5 py-1 rounded bg-red-900/40 text-red-400 hover:bg-red-900/60 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => verify(c.id)}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-colors"
                    >
                      ✓ Verify
                    </button>
                    <PinButton codeId={c.id} pinned={c.isPinned} />
                  </>
                )}
                <DeleteButton codeId={c.id} onDeleted={() => setCodes((prev) => prev.filter((x) => x.id !== c.id))} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
