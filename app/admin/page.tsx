import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import AdminStats from '@/components/admin/AdminStats';
import BrandManagementTable from '@/components/admin/BrandManagementTable';

export default async function AdminPage() {
  // Get overall stats
  const [totalBrands, totalLinks, totalClicks, founderLinks] = await Promise.all([
    prisma.brand.count(),
    prisma.referralLink.count(),
    prisma.click.count(),
    prisma.referralLink.count({ where: { isFounder: true } }),
  ]);

  // Get recent clicks
  const recentClicks = await prisma.click.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      brand: { select: { name: true, slug: true } },
      referralLink: { select: { userName: true, isFounder: true } },
    },
  });

  // Get brands with founder link status
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
    include: {
      referralLinks: {
        where: { isFounder: true },
        take: 1,
      },
      _count: {
        select: { referralLinks: true, clicks: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your brands and founder codes</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to Site
          </Link>
        </div>

        {/* Stats Overview */}
        <AdminStats
          totalBrands={totalBrands}
          totalLinks={totalLinks}
          totalClicks={totalClicks}
          founderLinks={founderLinks}
        />

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/brands/add"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
            >
              <div className="text-3xl mb-2">➕</div>
              <div className="font-semibold text-gray-700">Add New Brand</div>
            </Link>
            <Link
              href="/admin/codes/add"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
            >
              <div className="text-3xl mb-2">🔗</div>
              <div className="font-semibold text-gray-700">Add Founder Code</div>
            </Link>
            <Link
              href="/admin/analytics"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center"
            >
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold text-gray-700">View Analytics</div>
            </Link>
          </div>
        </div>

        {/* Brand Management */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Brand Management</h2>
          <BrandManagementTable brands={brands} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Clicks</h2>
          {recentClicks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No clicks yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Brand</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentClicks.map((click) => (
                    <tr key={click.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/referral/${click.brand.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {click.brand.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {click.referralLink.userName}
                      </td>
                      <td className="px-4 py-3">
                        {click.referralLink.isFounder ? (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                            Founder
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            Community
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-sm">
                        {new Date(click.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
