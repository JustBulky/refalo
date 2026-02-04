/**
 * Smart Link Router - Implements the 70/20/10 distribution strategy
 * 
 * Distribution Strategy:
 * - 70% Community codes (high-ranking, verified)
 * - 20% Founder codes (your codes for passive income)
 * - 10% Featured/Paid codes (premium placement)
 */

import { ReferralLink } from '@prisma/client';

export type LinkSelectionStrategy = '70/20/10' | 'founder-only' | 'community-only';

interface WeightedLink extends ReferralLink {
  normalizedWeight?: number;
}

/**
 * Select a referral link using weighted random distribution
 */
export function selectReferralLink(
  links: ReferralLink[],
  strategy: LinkSelectionStrategy = '70/20/10'
): ReferralLink | null {
  if (!links || links.length === 0) return null;

  // Separate links by type
  const founderLinks = links.filter(link => link.isFounder);
  const communityLinks = links.filter(link => !link.isFounder && link.weight >= 10);
  const featuredLinks = links.filter(link => !link.isFounder && link.weight >= 50);

  // Strategy: 70/20/10 distribution
  if (strategy === '70/20/10') {
    const rand = Math.random();

    if (rand < 0.70 && communityLinks.length > 0) {
      // 70% - Community codes
      return selectWeightedRandom(communityLinks);
    } else if (rand < 0.90 && founderLinks.length > 0) {
      // 20% - Founder codes
      return selectWeightedRandom(founderLinks);
    } else if (featuredLinks.length > 0) {
      // 10% - Featured codes
      return selectWeightedRandom(featuredLinks);
    }

    // Fallback to any available link
    return selectWeightedRandom(links);
  }

  // Strategy: Founder only
  if (strategy === 'founder-only' && founderLinks.length > 0) {
    return selectWeightedRandom(founderLinks);
  }

  // Strategy: Community only
  if (strategy === 'community-only' && communityLinks.length > 0) {
    return selectWeightedRandom(communityLinks);
  }

  // Default fallback
  return selectWeightedRandom(links);
}

/**
 * Select a random link based on weight
 * Higher weight = higher probability of selection
 */
function selectWeightedRandom(links: ReferralLink[]): ReferralLink | null {
  if (!links || links.length === 0) return null;
  if (links.length === 1) return links[0];

  // Calculate total weight
  const totalWeight = links.reduce((sum, link) => sum + (link.weight || 10), 0);

  // Generate random number between 0 and totalWeight
  let random = Math.random() * totalWeight;

  // Select link based on cumulative weight
  for (const link of links) {
    random -= link.weight || 10;
    if (random <= 0) {
      return link;
    }
  }

  // Fallback to last link
  return links[links.length - 1];
}

/**
 * Get display order for links (for showing in UI)
 * Founder links appear as "Community Pick" or "Verified Top Contributor"
 */
export function getDisplayLinks(
  links: ReferralLink[],
  limit: number = 10
): Array<ReferralLink & { displayLabel?: string }> {
  // Sort by weight and clicks
  const sorted = [...links].sort((a, b) => {
    const scoreA = (a.weight || 10) * 0.7 + (a.clicks || 0) * 0.3;
    const scoreB = (b.weight || 10) * 0.7 + (b.clicks || 0) * 0.3;
    return scoreB - scoreA;
  });

  // Add display labels
  return sorted.slice(0, limit).map((link) => {
    let displayLabel = undefined;
    
    if (link.isFounder) {
      // Rotate between labels to avoid detection
      const labels = [
        'Verified Top Contributor',
        'Community Pick',
        "Editor's Choice",
      ];
      displayLabel = labels[Math.floor(Math.random() * labels.length)];
    } else if (link.weight >= 50) {
      displayLabel = 'Featured';
    }

    return {
      ...link,
      displayLabel,
    };
  });
}

/**
 * Calculate success rate for a link (for verification system)
 */
export function calculateSuccessRate(
  clicks: number,
  successfulUses: number
): number {
  if (clicks === 0) return 0;
  return Math.round((successfulUses / clicks) * 100);
}
