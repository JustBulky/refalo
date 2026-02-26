import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const brand = await prisma.brand.update({
    where: { slug },
    data: {
      name: body.name,
      description: body.description,
      category: body.category,
      logoUrl: body.logoUrl,
      isActive: body.isActive,
    },
  });
  return NextResponse.json(brand);
}
