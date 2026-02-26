'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReferralLink {
  id: string;
  url: string;
  userName: string;
  isFounder: boolean;
  weight: number;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  category: string | null;
  isActive: boolean;
}

export default function EditBrandForm({
  brand,
  referralLinks,
}: {
  brand: Brand;
  referralLinks: ReferralLink[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState(brand.name);
  const [description, setDescription] = useState(brand.description || '');
  const [category, setCategory] = useState(brand.category || '');
  const [logoUrl, setLogoUrl] = useState(brand.logoUrl || '');
  const [isActive, setIsActive] = useState(brand.isActive);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`/api/admin/brands/${brand.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, category, logoUrl, isActive }),
      });
      if (res.ok) {
        setMessage('Saved successfully!');
        router.refresh();
      } else {
        setMessage('Error saving. Please try again.');
      }
    } catch {
      setMessage('Error saving. Please try again.');
    }
    setSaving(false);
  }

  async function handleDeleteLink(linkId: string) {
    if (!confirm('Delete this referral link?')) return;
    const res = await fetch(`/api/admin/links/${linkId}`, { method: 'DELETE' });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
        <input
          type="text"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
      </div>

      {message && (
        <p className={`text-sm font-medium ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Referral Links</h3>
        {referralLinks.length === 0 ? (
          <p className="text-gray-500 text-sm">No referral links yet.</p>
        ) : (
          <div className="space-y-3">
            {referralLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{link.userName}</span>
                    {link.isFounder && (
                      <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">Founder</span>
                    )}
                    <span className="text-xs text-gray-500">weight: {link.weight}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{link.url}</div>
                </div>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="ml-3 text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        
          <a href={`/admin/codes/add?brand=${brand.slug}`}
          className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
        >
          + Add Referral Link
        </a>
      </div>
    </div>
  );
}
