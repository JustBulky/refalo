import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const brand = await prisma.brand.findUnique({
    where: { slug, isActive: true },
    include: {
      referralLinks: {
        orderBy: { weight: 'desc' },
      },
      _count: {
        select: { clicks: true },
      },
    },
  });

  if (!brand) {
    notFound();
  }

  const referralUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/r/${brand.slug}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          ← Back to all brands
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {brand.name}
              </h1>
              {brand.category && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {brand.category}
                </span>
              )}
            </div>
          </div>

          {brand.description && (
            <p className="text-lg text-gray-600 mb-6">{brand.description}</p>
          )}

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-2">Smart Referral Link</h2>
            <p className="mb-4 opacity-90">
              This link automatically distributes traffic using our 70/20/10 algorithm
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
              <code className="text-sm break-all">{referralUrl}</code>
            </div>
            <a
              href={`/api/r/${brand.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Use Referral Link →
            </a>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Link Distribution</h3>
              <span className="text-sm text-gray-500">
                {brand._count.clicks.toLocaleString()} total clicks
              </span>
            </div>

            <div className="space-y-4">
              {brand.referralLinks.map((link) => {
                const percentage = (link.weight / brand.referralLinks.reduce((sum, l) => sum + l.weight, 0)) * 100;
                return (
                  <div key={link.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {link.userName}
                        </span>
                        {link.isFounder && (
                          <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full font-semibold">
                            Verified Top Contributor
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-blue-600">
                          {percentage.toFixed(0)}%
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({link.clicks.toLocaleString()} clicks)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          link.isFounder
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                            : link.weight === 20
                            ? 'bg-blue-500'
                            : 'bg-gray-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              How It Works
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>70% of clicks go to verified top contributors (founders)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>20% go to active community contributors</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>10% distributed to newer community members</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
