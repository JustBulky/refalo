"use client";

import { useRef, useState } from "react";

type CodeCardProps = {
  id: string;
  code: string | null;
  url?: string | null;
  description?: string | null;
  isFounder: boolean;
  workedCount: number;
  failedCount: number;
  submittedBy?: string | null;
  lastVerified?: Date | string | null;
  brandSlug: string;
};

const PARTICLE_COLORS = [
  "#818cf8", "#a78bfa", "#34d399", "#fbbf24", "#f472b6", "#60a5fa",
];

export default function CodeCard({
  id,
  code,
  url,
  description,
  isFounder,
  workedCount,
  failedCount,
  submittedBy,
  lastVerified,
  brandSlug,
}: CodeCardProps) {
  const [copied, setCopied] = useState(false);
  const [voted, setVoted] = useState<"worked" | "failed" | null>(null);
  const [voteError, setVoteError] = useState("");
  const [counts, setCounts] = useState({ worked: workedCount, failed: failedCount });
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const total = counts.worked + counts.failed;
  const successRate = total > 0 ? Math.round((counts.worked / total) * 100) : null;

  function spawnParticles() {
    const btn = copyBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const count = 10;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "copy-particle";
      const angle = (i / count) * 2 * Math.PI + Math.random() * 0.5;
      const dist = 28 + Math.random() * 20;
      el.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
      el.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
      el.style.left = `${cx + window.scrollX}px`;
      el.style.top = `${cy + window.scrollY}px`;
      el.style.background = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
      el.style.position = "fixed";
      el.style.zIndex = "9999";
      el.style.transform = "translate(-50%, -50%)";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 600);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(code ?? "");
    spawnParticles();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleOutboundClick() {
    if (!url) return;
    await fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codeId: id,
        brandSlug,
        isFounder,
        referrer: window.location.pathname,
      }),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleVote(worked: boolean) {
    setVoteError("");
    setCounts((c) => ({
      worked: worked ? c.worked + 1 : c.worked,
      failed: worked ? c.failed : c.failed + 1,
    }));
    setVoted(worked ? "worked" : "failed");
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codeId: id, worked }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setCounts({ worked: workedCount, failed: failedCount });
      setVoted(null);
      setVoteError(
        res.status === 401
          ? "Log in to vote"
          : data.error ?? "Vote failed"
      );
    }
  }

  return (
    <div
      className={`rounded-xl border p-5 ${
        isFounder
          ? "border-indigo-600 bg-indigo-950/30"
          : "border-zinc-800 bg-zinc-900"
      }`}
    >
      {isFounder && (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-600/20 px-2.5 py-0.5 text-xs font-medium text-indigo-300 border border-indigo-600/40">
          <span>✓</span> Refalo Pick
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {code && (
            <div className="font-mono text-base font-semibold text-white bg-zinc-800 rounded-md px-3 py-1.5 inline-block">
              {code}
            </div>
          )}
          {description && (
            <p className="mt-2 text-sm text-zinc-400">{description}</p>
          )}
          {!isFounder && submittedBy && (
            <p className="mt-1 text-xs text-zinc-600">by {submittedBy}</p>
          )}
          {successRate !== null && (
            <p className="mt-2 text-xs text-zinc-500">
              <span className="text-emerald-400 font-medium">{successRate}% worked</span>
              {" "}({total} {total === 1 ? "vote" : "votes"})
            </p>
          )}
          {lastVerified && (
            <p className="mt-1 text-xs text-zinc-600">
              ✓ Verified {Math.floor((Date.now() - new Date(lastVerified).getTime()) / 86400000)}d ago
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          {code && (
            <button
              ref={copyBtnRef}
              onClick={handleCopy}
              className="text-sm px-3 py-1.5 rounded-md border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
          {url && (
            <button
              onClick={handleOutboundClick}
              className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                isFounder
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
              }`}
            >
              Use link
            </button>
          )}
        </div>
      </div>

      {!isFounder && (
        <div className="mt-3 flex items-center gap-3 border-t border-zinc-800 pt-3">
          {voted ? (
            <span className="text-xs text-zinc-400">
              {voted === "worked" ? "✓ Marked as worked" : "✗ Marked as didn't work"} — thanks!
            </span>
          ) : (
            <>
              <span className="text-xs text-zinc-600">Did this work?</span>
              <button
                onClick={() => handleVote(true)}
                className="text-xs px-2 py-1 rounded bg-emerald-900/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors"
              >
                Worked
              </button>
              <button
                onClick={() => handleVote(false)}
                className="text-xs px-2 py-1 rounded bg-red-900/40 text-red-400 hover:bg-red-900/60 transition-colors"
              >
                Didn&apos;t Work
              </button>
              {voteError && <span className="text-xs text-red-400">{voteError}</span>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
