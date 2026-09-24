export function getAffiliateUrl(slug: string): string | null {
  const map: Record<string, string | undefined> = {
    nordvpn: process.env.AFFILIATE_NORDVPN,
    acorns: process.env.AFFILIATE_ACORNS,
    hellofresh: process.env.AFFILIATE_HELLOFRESH,
    hostinger: process.env.AFFILIATE_HOSTINGER,
    dynadot: process.env.AFFILIATE_DYNADOT,
    sofi: process.env.AFFILIATE_SOFI,
    robinhood: process.env.AFFILIATE_ROBINHOOD,
    clickup: process.env.AFFILIATE_CLICKUP,
    samsung: process.env.AFFILIATE_SAMSUNG,
    gusto: process.env.AFFILIATE_GUSTO,
  };
  return map[slug] ?? null;
}
