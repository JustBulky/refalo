"use client";

import { useState } from "react";

const SOURCES = (domain: string) => [
  `https://logo.clearbit.com/${domain}`,
  `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
  `https://icons.duckduckgo.com/ip3/${domain}.ico`,
];

export default function BrandIcon({
  domain,
  name,
  size = 48,
}: {
  domain: string;
  name: string;
  size?: number;
}) {
  const [attempt, setAttempt] = useState(0);
  const sources = SOURCES(domain);

  if (attempt >= sources.length) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-xl bg-zinc-700 font-bold text-white shadow"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={attempt}
      src={sources[attempt]}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 rounded-xl bg-white p-1.5 shadow"
      onError={() => setAttempt((a) => a + 1)}
    />
  );
}
