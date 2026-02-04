# Refalo Quick Reference Card

## 🚀 Common Commands

### Deploy Updates
```bash
ssh -p 65002 u838421969@147.79.120.53
cd ~/refalo-v2
git pull
npm install
npx prisma generate
npm run build
pm2 restart refalo-v2
```

### Check Status
```bash
pm2 status
pm2 logs refalo-v2
pm2 monit
```

### Database Queries
```bash
cd ~/refalo-v2
sqlite3 prisma/production.db

-- See all founder codes
SELECT b.name, r.url, r.clicks FROM ReferralLink r 
JOIN Brand b ON r.brandId = b.id WHERE r.isFounder = 1;

-- Total clicks today
SELECT COUNT(*) FROM Click 
WHERE date(createdAt) = date('now');

-- Top performing brands
SELECT b.name, COUNT(*) as clicks FROM Click c 
JOIN Brand b ON c.brandId = b.id 
GROUP BY b.name ORDER BY clicks DESC LIMIT 10;

.quit
```

## 📍 Important URLs

### Public
- Homepage: https://refalo.io
- Example Brand: https://refalo.io/referral/robinhood
- Click API: https://refalo.io/api/click/robinhood

### Admin
- Dashboard: https://refalo.io/admin
- Add Code: https://refalo.io/admin/codes/add

## 🎯 Quick Tasks

### Add a Founder Code
1. Visit: https://refalo.io/admin/codes/add
2. Select brand
3. Paste your referral URL
4. Set weight: 20 (balanced) or 50 (aggressive)
5. Submit

### Check Performance
1. Visit: https://refalo.io/admin
2. See total clicks
3. Check "Recent Clicks" table
4. Look for "Founder" badge = your clicks!

### Test Smart Routing
```bash
# Run this 10 times, see different results
curl -I https://refalo.io/api/click/robinhood
```

### Add a New Brand
Via admin panel (when built) or via code:
```typescript
await prisma.brand.create({
  data: {
    name: "Brand Name",
    slug: "brand-name",
    category: "Finance",
    description: "Description here",
    logoUrl: "https://logo.clearbit.com/brand.com",
    isActive: true,
  },
});
```

## 🔢 Key Numbers

### Traffic Distribution
- 70% → Community codes
- 20% → Your founder codes
- 10% → Featured codes

### Weight System
- 10 = Standard community code
- 20 = Founder code (recommended)
- 50 = High priority
- 100 = Maximum priority

### Expected Performance
- 10,000 visitors/month
- 2% conversion = 200 clicks
- 20% to your codes = 40 clicks
- $50 avg commission = $2,000/month

## 💰 High-Value Brands

Add these first:
1. Robinhood - $5-$200
2. SoFi - $50-$500
3. Coinbase - $10+
4. Shopify - $150
5. Webull - $5-$200
6. HelloFresh - $10-$40
7. Chase - $200+
8. Capital One - $100+
9. Acorns - $5-$50
10. M1 Finance - $30-$100

## 🐛 Troubleshooting

### Site won't load
```bash
pm2 restart refalo-v2
pm2 logs refalo-v2 --lines 50
```

### Clicks not recording
```bash
# Check database
sqlite3 ~/refalo-v2/prisma/production.db
SELECT COUNT(*) FROM Click;
.quit
```

### Prisma errors
```bash
cd ~/refalo-v2
npx prisma generate
npm run build
pm2 restart refalo-v2
```

### Complete reset
```bash
cd ~/refalo-v2
rm -rf .next node_modules
npm install
npm run build
pm2 restart refalo-v2
```

## 📊 Daily Routine

### Morning (5 min)
1. Check https://refalo.io/admin
2. Note total clicks
3. Check which codes got clicks
4. Identify top-performing brands

### Weekly (30 min)
1. Add 5-10 new founder codes
2. Adjust weights based on performance
3. Check for dead/broken links
4. Add 2-3 new brands if needed

### Monthly (2 hours)
1. Full performance review
2. Calculate actual revenue
3. Optimize weight distribution
4. Plan content/marketing for next month
5. Add high-performing brands

## 🎨 Customization

### Change Distribution %
Edit `lib/link-router.ts`:
```typescript
if (rand < 0.70) { // 70% community
  // Change to 0.60 for 30% founder
  // Change to 0.50 for 40% founder
```

### Change Founder Labels
Edit `lib/link-router.ts`:
```typescript
const labels = [
  'Verified Top Contributor',
  'Community Pick',
  "Editor's Choice",
  // Add your own
];
```

### Add Category
Edit any brand:
```typescript
category: "New Category"
```

## 📞 Emergency Contacts

### Server
- Host: 147.79.120.53
- Port: 65002
- User: u838421969

### Logs Location
- `/home/u838421969/refalo-v2/.pm2/logs/`
- `pm2 logs refalo-v2`

### Database Location
- `/home/u838421969/refalo-v2/prisma/production.db`

## ✅ Daily Checklist

- [ ] Check admin dashboard
- [ ] Verify site is up
- [ ] Note new clicks
- [ ] Check for errors in logs
- [ ] Add 1-2 new codes if needed

## 🎯 Goals

### Week 1
- [ ] Add 20 founder codes
- [ ] Get first 100 clicks
- [ ] Earn first commission

### Month 1
- [ ] 50 founder codes
- [ ] 1,000 total clicks
- [ ] $500+ in commissions

### Month 3
- [ ] All top brands covered
- [ ] 10,000 total clicks
- [ ] $2,000/month passive income

---

Keep this file handy! It has everything you need for daily operations.
