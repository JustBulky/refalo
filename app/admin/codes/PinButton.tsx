"use client";

import { useState } from "react";

export default function PinButton({ codeId, pinned }: { codeId: string; pinned: boolean }) {
  const [isPinned, setIsPinned] = useState(pinned);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch("/api/admin/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codeId, pinned: !isPinned }),
    });
    setIsPinned((p) => !p);
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-xs px-3 py-1 rounded-md border transition-colors disabled:opacity-50 ${
        isPinned
          ? "border-indigo-500 text-indigo-400 hover:border-indigo-400"
          : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
      }`}
    >
      {isPinned ? "Pinned" : "Pin"}
    </button>
  );
}
