import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getDisplayLinks } from '@/lib/link-router';
import ReferralLinkCard from '@/components/ReferralLinkCard';
import GetReferralButton from '@/components/GetReferralButton';

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await prisma.brand.findUnique({
    where: { slug },
  });

  if (!brand) {
    return {
      title: 'Brand Not Found',
    };
  }

  return {
    title: `${brand.name} Referral Codes & Links | Refalo`,
    description: `Get the best ${brand.name} referral codes and sign-up bonuses. ${brand.description || 'Join thousands earning rewards.'}`,
    openGraph: {
      title: `${brand.name} Referral Codes`,
      description: brand.description || `Get exclusive ${brand.name} referral bonuses`,
      images: brand.logoUrl ? [brand.logoUrl] : [],
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = await prisma.brand.findUnique({
    where: { slug },
    include: {
      referralLinks: {
        where: { clicks: { gte: 0 } }, // All active links
        orderBy: [
          { weight: 'desc' },
          { clicks: 'desc' },
        ],
      },
      _count: {
        select: { clicks: true },
      },
    },
  });

  if (!brand || !brand.isActive) {
    notFound();
  }

  // Get display links (shows top links in UI)
  const displayLinks = getDisplayLinks(brand.referralLinks, 10);
  const totalLinks = brand.referralLinks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to All Brands
        </Link>

        {/* Brand Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            {brand.logoUrl && (
              <img
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                className="w-24 h-24 rounded-xl object-contain"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">{brand.name}</h1>
                {brand.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {brand.category}
                  </span>
                )}
              </div>
              {brand.description && (
                <p className="text-lg text-gray-600 mb-4">{brand.description}</p>
              )}
              <div className="flex gap-6 text-sm text-gray-500">
                <div>
                  <span className="font-semibold text-gray-700">{totalLinks}</span> referral codes available
                </div>
                <div>
                  <span className="font-semibold text-gray-700">{brand._count.clicks}</span> total uses
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <GetReferralButton brandSlug={brand.slug} />
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">How It Works</h2>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">1.</span>
              Click "Get Referral Link" above to get a verified referral code
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">2.</span>
              Sign up for {brand.name} using the referral link
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">3.</span>
              Get your sign-up bonus or discount automatically
            </li>
          </ol>
        </div>

        {/* Community Codes Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Community Referral Codes
            </h2>
            <Link
              href={`/submit?brand=${brand.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Add Your Code →
            </Link>
          </div>

          {displayLinks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No referral codes yet. Be the first to add one!</p>
              <Link
                href={`/submit?brand=${brand.slug}`}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Your Referral Code
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {displayLinks.map((link) => (
                <ReferralLinkCard
                  key={link.id}
                  link={link}
                  brandSlug={brand.slug}
                />
              ))}
            </div>
          )}

          {totalLinks > 10 && (
            <div className="mt-6 text-center text-sm text-gray-500">
              Showing top {Math.min(10, totalLinks)} of {totalLinks} codes
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-8 prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About {brand.name} Referral Program
          </h2>
          <p className="text-gray-700">
            {brand.name} offers referral bonuses for new users. By using a referral code from our community,
            you can get exclusive sign-up bonuses that aren't available to regular users. Our community has
            shared {totalLinks} verified referral codes to help you maximize your rewards.
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    select: { slug: true },
  });

  return brands.map((brand: { slug: string }) => ({
    slug: brand.slug,
  }));
}
