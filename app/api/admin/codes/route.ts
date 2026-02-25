import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/codes
 * Add a new referral code (founder or community)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandId, url, userName, isFounder, weight } = body;

    // Validation
    if (!brandId || !url || !userName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Check if brand exists
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      );
    }

    // If founder code, check if one already exists
    if (isFounder) {
      const existingFounderCode = await prisma.referralLink.findFirst({
        where: {
          brandId,
          isFounder: true,
        },
      });

      if (existingFounderCode) {
        return NextResponse.json(
          { error: 'A founder code already exists for this brand' },
          { status: 400 }
        );
      }
    }

    // Create the referral link
    const referralLink = await prisma.referralLink.create({
      data: {
        brandId,
        url,
        userName,
        isFounder: isFounder || false,
        weight: weight || 10,
      },
    });

    return NextResponse.json({ success: true, referralLink }, { status: 201 });

  } catch (error) {
    console.error('Error creating referral link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/codes
 * Get all referral codes
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const brandId = searchParams.get('brandId');
    const isFounder = searchParams.get('isFounder');

    const where: any = {};
    
    if (brandId) {
      where.brandId = brandId;
    }
    
    if (isFounder !== null) {
      where.isFounder = isFounder === 'true';
    }

    const codes = await prisma.referralLink.findMany({
      where,
      include: {
        brand: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ codes });

  } catch (error) {
    console.error('Error fetching codes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
