'use client';

import Link from 'next/link';
import { Brand, ReferralLink } from '@prisma/client';

interface BrandWithDetails extends Brand {
  referralLinks: ReferralLink[];
  _count: {
    referralLinks: number;
    clicks: number;
  };
}

interface BrandManagementTableProps {
  brands: BrandWithDetails[];
}

export default function BrandManagementTable({ brands }: BrandManagementTableProps) {
  if (brands.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="mb-4">No brands yet. Add your first brand to get started!</p>
        <Link
          href="/admin/brands/add"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add First Brand
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Brand</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Links</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Clicks</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Founder Code</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {brands.map((brand) => {
            const hasFounderCode = brand.referralLinks.length > 0;
            
            return (
              <tr key={brand.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {brand.logoUrl && (
                      <img
                        src={brand.logoUrl}
                        alt={brand.name}
                        className="w-8 h-8 rounded object-contain"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{brand.name}</div>
                      <div className="text-xs text-gray-500">{brand.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {brand.category ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {brand.category}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {brand._count.referralLinks}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {brand._count.clicks}
                </td>
                <td className="px-4 py-3 text-center">
                  {hasFounderCode ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      ✓ Active
                    </span>
                  ) : (
                    <Link
                      href={`/admin/codes/add?brand=${brand.slug}`}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium hover:bg-yellow-200 transition"
                    >
                      + Add Code
                    </Link>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/referral/${brand.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      target="_blank"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/brands/${brand.slug}/edit`}
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
