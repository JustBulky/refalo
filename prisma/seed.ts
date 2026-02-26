import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();;

const LAUNCH_50_BRANDS = [
  { name: 'Shopify', slug: 'shopify', description: 'E-commerce platform for online stores', category: 'E-commerce', logoUrl: 'https://logo.clearbit.com/shopify.com' },
  { name: 'Robinhood', slug: 'robinhood', description: 'Commission-free stock trading app', category: 'Finance', logoUrl: 'https://logo.clearbit.com/robinhood.com' },
  { name: 'SoFi', slug: 'sofi', description: 'Personal finance and investing platform', category: 'Finance', logoUrl: 'https://logo.clearbit.com/sofi.com' },
  { name: 'Coinbase', slug: 'coinbase', description: 'Cryptocurrency exchange platform', category: 'Crypto', logoUrl: 'https://logo.clearbit.com/coinbase.com' },
  { name: 'Acorns', slug: 'acorns', description: 'Micro-investing and robo-advisor app', category: 'Finance', logoUrl: 'https://logo.clearbit.com/acorns.com' },
  { name: 'Chime', slug: 'chime', description: 'Mobile banking with no hidden fees', category: 'Finance', logoUrl: 'https://logo.clearbit.com/chime.com' },
  { name: 'Webull', slug: 'webull', description: 'Commission-free trading platform', category: 'Finance', logoUrl: 'https://logo.clearbit.com/webull.com' },
  { name: 'Public', slug: 'public', description: 'Social investing platform', category: 'Finance', logoUrl: 'https://logo.clearbit.com/public.com' },
  { name: 'M1 Finance', slug: 'm1-finance', description: 'Automated investing platform', category: 'Finance', logoUrl: 'https://logo.clearbit.com/m1.com' },
  { name: 'Rakuten', slug: 'rakuten', description: 'Cash back and rewards shopping', category: 'Shopping', logoUrl: 'https://logo.clearbit.com/rakuten.com' },
  { name: 'Ibotta', slug: 'ibotta', description: 'Cash back on groceries and shopping', category: 'Shopping', logoUrl: 'https://logo.clearbit.com/ibotta.com' },
  { name: 'Fetch Rewards', slug: 'fetch-rewards', description: 'Receipt scanning rewards app', category: 'Shopping', logoUrl: 'https://logo.clearbit.com/fetch.com' },
  { name: 'Dosh', slug: 'dosh', description: 'Automatic cash back app', category: 'Shopping', logoUrl: 'https://logo.clearbit.com/dosh.com' },
  { name: 'Drop', slug: 'drop', description: 'Rewards app for everyday purchases', category: 'Shopping', logoUrl: 'https://logo.clearbit.com/earnwithdrop.com' },
  { name: 'Honey', slug: 'honey', description: 'Automatic coupon finder and cash back', category: 'Shopping', logoUrl: 'https://logo.clearbit.com/joinhoney.com' },
  { name: 'Capital One Shopping', slug: 'capital-one-shopping', description: 'Price comparison and rewards', category: 'Shopping', logoUrl: 'https://logo.clearbit.com/capitalone.com' },
  { name: 'Swagbucks', slug: 'swagbucks', description: 'Earn rewards for online activities', category: 'Rewards', logoUrl: 'https://logo.clearbit.com/swagbucks.com' },
  { name: 'Survey Junkie', slug: 'survey-junkie', description: 'Get paid for your opinions', category: 'Rewards', logoUrl: 'https://logo.clearbit.com/surveyjunkie.com' },
  { name: 'InboxDollars', slug: 'inboxdollars', description: 'Earn cash for online tasks', category: 'Rewards', logoUrl: 'https://logo.clearbit.com/inboxdollars.com' },
  { name: 'Uber', slug: 'uber', description: 'Ride-sharing and food delivery', category: 'Transportation', logoUrl: 'https://logo.clearbit.com/uber.com' },
  { name: 'Lyft', slug: 'lyft', description: 'Ride-sharing service', category: 'Transportation', logoUrl: 'https://logo.clearbit.com/lyft.com' },
  { name: 'DoorDash', slug: 'doordash', description: 'Food delivery service', category: 'Food Delivery', logoUrl: 'https://logo.clearbit.com/doordash.com' },
  { name: 'Uber Eats', slug: 'uber-eats', description: 'Food delivery from restaurants', category: 'Food Delivery', logoUrl: 'https://logo.clearbit.com/ubereats.com' },
  { name: 'Grubhub', slug: 'grubhub', description: 'Online food ordering and delivery', category: 'Food Delivery', logoUrl: 'https://logo.clearbit.com/grubhub.com' },
  { name: 'Instacart', slug: 'instacart', description: 'Grocery delivery service', category: 'Food Delivery', logoUrl: 'https://logo.clearbit.com/instacart.com' },
  { name: 'Airbnb', slug: 'airbnb', description: 'Vacation rental marketplace', category: 'Travel', logoUrl: 'https://logo.clearbit.com/airbnb.com' },
  { name: 'Booking.com', slug: 'booking', description: 'Hotel and travel booking platform', category: 'Travel', logoUrl: 'https://logo.clearbit.com/booking.com' },
  { name: 'Expedia', slug: 'expedia', description: 'Travel booking and deals', category: 'Travel', logoUrl: 'https://logo.clearbit.com/expedia.com' },
  { name: 'Chase', slug: 'chase', description: 'Banking and credit card services', category: 'Finance', logoUrl: 'https://logo.clearbit.com/chase.com' },
  { name: 'American Express', slug: 'amex', description: 'Credit cards and financial services', category: 'Finance', logoUrl: 'https://logo.clearbit.com/americanexpress.com' },
  { name: 'Credit Karma', slug: 'credit-karma', description: 'Free credit scores and monitoring', category: 'Finance', logoUrl: 'https://logo.clearbit.com/creditkarma.com' },
  { name: 'NerdWallet', slug: 'nerdwallet', description: 'Personal finance comparison tool', category: 'Finance', logoUrl: 'https://logo.clearbit.com/nerdwallet.com' },
  { name: 'Mint', slug: 'mint', description: 'Personal finance management app', category: 'Finance', logoUrl: 'https://logo.clearbit.com/mint.com' },
  { name: 'YNAB', slug: 'ynab', description: 'Budgeting software', category: 'Finance', logoUrl: 'https://logo.clearbit.com/ynab.com' },
  { name: 'HelloFresh', slug: 'hellofresh', description: 'Meal kit delivery service', category: 'Food', logoUrl: 'https://logo.clearbit.com/hellofresh.com' },
  { name: 'Blue Apron', slug: 'blue-apron', description: 'Meal kit subscription service', category: 'Food', logoUrl: 'https://logo.clearbit.com/blueapron.com' },
  { name: 'ButcherBox', slug: 'butcherbox', description: 'Meat delivery subscription', category: 'Food', logoUrl: 'https://logo.clearbit.com/butcherbox.com' },
  { name: 'Thrive Market', slug: 'thrive-market', description: 'Organic and healthy food marketplace', category: 'Food', logoUrl: 'https://logo.clearbit.com/thrivemarket.com' },
  { name: 'Spotify', slug: 'spotify', description: 'Music streaming service', category: 'Entertainment', logoUrl: 'https://logo.clearbit.com/spotify.com' },
  { name: 'Netflix', slug: 'netflix', description: 'Streaming entertainment service', category: 'Entertainment', logoUrl: 'https://logo.clearbit.com/netflix.com' },
  { name: 'Disney+', slug: 'disney-plus', description: 'Disney streaming platform', category: 'Entertainment', logoUrl: 'https://logo.clearbit.com/disneyplus.com' },
  { name: 'Hulu', slug: 'hulu', description: 'TV and movie streaming', category: 'Entertainment', logoUrl: 'https://logo.clearbit.com/hulu.com' },
  { name: 'Audible', slug: 'audible', description: 'Audiobook subscription service', category: 'Entertainment', logoUrl: 'https://logo.clearbit.com/audible.com' },
  { name: 'Skillshare', slug: 'skillshare', description: 'Online learning community', category: 'Education', logoUrl: 'https://logo.clearbit.com/skillshare.com' },
  { name: 'Coursera', slug: 'coursera', description: 'Online courses and degrees', category: 'Education', logoUrl: 'https://logo.clearbit.com/coursera.org' },
  { name: 'MasterClass', slug: 'masterclass', description: 'Learn from experts and celebrities', category: 'Education', logoUrl: 'https://logo.clearbit.com/masterclass.com' },
  { name: 'Duolingo', slug: 'duolingo', description: 'Language learning app', category: 'Education', logoUrl: 'https://logo.clearbit.com/duolingo.com' },
  { name: 'Headspace', slug: 'headspace', description: 'Meditation and mindfulness app', category: 'Health', logoUrl: 'https://logo.clearbit.com/headspace.com' },
  { name: 'Calm', slug: 'calm', description: 'Sleep and meditation app', category: 'Health', logoUrl: 'https://logo.clearbit.com/calm.com' },
  { name: 'Peloton', slug: 'peloton', description: 'Connected fitness platform', category: 'Health', logoUrl: 'https://logo.clearbit.com/onepeloton.com' },
];

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.click.deleteMany();
  await prisma.referralLink.deleteMany();
  await prisma.brand.deleteMany();

  // Create brands and referral links
  for (const brandData of LAUNCH_50_BRANDS) {
    const brand = await prisma.brand.create({
      data: {
        name: brandData.name,
        slug: brandData.slug,
        description: brandData.description,
        category: brandData.category,
        logoUrl: brandData.logoUrl,
        isActive: true,
      },
    });

    // Create founder link (70% weight)
    await prisma.referralLink.create({
      data: {
        brandId: brand.id,
        url: `https://example.com/ref/${brandData.slug}/founder`,
        userName: 'Founder',
        isFounder: true,
        weight: 70,
      },
    });

    // Create top contributor link (20% weight)
    await prisma.referralLink.create({
      data: {
        brandId: brand.id,
        url: `https://example.com/ref/${brandData.slug}/contributor1`,
        userName: 'TopContributor1',
        isFounder: false,
        weight: 20,
      },
    });

    // Create community link (10% weight)
    await prisma.referralLink.create({
      data: {
        brandId: brand.id,
        url: `https://example.com/ref/${brandData.slug}/community1`,
        userName: 'CommunityUser1',
        isFounder: false,
        weight: 10,
      },
    });

    console.log(`Created brand: ${brand.name}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
