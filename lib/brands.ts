export type Brand = {
  slug: string;
  name: string;
  domain: string;
  description: string;
  category: string;
  affiliateEnvKey: string;
  reward: string;
  benefits: string[];
  tcUrl: string;
};

export const BRANDS: Brand[] = [
  {
    slug: "nordvpn",
    name: "NordVPN",
    domain: "nordvpn.com",
    description:
      "Industry-leading VPN service with fast speeds, strong encryption, and servers in 60+ countries.",
    category: "Software & Tools",
    affiliateEnvKey: "AFFILIATE_NORDVPN",
    reward: "Up to 72% off + 3 free months",
    benefits: [
      "Up to 72% off + 3 extra months free on 2-year plans",
      "30-day money-back guarantee — no questions asked",
      "Covers up to 10 devices simultaneously",
    ],
    tcUrl: "https://nordvpn.com/legal/",
  },
  {
    slug: "acorns",
    name: "Acorns",
    domain: "acorns.com",
    description:
      "Micro-investing app that rounds up your purchases and invests the spare change automatically.",
    category: "Finance",
    affiliateEnvKey: "AFFILIATE_ACORNS",
    reward: "$5 bonus on first investment",
    benefits: [
      "$5 bonus invested in your account after your first investment",
      "Referrer earns $5 for each friend who joins and completes their first investment",
      "Referred friend also receives $5 bonus — mutual benefit",
    ],
    tcUrl: "https://www.acorns.com/legal/",
  },
  {
    slug: "hellofresh",
    name: "HelloFresh",
    domain: "hellofresh.com",
    description:
      "Meal kit delivery service with chef-designed recipes and pre-portioned fresh ingredients.",
    category: "Food & Drink",
    affiliateEnvKey: "AFFILIATE_HELLOFRESH",
    reward: "Up to $150 off first 5 boxes",
    benefits: [
      "Up to $150 off your first 5 boxes (varies by region and promo)",
      "Free shipping on your first box",
      "Flexible plans — skip, pause, or cancel anytime",
    ],
    tcUrl: "https://www.hellofresh.com/pages/referral-terms",
  },
  {
    slug: "hostinger",
    name: "Hostinger",
    domain: "hostinger.com",
    description:
      "Affordable web hosting with fast performance, easy setup, and 24/7 customer support.",
    category: "Hosting & Domains",
    affiliateEnvKey: "AFFILIATE_HOSTINGER",
    reward: "Free domain + up to 20% commission",
    benefits: [
      "Earn up to 20% commission on referred customer purchases",
      "Referred customers get a free domain name with annual plans",
      "100-day money-back guarantee on most plans",
    ],
    tcUrl: "https://www.hostinger.com/referral-program",
  },
  {
    slug: "dynadot",
    name: "Dynadot",
    domain: "dynadot.com",
    description:
      "Domain registrar and web hosting provider with competitive pricing and easy domain management.",
    category: "Hosting & Domains",
    affiliateEnvKey: "AFFILIATE_DYNADOT",
    reward: "$5 credit on first domain",
    benefits: [
      "$5 account credit when you register your first domain",
      "Referrer earns $5 credit per qualifying signup",
      "Discount pricing on .com, .net, .org, and 500+ TLDs",
    ],
    tcUrl: "https://www.dynadot.com/legal/referral-program-terms.html",
  },
  {
    slug: "sofi",
    name: "SoFi",
    domain: "sofi.com",
    description:
      "Personal finance platform offering loans, investing, banking, and credit cards with member benefits.",
    category: "Finance",
    affiliateEnvKey: "AFFILIATE_SOFI",
    reward: "Up to $300 bonus for new accounts",
    benefits: [
      "Up to $300 bonus for qualifying new accounts",
      "High-yield savings with competitive APY",
      "No account fees and no minimum balance required",
    ],
    tcUrl: "https://www.sofi.com/terms-of-use/",
  },
  {
    slug: "robinhood",
    name: "Robinhood",
    domain: "robinhood.com",
    description:
      "Commission-free investing app for stocks, ETFs, options, and cryptocurrency.",
    category: "Finance",
    affiliateEnvKey: "AFFILIATE_ROBINHOOD",
    reward: "Free stock worth up to $200",
    benefits: [
      "Free stock (valued $5–$200) when you open and fund an account",
      "Referrer earns a free stock for each successful referral",
      "Commission-free trading on stocks, ETFs, options, and crypto",
    ],
    tcUrl: "https://robinhood.com/legal/",
  },
  {
    slug: "clickup",
    name: "ClickUp",
    domain: "clickup.com",
    description:
      "All-in-one productivity platform for tasks, docs, goals, and team collaboration.",
    category: "Software & Tools",
    affiliateEnvKey: "AFFILIATE_CLICKUP",
    reward: "Free plan + referral credits on paid",
    benefits: [
      "Free plan available with unlimited tasks and members",
      "Referral credits or discounts on paid plans for both referrer and referee",
      "Access to 1,000+ integrations including Slack, GitHub, and Zoom",
    ],
    tcUrl: "https://clickup.com/terms",
  },
  {
    slug: "samsung",
    name: "Samsung",
    domain: "samsung.com",
    description:
      "Shop the latest Samsung phones, TVs, appliances, and accessories with exclusive referral savings.",
    category: "Electronics",
    affiliateEnvKey: "AFFILIATE_SAMSUNG",
    reward: "$50 off for you + $50 credit for referrer",
    benefits: [
      "$50 off for the referee on a purchase of $500 or more",
      "Referrer earns $50 Samsung Credit per qualifying referral",
      "Works on smartphones, TVs, monitors, and home appliances",
    ],
    tcUrl: "https://www.samsung.com/us/smartphones/referral/terms-and-conditions/",
  },
  {
    slug: "gusto",
    name: "Gusto",
    domain: "gusto.com",
    description:
      "Payroll, benefits, and HR platform built for small businesses and their teams.",
    category: "Business",
    affiliateEnvKey: "AFFILIATE_GUSTO",
    reward: "3 months free + $300–$500 gift card",
    benefits: [
      "Referrer earns $300–$500 gift card after referee runs first payroll",
      "Referee gets 3 months free on their Gusto subscription",
      "Full-service payroll, tax filing, and benefits management",
    ],
    tcUrl: "https://gusto.com/referrals",
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
