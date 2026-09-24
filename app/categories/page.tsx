import Link from "next/link";
import { BRANDS } from "@/lib/brands";
import BrandIcon from "@/components/BrandIcon";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

type Props = { searchParams: Promise<{ q?: string; category?: string }> };

export const metadata = {
  title: "Browse Brands — Refalo",
  description:
    "Browse referral codes for top brands by category — finance, software, hosting, food, electronics, and more. Save money with community-verified links.",
  alternates: { canonical: "https://refalo.io/categories" },
};

export default async function CategoriesPage({ searchParams }: Props) {
  const { q, category } = await searchParams;

  let filtered = BRANDS;
  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
    );
  }
  if (category) {
    filtered = filtered.filter((b) => b.category === category);
  }

  const grouped = filtered.reduce<Record<string, typeof BRANDS>>(
    (acc, brand) => {
      if (!acc[brand.category]) acc[brand.category] = [];
      acc[brand.category].push(brand);
      return acc;
    },
    {}
  );

  const showSchema = !q && !category;
  const collectionSchema = showSchema
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Browse Brands — Refalo",
        url: "https://refalo.io/categories",
        description:
          "Browse referral codes for top brands by category — finance, software, hosting, food, electronics, and more.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: BRANDS.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            url: `https://refalo.io/referral/${b.slug}`,
          })),
        },
      }
    : null;

  return (
    <>
      {collectionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
      )}
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-4">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Categories", href: "/categories" },
          ]}
        />
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Browse Brands</h1>
      <p className="text-zinc-400 text-sm mb-6 max-w-2xl">
        Find working referral codes for {BRANDS.length} top brands across finance, software, hosting, food, electronics, and more.
        Every link is community-verified — share yours and earn rewards together.
      </p>

      <form className="flex gap-2 mb-8">
        <input
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search brands..."
          className="flex-1 max-w-sm bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="btn-submit bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Search
        </button>
        {(q || category) && (
          <Link
            href="/categories"
            className="px-4 py-2 rounded-lg text-sm border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            Clear
          </Link>
        )}
      </form>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-zinc-500">No brands found.</p>
      ) : (
        Object.entries(grouped).map(([cat, brands]) => (
          <div key={cat} className="mb-10">
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
              {cat}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/referral/${brand.slug}`}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-indigo-600/60 hover:bg-zinc-800 transition-all"
                >
                  <BrandIcon domain={brand.domain} name={brand.name} />
                  <div className="mt-3 text-white font-medium text-sm group-hover:text-indigo-300 transition-colors">
                    {brand.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
}
