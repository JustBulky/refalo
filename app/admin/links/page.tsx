"use client";

import { useState } from "react";
import { BRANDS } from "@/lib/brands";

export default function AdminLinksPage() {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0].slug);
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/admin/founder-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brandSlug: selectedBrand,
        code,
        url,
        description,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setMessage("Founder link saved!");
      setCode("");
      setUrl("");
      setDescription("");
    } else {
      const data = await res.json();
      setMessage(data.error ?? "Error saving link");
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-2">Founder Links</h1>
      <p className="text-zinc-400 text-sm mb-8">
        Set the &ldquo;Refalo Pick&rdquo; link for each brand. This replaces the env-var
        affiliate link and appears as slot #1 on the brand page.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-zinc-400 mb-1 block">Brand</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            {BRANDS.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-zinc-400 mb-1 block">Code / label</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="e.g. REFALO20"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-400 mb-1 block">Affiliate URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-400 mb-1 block">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Get 3 months free"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes("saved") ? "text-emerald-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-submit bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          {loading ? "Saving..." : "Save founder link"}
        </button>
      </form>
    </div>
  );
}
