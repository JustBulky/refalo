import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BRANDS, getBrandBySlug } from "@/lib/brands";
import { getAffiliateUrl } from "@/lib/affiliates";
import { prisma } from "@/lib/prisma";
import CodeCard from "@/components/CodeCard";
import Disclaimer from "@/components/Disclaimer";
import SubmitCodeForm from "@/components/SubmitCodeForm";
import BrandIcon from "@/components/BrandIcon";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ brand: string }> };

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} Referral Code 2026 — Refalo`,
    description: `Get the best ${brand.name} referral code. Save money or earn rewards with verified community links.`,
    alternates: { canonical: `https://refalo.io/referral/${slug}` },
    openGraph: {
      title: `${brand.name} Referral Code 2026 — Refalo`,
      description: `Get the best ${brand.name} referral code. Save money or earn rewards with verified community links.`,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brandMeta = getBrandBySlug(slug);
  if (!brandMeta) notFound();

  const affiliateUrl = getAffiliateUrl(slug);

  // Fetch or create brand in DB
  let brand = await prisma.brand.findUnique({ where: { slug } });
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        slug: brandMeta.slug,
        name: brandMeta.name,
        description: brandMeta.description,
        category: brandMeta.category,
      },
    });
  }

  // Fetch approved + founder codes for this brand
  const codes = await prisma.code.findMany({
    where: { brandId: brand.id, OR: [{ isApproved: true }, { isFounder: true }] },
    include: { user: { select: { username: true } } },
    orderBy: [
      { isFounder: "desc" },
      { isPinned: "desc" },
      { workedCount: "desc" },
      { createdAt: "desc" },
    ],
  });

  // If there's an affiliate URL but no founder code in DB, build a virtual one
  const hasFounderCode = codes.some((c) => c.isFounder);
  const virtualFounder =
    !hasFounderCode && affiliateUrl
      ? {
          id: "virtual-founder",
          code: null,
          url: affiliateUrl,
          description: `Sign up with this link for the best ${brandMeta.name} bonus.`,
          isFounder: true,
          workedCount: 0,
          failedCount: 0,
          submittedBy: null,
          lastVerified: null,
        }
      : null;

  const displayCodes = [
    ...(virtualFounder ? [virtualFounder] : []),
    ...codes.map((c) => ({
      id: c.id,
      code: c.code,
      url: c.url,
      description: c.description,
      isFounder: c.isFounder,
      workedCount: c.workedCount,
      failedCount: c.failedCount,
      submittedBy: c.user?.username ?? null,
      lastVerified: c.lastVerified ?? null,
    })),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `${brandMeta.name} Referral Code`,
    description: brandMeta.description,
    url: `https://refalo.io/referral/${slug}`,
    offeredBy: { "@type": "Organization", name: brandMeta.name, url: `https://${brandMeta.domain}` },
    seller: { "@type": "Organization", name: "Refalo", url: "https://refalo.io" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Brands", href: "/categories" },
            { name: `${brandMeta.name} Referral Code`, href: `/referral/${slug}` },
          ]}
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <BrandIcon domain={brandMeta.domain} name={brandMeta.name} />
          <div>
            <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400 mb-1">
              {brandMeta.category}
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {brandMeta.name}{" "}Referral Codes &amp; Sign-Up Bonuses
            </h1>
          </div>
        </div>
        <p className="text-zinc-400 leading-relaxed">{brandMeta.description}</p>
      </div>

      {/* Benefits */}
      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="text-sm font-semibold text-zinc-300 mb-3">What you get</h2>
        <ul className="space-y-2">
          {brandMeta.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2">
          <p className="text-xs text-amber-500/80">
            ⚠ Reward amounts may vary and change without notice. Always verify the current offer before signing up.
          </p>
          <a
            href={brandMeta.tcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
          >
            View {brandMeta.name} referral terms &amp; conditions →
          </a>
        </div>
      </div>

      {/* Codes */}
      <div className="space-y-4 mb-8">
        {displayCodes.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-500 text-sm">
            No codes yet. Be the first to submit one!
          </div>
        ) : (
          displayCodes.map((c) => (
            <CodeCard
              key={c.id}
              id={c.id}
              code={c.code}
              url={c.url}
              description={c.description}
              isFounder={c.isFounder}
              workedCount={c.workedCount}
              failedCount={c.failedCount}
              submittedBy={c.submittedBy}
              lastVerified={c.lastVerified}
              brandSlug={slug}
            />
          ))
        )}
      </div>

      {/* Submit form */}
      <div className="mb-8">
        <SubmitCodeForm brandSlug={slug} />
      </div>

      <Disclaimer brandName={brandMeta.name} />
    </div>
    </>
  );
}
