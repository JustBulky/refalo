import type { Metadata } from "next";
import Link from "next/link";
import { BRANDS } from "@/lib/brands";
import BrandIcon from "@/components/BrandIcon";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  alternates: { canonical: "https://refalo.io" },
};

const CATEGORIES = Array.from(new Set(BRANDS.map((b) => b.category)));

const CATEGORY_ICONS: Record<string, string> = {
  "Finance": "💰",
  "Software & Tools": "🛠",
  "Hosting & Domains": "🌐",
  "Food & Drink": "🍽",
  "Electronics": "📱",
  "Business": "🏢",
};

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Refalo",
        url: "https://refalo.io",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://refalo.io/categories?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "Refalo",
        url: "https://refalo.io",
        description:
          "Community-powered referral code directory for top brands.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-600/30 bg-indigo-600/10 px-3 py-1 text-xs text-indigo-300 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
          Community-verified referral codes
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Real codes.<br className="sm:hidden" /> Real rewards.
        </h1>
        <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Find working referral links for top brands — curated by us, shared by the community.
        </p>
        <form action="/categories" className="max-w-md mx-auto flex gap-2">
          <input
            name="q"
            type="search"
            placeholder="Search brands..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            className="btn-submit bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category pills */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/categories?category=${encodeURIComponent(cat)}`}
              className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-sm text-zinc-300 hover:border-indigo-500/60 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <span>{CATEGORY_ICONS[cat] ?? "•"}</span>
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* All brands grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            All brands
          </h2>
          <span className="text-xs text-zinc-600">{BRANDS.length} brands</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/referral/${brand.slug}`}
              className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-indigo-600/50 hover:bg-zinc-800/80 transition-all flex items-center gap-3"
            >
              <BrandIcon domain={brand.domain} name={brand.name} size={36} />
              <div>
                <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-indigo-300 transition-colors">
                  {brand.name}
                </div>
                <div className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors leading-snug">
                  ~{brand.reward}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Request a brand */}
        <div className="mt-4 rounded-xl border border-dashed border-zinc-700 p-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">Don&apos;t see a brand you use?</p>
          <Link href="/request-brand" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            Request a brand →
          </Link>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="mt-16 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Have a referral code?</h2>
          <p className="text-zinc-400 text-sm mb-5">
            Share it with the community and help others save.
          </p>
          <Link
            href="/register"
            className="inline-flex bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Share your code
          </Link>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Get the best deals weekly</h2>
          <p className="text-zinc-400 text-sm mb-5">
            New referral codes and bonuses, straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
    </>
  );
}
