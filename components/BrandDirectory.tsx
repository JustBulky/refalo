'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brand, ReferralLink } from '@prisma/client';

interface BrandWithData extends Brand {
  referralLinks: ReferralLink[];
  _count: { clicks: number };
}

interface BrandDirectoryProps {
  brands: BrandWithData[];
  categories: string[];
}

export default function BrandDirectory({ brands, categories }: BrandDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = brands.filter((brand) => {
    const matchesCategory =
      selectedCategory === 'All' || brand.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredBrands.length} of {brands.length} brands
      </div>

      {/* Brand Grid */}
      {filteredBrands.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No brands found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => {
            const hasFounderCode = brand.referralLinks.some((link) => link.isFounder);

            return (
              <Link
                key={brand.id}
                href={`/referral/${brand.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    {brand.logoUrl && (
                      <img
                        src={brand.logoUrl}
                        alt={`${brand.name} logo`}
                        className="w-16 h-16 rounded-lg object-contain"
                      />
                    )}
                    {hasFounderCode && (
                      <span className="text-xl" title="Has founder code">
                        ⭐
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {brand.name}
                  </h3>

                  {brand.category && (
                    <div className="mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {brand.category}
                      </span>
                    </div>
                  )}

                  {brand.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {brand.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <span>{brand._count.clicks} clicks</span>
                    <span className="text-blue-600 font-medium group-hover:text-blue-700">
                      Get Referral Link →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
