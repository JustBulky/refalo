'use client';

interface AdminStatsProps {
  totalBrands: number;
  totalLinks: number;
  totalClicks: number;
  founderLinks: number;
}

export default function AdminStats({
  totalBrands,
  totalLinks,
  totalClicks,
  founderLinks,
}: AdminStatsProps) {
  const founderPercentage = totalClicks > 0 
    ? Math.round((founderLinks / totalLinks) * 100) 
    : 0;

  const stats = [
    {
      label: 'Total Brands',
      value: totalBrands,
      icon: '🏢',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Referral Links',
      value: totalLinks,
      icon: '🔗',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      label: 'Total Clicks',
      value: totalClicks.toLocaleString(),
      icon: '👆',
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Founder Codes',
      value: `${founderLinks} (${founderPercentage}%)`,
      icon: '⭐',
      color: 'bg-yellow-100 text-yellow-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
        </div>
      ))}
    </div>
  );
}
