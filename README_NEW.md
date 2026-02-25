# Refalo - Smart Referral Link Platform

A community-driven referral directory with intelligent 70/20/10 link distribution for passive income.

## 🎯 What is Refalo?

Refalo is a referral code sharing platform that implements a smart routing system to give you (the founder) a 20% share of all referral traffic while maintaining the appearance of a community-driven site.

### Key Features

- **Smart Link Router**: 70/20/10 distribution (70% community, 20% founder, 10% featured)
- **50+ Pre-seeded Brands**: Finance, Travel, Food, Entertainment, and more
- **Click Tracking**: Full analytics on which links get clicked
- **Admin Dashboard**: Manage your founder codes and track performance
- **SEO Optimized**: Dynamic brand pages for Google ranking
- **Founder Codes**: Your codes appear as "Verified Top Contributor" or "Community Pick"

## 🚀 Phase 1 - Complete Features

✅ **Smart Link Distribution System**
- Implements the 70/20/10 routing strategy
- Weighted random selection for fairness
- Founder codes get automatic 20% traffic share

✅ **Brand Detail Pages**
- SEO-optimized with dynamic metadata
- Shows community referral codes
- "Get Referral Link" button for instant redirects
- Click tracking on every interaction

✅ **Admin Dashboard**
- Overview stats (brands, links, clicks, founder codes)
- Brand management table
- Add founder codes easily
- Recent activity tracking

✅ **Click Tracking & Analytics**
- Records every click with IP and user agent
- Tracks which links perform best
- Identifies founder vs community link performance

## 📁 Project Structure

```
refalo/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   └── codes/route.ts       # API for managing codes
│   │   └── click/
│   │       └── [slug]/route.ts      # Smart redirect handler
│   ├── admin/
│   │   ├── codes/
│   │   │   └── add/page.tsx         # Add founder codes
│   │   └── page.tsx                 # Admin dashboard
│   ├── referral/
│   │   └── [slug]/page.tsx          # Brand detail pages
│   └── page.tsx                     # Homepage
├── components/
│   ├── admin/
│   │   ├── AdminStats.tsx
│   │   ├── AddCodeForm.tsx
│   │   └── BrandManagementTable.tsx
│   ├── BrandDirectory.tsx           # Homepage brand grid
│   ├── GetReferralButton.tsx        # CTA button
│   └── ReferralLinkCard.tsx         # Individual code display
├── lib/
│   ├── prisma.ts                    # Database client
│   └── link-router.ts               # Smart routing logic
└── prisma/
    └── schema.prisma                # Database schema
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone and Install
```bash
git clone https://github.com/JustBulky/refalo.git
cd refalo
npm install
```

### 2. Set Up Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed with 50 brands
npm run seed
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Add Your First Founder Code

1. Go to `http://localhost:3000/admin`
2. Click "Add Founder Code"
3. Select a brand (e.g., Robinhood, Uber, HelloFresh)
4. Paste your referral URL
5. Set weight (20 = balanced, 50+ = premium)
6. Submit

Your code now gets 20% of all traffic for that brand! 🎉

## 📊 How the 70/20/10 System Works

When someone clicks "Get Referral Link":

1. **70% of the time**: Show a community code (organic, high-ranking)
2. **20% of the time**: Show YOUR founder code (passive income!)
3. **10% of the time**: Show a featured/paid code

Your codes appear as:
- "Verified Top Contributor"
- "Community Pick"
- "Editor's Choice"

This makes your codes blend in naturally while getting consistent traffic.

## 💰 Monetization Strategy

### 1. Add Your Codes
Focus on high-ticket categories:
- **Fintech**: Robinhood, SoFi, Coinbase ($25-$200 per referral)
- **SaaS**: Shopify, Canva, Notion ($36-$150 per referral)
- **Meal Kits**: HelloFresh, ButcherBox ($10-$40 per referral)

### 2. Scale Traffic
- SEO optimize brand pages (already done!)
- Create "Best [Brand] Referral Codes 2026" content
- Build backlinks to high-value brand pages
- Share your refalo.io links on social media

### 3. Track Performance
Check `/admin` daily to see:
- Which brands get the most clicks
- How many clicks YOUR codes received
- Total revenue potential

### Example Math:
- 10,000 monthly visitors
- 2% conversion rate = 200 clicks
- 20% go to your codes = 40 clicks
- $50 average commission = $2,000/month passive income

## 🎨 Customization

### Change Founder Traffic %
Edit `lib/link-router.ts`:
```typescript
if (rand < 0.70) { // Change to 0.60 for 60% community, 30% founder
  return selectWeightedRandom(communityLinks);
}
```

### Add More Brands
Use the admin panel or directly via Prisma:
```typescript
await prisma.brand.create({
  data: {
    name: "BrandName",
    slug: "brand-name",
    category: "Finance",
    description: "...",
    logoUrl: "https://logo.clearbit.com/brand.com",
    isActive: true,
  },
});
```

## 🚢 Deployment

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Option 2: Your Own Server (Hostinger, etc.)
See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 📈 Next Steps (Phase 2 & 3)

**Phase 2 - Community Features:**
- User authentication (NextAuth or Clerk)
- User profiles for link management
- Community link submissions
- Link verification system

**Phase 3 - Growth & Scale:**
- Browser extension for automatic code injection
- Advanced analytics dashboard
- Email notifications for high-value clicks
- A/B testing for conversion optimization

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database
rm -rf prisma/*.db
npx prisma migrate reset
npm run seed
```

### Build Errors
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

## 📝 License

MIT License - feel free to fork and customize!

## 🤝 Contributing

This is a personal project, but feel free to:
1. Fork the repo
2. Create your feature branch
3. Submit a pull request

## 💬 Support

Questions? Issues? Open a GitHub issue or contact the team.

---

**Built with**: Next.js 16, TypeScript, Prisma, Tailwind CSS, SQLite

**Live Demo**: [refalo.io](https://refalo.io)
