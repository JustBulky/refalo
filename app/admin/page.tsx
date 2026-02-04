'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ReferralLink = {
  id: string;
  userName: string;
  isFounder: boolean;
  weight: number;
  clicks: number;
  url: string;
};

type Brand = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  referralLinks: ReferralLink[];
  _count: {
    clicks: number;
  };
};

export default function AdminDashboard() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/admin/brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateWeights = async (brandId: string, linkId: string, newWeight: number) => {
    setSaving(linkId);
    try {
      await fetch('/api/admin/weights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId, weight: newWeight }),
      });

      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.id === brandId
            ? {
                ...brand,
                referralLinks: brand.referralLinks.map((link) =>
                  link.id === linkId ? { ...link, weight: newWeight } : link
                ),
              }
            : brand
        )
      );
    } catch (error) {
      console.error('Error updating weight:', error);
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage referral link weight distribution (70/20/10)</p>
          </div>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {brands.map((brand) => {
            const totalWeight = brand.referralLinks.reduce((sum, link) => sum + link.weight, 0);
            return (
              <div key={brand.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{brand.name}</h2>
                    <div className="flex items-center gap-3">
                      {brand.category && (
                        <span className="text-sm text-gray-500">{brand.category}</span>
                      )}
                      <span className="text-sm text-gray-500">
                        {brand._count.clicks.toLocaleString()} total clicks
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/referral/${brand.slug}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Page →
                  </Link>
                </div>

                <div className="space-y-4">
                  {brand.referralLinks.map((link) => {
                    const percentage = totalWeight > 0 ? (link.weight / totalWeight) * 100 : 0;
                    return (
                      <div
                        key={link.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{link.userName}</span>
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

                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium text-gray-700 min-w-[60px]">
                            Weight:
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={link.weight}
                            onChange={(e) =>
                              updateWeights(brand.id, link.id, parseInt(e.target.value))
                            }
                            className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            disabled={saving === link.id}
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={link.weight}
                            onChange={(e) =>
                              updateWeights(brand.id, link.id, parseInt(e.target.value) || 0)
                            }
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                            disabled={saving === link.id}
                          />
                          {saving === link.id && (
                            <span className="text-xs text-blue-600">Saving...</span>
                          )}
                        </div>

                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              link.isFounder
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                                : link.weight >= 20
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

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Recommended Distribution (70/20/10):
                  </h3>
                  <div className="flex gap-4 text-xs text-gray-700">
                    <div>
                      <span className="font-medium">Founder:</span> 70
                    </div>
                    <div>
                      <span className="font-medium">Top Contributor:</span> 20
                    </div>
                    <div>
                      <span className="font-medium">Community:</span> 10
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {brands.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No brands available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
