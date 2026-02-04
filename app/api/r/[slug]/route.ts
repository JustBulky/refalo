import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const brand = await prisma.brand.findUnique({
      where: { slug, isActive: true },
      include: {
        referralLinks: {
          orderBy: { weight: 'desc' },
        },
      },
    });

    if (!brand || brand.referralLinks.length === 0) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    const selectedLink = selectReferralLink(brand.referralLinks);

    await prisma.$transaction([
      prisma.referralLink.update({
        where: { id: selectedLink.id },
        data: { clicks: { increment: 1 } },
      }),
      prisma.click.create({
        data: {
          brandId: brand.id,
          referralLinkId: selectedLink.id,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown',
        },
      }),
    ]);

    return NextResponse.redirect(selectedLink.url);
  } catch (error) {
    console.error('Error routing referral:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function selectReferralLink(links: Array<{ id: string; url: string; weight: number }>): { id: string; url: string; weight: number } {
  const totalWeight = links.reduce((sum, link) => sum + link.weight, 0);
  let random = Math.random() * totalWeight;

  for (const link of links) {
    random -= link.weight;
    if (random <= 0) {
      return link;
    }
  }

  return links[0];
}
