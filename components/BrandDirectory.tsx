'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Brand = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  category: string | null;
  referralLinks: Array<{ isFounder: boolean }>;
  _count: { clicks: number };
};

type Props = {
  brands: Brand[];
  categories: string[];
};

export default function BrandDirectory({ brands, categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch =
        searchQuery === '' ||
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === null || brand.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [brands, searchQuery, selectedCategory]);

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8 max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search brands by name, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-sm transition-all"
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
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
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="mb-8">
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          {filteredBrands.length === brands.length
            ? `Showing all ${brands.length} brand${brands.length !== 1 ? 's' : ''}`
            : `Found ${filteredBrands.length} brand${filteredBrands.length !== 1 ? 's' : ''} matching your search`}
        </p>
      </div>

      {/* Brand Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/referral/${brand.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300"
            >
              <div className="flex flex-col h-full">
                {/* Logo Section */}
                {brand.logoUrl ? (
                  <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                    <Image
                      src={brand.logoUrl}
                      alt={`${brand.name} logo`}
                      width={200}
                      height={200}
                      className="object-contain max-h-full w-auto"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <div className="text-5xl font-bold text-gray-300">
                      {brand.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                      {brand.name}
                    </h3>
                    {brand.referralLinks.length > 0 &&
                      brand.referralLinks[0].isFounder && (
                        <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full font-semibold flex-shrink-0 ml-2">
                          ⭐
                        </span>
                      )}
                  </div>

                  {brand.category && (
                    <span className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3 w-fit">
                      {brand.category}
                    </span>
                  )}

                  {brand.description && (
                    <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
                      {brand.description}
                    </p>
                  )}

                  {/* CTA and Stats */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        {brand._count.clicks.toLocaleString()} clicks
                      </span>
                    </div>
                    <button className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors group-hover:shadow-md">
                      Get Referral Link →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No brands found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchQuery || selectedCategory
              ? "We couldn't find any brands matching your search criteria. Try adjusting your filters or search query."
              : "There are no active brands in the directory yet. Check back soon!"}
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
