"use client";

import { useState } from "react";
import Link from "next/link";

export default function RequestBrandPage() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    const res = await fetch("/api/request-brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, website, reason, email }),
    });
    if (res.ok) {
      setState("done");
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-4xl mb-4">🙌</div>
          <h1 className="text-2xl font-bold text-white mb-2">Request received!</h1>
          <p className="text-zinc-400 text-sm mb-6">
            We review every request and add the best ones. We&apos;ll reach out if we need more info.
          </p>
          <Link href="/" className="text-indigo-400 hover:underline text-sm">
            ← Back to all brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-6 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-white mb-1">Request a brand</h1>
        <p className="text-zinc-400 text-sm mb-8">
          Know a brand with a great referral program? Let us know and we&apos;ll add it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Brand name <span className="text-red-400">*</span></label>
            <input
              type="text"
              placeholder="e.g. Coinbase"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Brand website <span className="text-red-400">*</span></label>
            <input
              type="text"
              placeholder="e.g. coinbase.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">What&apos;s the referral reward? <span className="text-zinc-600">(optional)</span></label>
            <input
              type="text"
              placeholder="e.g. $10 bonus for both referrer and referee"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Your email <span className="text-zinc-600">(optional — if you want to be notified when it&apos;s added)</span></label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          {state === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}
          <button
            type="submit"
            disabled={state === "loading"}
            className="btn-submit w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            {state === "loading" ? "Submitting…" : "Submit request"}
          </button>
        </form>
      </div>
    </div>
  );
}
