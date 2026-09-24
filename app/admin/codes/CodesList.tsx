"use client";

import { useState } from "react";
import Link from "next/link";
import PinButton from "./PinButton";
import DeleteButton from "./DeleteButton";

type Code = {
  id: string;
  code: string;
  isPinned: boolean;
  workedCount: number;
  failedCount: number;
  description: string | null;
  brand: { name: string; slug: string };
  user: { username: string | null } | null;
};

export default function CodesList({ initial }: { initial: Code[] }) {
  const [codes, setCodes] = useState(initial);

  return codes.length === 0 ? (
    <p className="text-zinc-500 text-sm">No community codes submitted yet.</p>
  ) : (
    <div className="space-y-2">
      {codes.map((c) => (
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
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-zinc-600">
              {c.workedCount}W / {c.failedCount}F
            </span>
            <PinButton codeId={c.id} pinned={c.isPinned} />
            <DeleteButton codeId={c.id} onDeleted={() => setCodes((prev) => prev.filter((x) => x.id !== c.id))} />
          </div>
        </div>
      ))}
    </div>
  );
}
