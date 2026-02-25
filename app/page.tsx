import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BrandDirectory from '@/components/BrandDirectory';

export default async function Home() {
  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    include: {
      referralLinks: {
        where: { isFounder: true },
        take: 1,
      },
      _count: {
        select: { clicks: true },
      },
    },
  });

  const categories = Array.from(
    new Set(
      brands.map((b: { category: string | null }) => b.category).filter(Boolean)
    )
  ) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Refalo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Community-driven referral directory with smart 70/20/10 link distribution
          </p>
          <div className="mt-4 flex gap-4 justify-center">
            <Link
              href="/admin"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Admin Dashboard
            </Link>
          </div>
        </header>

        <BrandDirectory brands={brands} categories={categories} />
      </div>
    </div>
  );
}
