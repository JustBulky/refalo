'use client';

import { ReferralLink } from '@prisma/client';

interface ReferralLinkCardProps {
  link: ReferralLink & { displayLabel?: string };
  brandSlug: string;
}

export default function ReferralLinkCard({ link, brandSlug }: ReferralLinkCardProps) {
  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/api/click/${brandSlug}`;
    navigator.clipboard.writeText(fullUrl);
    
    // Show success feedback (you could add a toast notification here)
    alert('Link copied to clipboard!');
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {link.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{link.userName}</div>
              {link.displayLabel && (
                <div className="text-xs text-blue-600 font-medium">
                  ✓ {link.displayLabel}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{link.clicks} uses</span>
            </div>
            
            {link.weight > 10 && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-yellow-600 font-medium">Top rated</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleCopyLink}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm whitespace-nowrap"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}
