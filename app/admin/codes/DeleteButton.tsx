"use client";

import { useState } from "react";

export default function DeleteButton({ codeId, onDeleted }: { codeId: string; onDeleted: () => void }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/codes/${codeId}`, { method: "DELETE" });
    onDeleted();
  }

  if (confirm) {
    return (
      <span className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs px-3 py-1 rounded-md border border-red-500 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
        >
          {loading ? "Deleting…" : "Confirm"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="text-xs px-3 py-1 rounded-md border border-zinc-700 text-zinc-500 hover:border-red-500/60 hover:text-red-400 transition-colors"
    >
      Delete
    </button>
  );
}
