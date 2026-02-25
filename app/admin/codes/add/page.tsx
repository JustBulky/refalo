import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import AddCodeForm from '@/components/admin/AddCodeForm';

export default async function AddCodePage({
  searchParams,
}: {
  searchParams: { brand?: string };
}) {
  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  const selectedBrand = searchParams.brand
  ? brands.find((b: { slug: string; id: string; name: string }) => b.slug === searchParams.brand) || null
  : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <a
            href="/admin"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Admin
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Founder Referral Code
          </h1>
          <p className="text-gray-600 mb-8">
            Add your personal referral code to get a 20% share of traffic using the 70/20/10 distribution.
          </p>

          <AddCodeForm brands={brands} selectedBrand={selectedBrand} />
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">About Founder Codes</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Founder codes get 20% of all traffic for that brand</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>They appear as "Verified Top Contributor" or "Community Pick" to blend in</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>You can have one founder code per brand</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Set weight to 100+ for premium placement</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
