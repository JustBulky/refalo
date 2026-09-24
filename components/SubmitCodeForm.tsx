"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SubmitCodeForm({ brandSlug }: { brandSlug: string }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!session) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center">
        <p className="text-sm text-zinc-400">
          <Link href="/login" className="text-indigo-400 hover:underline">Log in</Link>
          {" "}or{" "}
          <Link href="/register" className="text-indigo-400 hover:underline">sign up</Link>
          {" "}to submit your referral code.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-dashed border-zinc-700 p-4 text-sm text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 transition-colors"
      >
        + Submit your referral code
      </button>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const normalizedUrl =
      url && !url.match(/^https?:\/\//i) ? `https://${url}` : url;
    const res = await fetch("/api/codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandSlug, code, url: normalizedUrl, description }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setCode("");
      setUrl("");
      setDescription("");
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
    }
  }

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
      <h3 className="text-sm font-medium text-white mb-4">Submit your referral code</h3>
      {success ? (
        <p className="text-sm text-emerald-400">
          Code submitted! It will appear after review.
          <button onClick={() => { setSuccess(false); setOpen(false); }} className="ml-3 text-zinc-500 hover:text-zinc-300">
            Close
          </button>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Referral code (e.g. JOHN20)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Referral link, e.g. hellofresh.com/ref/YOURCODE (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Short description of the reward (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-submit bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
