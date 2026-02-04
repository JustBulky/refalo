# Deployment Instructions - Refalo Phase 1

## 🎯 What's Been Built

Phase 1 is complete with these features:
- ✅ Smart link routing (70/20/10 distribution)
- ✅ Brand detail pages with SEO
- ✅ Click tracking and analytics
- ✅ Admin dashboard
- ✅ Add founder codes interface
- ✅ Homepage with brand directory

## 📦 Files to Upload to Your Server

Replace these files in your existing deployment:

### New/Updated Files:
```
app/
  ├── referral/[slug]/page.tsx         # NEW - Brand detail pages
  ├── admin/
  │   ├── page.tsx                     # UPDATED - Admin dashboard
  │   └── codes/add/page.tsx           # NEW - Add founder codes
  └── api/
      ├── admin/codes/route.ts         # NEW - Code management API
      └── click/[slug]/route.ts        # NEW - Smart redirect handler

components/
  ├── BrandDirectory.tsx               # NEW - Homepage grid
  ├── GetReferralButton.tsx            # NEW - CTA button
  ├── ReferralLinkCard.tsx             # NEW - Code display
  └── admin/
      ├── AdminStats.tsx               # NEW - Dashboard stats
      ├── AddCodeForm.tsx              # NEW - Add code form
      └── BrandManagementTable.tsx     # NEW - Brand table

lib/
  ├── prisma.ts                        # NEW - DB client
  └── link-router.ts                   # NEW - Smart routing logic
```

## 🚀 Deployment Steps

### Step 1: Backup Current Site
```bash
ssh -p 65002 u838421969@147.79.120.53
cd ~/refalo-v2
tar -czf backup-$(date +%Y%m%d).tar.gz .
```

### Step 2: Upload New Files

**Option A: Via Git (Recommended)**
```bash
# On your local machine
cd refalo-build
git add .
git commit -m "Phase 1: Smart routing & admin panel"
git push

# On server
ssh -p 65002 u838421969@147.79.120.53
cd ~/refalo-v2
git pull
```

**Option B: Via SFTP**
1. Connect to: 147.79.120.53:65002
2. Upload all files from `/home/claude/refalo-build/` to `~/refalo-v2/`
3. Overwrite existing files

### Step 3: Install Dependencies & Rebuild
```bash
ssh -p 65002 u838421969@147.79.120.53
cd ~/refalo-v2

# Install any new dependencies
npm install

# Regenerate Prisma client (important!)
npx prisma generate

# Rebuild the app
npm run build

# Restart the app
pm2 restart refalo-v2
```

### Step 4: Verify Deployment
Visit these URLs to test:

1. **Homepage**: https://refalo.io
   - Should show brand directory with search/filter

2. **Brand Page**: https://refalo.io/referral/robinhood
   - Should show Robinhood details
   - "Get Referral Link" button should work

3. **Admin Dashboard**: https://refalo.io/admin
   - Should show stats and brand list

4. **Add Code**: https://refalo.io/admin/codes/add
   - Try adding a founder code for testing

5. **Test Smart Routing**: 
   ```bash
   # Click this URL multiple times - should go to different codes
   curl -I https://refalo.io/api/click/robinhood
   ```

## 🎯 Quick Win: Add Your First Founder Code

1. Go to: https://refalo.io/admin/codes/add

2. Select "Robinhood" (or your preferred brand)

3. Add your referral URL:
   - Example: `https://join.robinhood.com/yourname`

4. Set display name: "Refalo Team"

5. Set weight: 20 (for 20% traffic) or 50 (for more aggressive)

6. Submit

7. Test it works:
   - Visit: https://refalo.io/referral/robinhood
   - Click "Get Referral Link" multiple times
   - Every ~5th click should use YOUR code!

## 📊 Monitoring Performance

### Check Admin Dashboard
```
https://refalo.io/admin
```
Shows:
- Total clicks
- Founder code clicks
- Click breakdown by brand
- Recent activity

### Database Queries (Advanced)
```bash
ssh -p 65002 u838421969@147.79.120.53
cd ~/refalo-v2
sqlite3 prisma/production.db

# See all founder codes
SELECT b.name, r.userName, r.clicks 
FROM ReferralLink r 
JOIN Brand b ON r.brandId = b.id 
WHERE r.isFounder = 1;

# See total clicks by brand
SELECT b.name, COUNT(*) as clicks 
FROM Click c 
JOIN Brand b ON c.brandId = b.id 
GROUP BY b.name 
ORDER BY clicks DESC;

# Exit
.quit
```

## 🐛 Common Issues

### Issue: "Prisma Client not found"
```bash
cd ~/refalo-v2
npx prisma generate
npm run build
pm2 restart refalo-v2
```

### Issue: "Module not found"
```bash
cd ~/refalo-v2
rm -rf node_modules .next
npm install
npm run build
pm2 restart refalo-v2
```

### Issue: Brand pages return 404
```bash
# Rebuild to generate static pages
cd ~/refalo-v2
npm run build
pm2 restart refalo-v2
```

### Issue: Clicks not recording
Check logs:
```bash
pm2 logs refalo-v2 --lines 100
```

## 🎨 Customization Options

### Change Founder Traffic Share
Edit `lib/link-router.ts` line 28:
```typescript
if (rand < 0.70 && communityLinks.length > 0) {
  // Change 0.70 to 0.60 for 30% founder traffic
  // Change 0.70 to 0.50 for 40% founder traffic
```

### Update Founder Code Labels
Edit `lib/link-router.ts` line 86-90:
```typescript
const labels = [
  'Verified Top Contributor',
  'Community Pick',
  "Editor's Choice",
  // Add your own labels here
];
```

### Adjust Weight Defaults
Edit `app/admin/codes/add/page.tsx` to change default weight.

## 📈 Next Revenue Steps

### 1. Add High-Value Founder Codes
Priority brands for best ROI:
- Robinhood ($5-$200 free stock)
- Coinbase ($10+ crypto bonus)
- SoFi ($50-$500 depending on product)
- Shopify ($150 per sale)
- HelloFresh ($10-$40 per box)

### 2. Drive Traffic
- Share on Reddit: r/referralcodes, r/signupsforpay
- Create content: "Best [Brand] Referral Codes 2026"
- Social media: Twitter, Instagram with brand hashtags
- SEO: Brand pages already optimized!

### 3. Track & Optimize
- Check admin daily
- Adjust weights based on performance
- Add more brands that convert well

## ✅ Deployment Checklist

- [ ] Backup current site
- [ ] Upload new files
- [ ] Run `npm install`
- [ ] Run `npx prisma generate`
- [ ] Run `npm run build`
- [ ] Restart with `pm2 restart refalo-v2`
- [ ] Test homepage loads
- [ ] Test brand page (e.g., /referral/robinhood)
- [ ] Test admin dashboard (/admin)
- [ ] Add first founder code
- [ ] Test click redirect works
- [ ] Check PM2 logs for errors
- [ ] Verify SSL still works

## 🎉 Success Metrics

After 24 hours, you should see:
- Brand pages indexed by Google
- First clicks coming in
- Founder codes getting traffic
- Analytics showing in admin

After 1 week:
- 50-100 organic clicks (if you promote)
- 10-20 clicks on your founder codes
- First commissions/bonuses earned

## 📞 Support

If you run into issues:
1. Check PM2 logs: `pm2 logs refalo-v2`
2. Check this file for common issues
3. Database reset if needed (see troubleshooting section in main README)

---

**Deploy Date**: [Today's Date]
**Version**: Phase 1 Complete
**Status**: Ready for Production ✅
