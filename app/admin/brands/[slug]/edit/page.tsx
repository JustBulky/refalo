import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditBrandForm from '@/components/admin/EditBrandForm';

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const brand = await prisma.brand.findUnique({
    where: { slug },
    include: {
      referralLinks: {
        orderBy: { weight: 'desc' },
      },
    },
  });

  if (!brand) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Admin
          </a>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit {brand.name}</h1>
          <p className="text-gray-600 mb-8">Update brand details and manage referral links.</p>
          <EditBrandForm brand={brand} referralLinks={brand.referralLinks} />
        </div>
      </div>
    </div>
  );
}
