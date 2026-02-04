import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { linkId, weight } = await request.json();

    if (!linkId || weight === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedLink = await prisma.referralLink.update({
      where: { id: linkId },
      data: { weight: parseInt(weight) },
    });

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Error updating weight:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
