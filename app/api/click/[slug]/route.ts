import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { selectReferralLink } from '@/lib/link-router';

/**
 * GET /api/click/[slug]
 * 
 * This endpoint:
 * 1. Selects a referral link using the 70/20/10 strategy
 * 2. Records the click in the database
 * 3. Redirects the user to the referral URL
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    // Get brand with all referral links
    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        referralLinks: {
          where: { clicks: { gte: 0 } }, // All active links
        },
      },
    });

    if (!brand || !brand.isActive) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      );
    }

    if (!brand.referralLinks || brand.referralLinks.length === 0) {
      return NextResponse.json(
        { error: 'No referral links available for this brand' },
        { status: 404 }
      );
    }

    // Select link using smart router (70/20/10 distribution)
    const selectedLink = selectReferralLink(brand.referralLinks, '70/20/10');

    if (!selectedLink) {
      return NextResponse.json(
        { error: 'Unable to select referral link' },
        { status: 500 }
      );
    }

    // Get IP address and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Record the click (async, don't wait)
    prisma.click.create({
      data: {
        brandId: brand.id,
        referralLinkId: selectedLink.id,
        ipAddress: ipAddress.split(',')[0].trim(), // First IP if multiple
        userAgent,
      },
    }).catch(console.error); // Log error but don't block redirect

    // Increment click counter on the referral link
    prisma.referralLink.update({
      where: { id: selectedLink.id },
      data: { clicks: { increment: 1 } },
    }).catch(console.error);

    // Redirect to the referral URL
    return NextResponse.redirect(selectedLink.url, 302);

  } catch (error) {
    console.error('Error in click handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/click/[slug]/preview
 * 
 * Preview which link would be selected (for testing)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        referralLinks: true,
      },
    });

    if (!brand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      );
    }

    const selectedLink = selectReferralLink(brand.referralLinks, '70/20/10');

    return NextResponse.json({
      brand: brand.name,
      selectedLink: selectedLink ? {
        id: selectedLink.id,
        userName: selectedLink.userName,
        isFounder: selectedLink.isFounder,
        weight: selectedLink.weight,
        url: selectedLink.url,
      } : null,
      totalLinks: brand.referralLinks.length,
      founderLinks: brand.referralLinks.filter((l: { isFounder: boolean }) => l.isFounder).length,
      communityLinks: brand.referralLinks.filter((l: { isFounder: boolean }) => !l.isFounder).length,
    });

  } catch (error) {
    console.error('Error in preview handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
