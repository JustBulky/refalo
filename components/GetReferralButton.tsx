'use client';

import { useState } from 'react';

interface GetReferralButtonProps {
  brandSlug: string;
}

export default function GetReferralButton({ brandSlug }: GetReferralButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Redirect to the click API which will handle link selection and redirect
    window.location.href = `/api/click/${brandSlug}`;
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Getting your link...
        </span>
      ) : (
        '🎁 Get Referral Link & Bonus'
      )}
    </button>
  );
}
