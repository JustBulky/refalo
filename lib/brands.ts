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
  // Finance
  {
    slug: "webull",
    name: "Webull",
    domain: "webull.com",
    description:
      "Commission-free stock, ETF, and options trading with advanced charting tools.",
    category: "Finance",
    affiliateEnvKey: "AFFILIATE_WEBULL",
    reward: "Up to 12 free stocks",
    benefits: [
      "Up to 12 free stocks when you open and deposit",
      "Commission-free trading on stocks, ETFs, and options",
      "Advanced real-time data and charting tools",
    ],
    tcUrl: "https://www.webull.com/activity",
  },
  {
    slug: "coinbase",
    name: "Coinbase",
    domain: "coinbase.com",
    description:
      "Leading US cryptocurrency exchange for buying, selling, and staking digital assets.",
    category: "Finance",
    affiliateEnvKey: "AFFILIATE_COINBASE",
    reward: "$10 in Bitcoin on first purchase",
    benefits: [
      "$10 in Bitcoin when you buy or sell $100 or more",
      "Referrer also earns $10 in Bitcoin per qualifying referral",
      "Supports 200+ cryptocurrencies with instant transfers",
    ],
    tcUrl: "https://www.coinbase.com/legal/referral",
  },
  {
    slug: "chime",
    name: "Chime",
    domain: "chime.com",
    description:
      "Fee-free online bank account with early direct deposit and automatic savings features.",
    category: "Finance",
    affiliateEnvKey: "AFFILIATE_CHIME",
    reward: "$100 bonus on first qualifying deposit",
    benefits: [
      "$100 bonus when you receive a qualifying direct deposit",
      "No monthly fees, no minimum balance, no overdraft fees",
      "Get paid up to 2 days early with direct deposit",
    ],
    tcUrl: "https://www.chime.com/referral-program-terms/",
  },
  {
    slug: "cashapp",
    name: "Cash App",
    domain: "cash.app",
    description:
      "Send money, invest in stocks or Bitcoin, and spend with the Cash Card.",
    category: "Finance",
    affiliateEnvKey: "AFFILIATE_CASHAPP",
    reward: "$5–$15 bonus for new users",
    benefits: [
      "New users earn $5–$15 bonus after sending their first payment",
      "Referrer earns a matching bonus per qualifying sign-up",
      "Invest in stocks or Bitcoin with as little as $1",
    ],
    tcUrl: "https://cash.app/legal/referral",
  },
  // Software & Tools
  {
    slug: "notion",
    name: "Notion",
    domain: "notion.so",
    description:
      "All-in-one workspace for notes, docs, wikis, and project management.",
    category: "Software & Tools",
    affiliateEnvKey: "AFFILIATE_NOTION",
    reward: "$10 credit for you + referrer",
    benefits: [
      "$10 Notion credit for both you and the person who referred you",
      "Works on Plus, Business, and AI plans",
      "Generous free tier — unlimited pages and blocks",
    ],
    tcUrl: "https://www.notion.so/referral",
  },
  {
    slug: "dropbox",
    name: "Dropbox",
    domain: "dropbox.com",
    description:
      "Cloud storage and file sync platform for individuals and teams.",
    category: "Software & Tools",
    affiliateEnvKey: "AFFILIATE_DROPBOX",
    reward: "500 MB–32 GB free storage",
    benefits: [
      "Earn 500 MB of extra storage per referral (up to 32 GB on free plan)",
      "Plus plan referrals earn 1 GB each (up to 32 GB)",
      "Files sync automatically across all your devices",
    ],
    tcUrl: "https://www.dropbox.com/referrals",
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    domain: "grammarly.com",
    description:
      "AI writing assistant that checks grammar, clarity, tone, and plagiarism.",
    category: "Software & Tools",
    affiliateEnvKey: "AFFILIATE_GRAMMARLY",
    reward: "Premium subscription discounts",
    benefits: [
      "Referrer earns cash or credits when friends upgrade to Premium",
      "Real-time grammar, spelling, and style suggestions",
      "Works across browsers, Google Docs, and desktop apps",
    ],
    tcUrl: "https://www.grammarly.com/referral-program",
  },
  // Hosting & Domains
  {
    slug: "namecheap",
    name: "Namecheap",
    domain: "namecheap.com",
    description:
      "Affordable domain registration and web hosting with free WhoisGuard privacy.",
    category: "Hosting & Domains",
    affiliateEnvKey: "AFFILIATE_NAMECHEAP",
    reward: "Discounts on first domain or hosting",
    benefits: [
      "Discounts on your first domain registration",
      "Free WhoisGuard privacy protection on eligible domains",
      "Hosting plans starting under $2/month",
    ],
    tcUrl: "https://www.namecheap.com/referral-program/",
  },
  {
    slug: "cloudflare",
    name: "Cloudflare",
    domain: "cloudflare.com",
    description:
      "CDN, DNS, DDoS protection, and developer platform for fast and secure websites.",
    category: "Hosting & Domains",
    affiliateEnvKey: "AFFILIATE_CLOUDFLARE",
    reward: "Credits toward Workers and Pages",
    benefits: [
      "Free plan covers most personal and small business use cases",
      "Referral credits apply to Workers, Pages, and R2 usage",
      "Domain registration at cost — no markup over ICANN fees",
    ],
    tcUrl: "https://www.cloudflare.com/referral-program/",
  },
  // Food & Drink
  {
    slug: "doordash",
    name: "DoorDash",
    domain: "doordash.com",
    description:
      "Food delivery from local restaurants and national chains, delivered fast.",
    category: "Food & Drink",
    affiliateEnvKey: "AFFILIATE_DOORDASH",
    reward: "$10–$20 off your first order",
    benefits: [
      "$10–$20 off your first DoorDash order with a referral code",
      "Referrer earns account credit per qualifying new customer",
      "DashPass subscription unlocks free delivery on eligible orders",
    ],
    tcUrl: "https://help.doordash.com/consumers/s/article/referral-program",
  },
  {
    slug: "instacart",
    name: "Instacart",
    domain: "instacart.com",
    description:
      "Grocery delivery and pickup from hundreds of stores in your area.",
    category: "Food & Drink",
    affiliateEnvKey: "AFFILIATE_INSTACART",
    reward: "Free delivery on first 3 orders",
    benefits: [
      "Free delivery on your first 3 orders with a referral code",
      "Referrer earns credit when the new customer places their first order",
      "Order from multiple stores in one delivery",
    ],
    tcUrl: "https://www.instacart.com/terms",
  },
  // Electronics
  {
    slug: "newegg",
    name: "Newegg",
    domain: "newegg.com",
    description:
      "Tech retailer for PC components, electronics, gaming gear, and peripherals.",
    category: "Electronics",
    affiliateEnvKey: "AFFILIATE_NEWEGG",
    reward: "$10–$25 off first order",
    benefits: [
      "$10–$25 off your first qualifying order",
      "Referrer earns Newegg credit per successful referral",
      "Flash deals and combo discounts on PC components",
    ],
    tcUrl: "https://www.newegg.com/promotions/nepro/refer-a-friend/",
  },
  {
    slug: "backmarket",
    name: "Back Market",
    domain: "backmarket.com",
    description:
      "Refurbished smartphones, laptops, and electronics at up to 70% off retail.",
    category: "Electronics",
    affiliateEnvKey: "AFFILIATE_BACKMARKET",
    reward: "$20 off your first order",
    benefits: [
      "$20 off your first Back Market order",
      "Referrer earns $20 store credit when the order ships",
      "All devices pass a 25-point quality check and come with a warranty",
    ],
    tcUrl: "https://www.backmarket.com/en-us/refer-a-friend",
  },
  // Business
  {
    slug: "freshbooks",
    name: "FreshBooks",
    domain: "freshbooks.com",
    description:
      "Cloud accounting and invoicing software designed for small business owners.",
    category: "Business",
    affiliateEnvKey: "AFFILIATE_FRESHBOOKS",
    reward: "$10 credit + 10% off for referrer",
    benefits: [
      "Referee gets $10 account credit on their first paid month",
      "Referrer earns 10% commission on the first payment",
      "Invoicing, expense tracking, time tracking, and tax reports in one place",
    ],
    tcUrl: "https://www.freshbooks.com/referral-program",
  },
  {
    slug: "shopify",
    name: "Shopify",
    domain: "shopify.com",
    description:
      "E-commerce platform to build and grow your online store with built-in payments.",
    category: "Business",
    affiliateEnvKey: "AFFILIATE_SHOPIFY",
    reward: "3-day free trial + first month for $1",
    benefits: [
      "3-day free trial, then pay only $1/month for your first 3 months",
      "Partner referrals earn recurring commission on referred merchant revenue",
      "Built-in payments, analytics, and 8,000+ app integrations",
    ],
    tcUrl: "https://www.shopify.com/affiliates",
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
