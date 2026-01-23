# 🛠️ SCRIPTS DOCUMENTATION

This folder contains all build scripts, optimization tools, and indexing utilities for the Inchtomilez website.

---

## 📚 TABLE OF CONTENTS

1. [Build Scripts](#-build-scripts)
2. [Indexing Scripts](#-indexing-scripts-new)
3. [SEO Scripts](#-seo-scripts)
4. [Diagnostics Scripts](#-diagnostics-scripts)
5. [Testing Scripts](#-testing-scripts)

---

## 🏗️ BUILD SCRIPTS

### **build-ssg.js**
Complete SSG (Static Site Generation) build process

**Usage:**
```bash
npm run build
```

**What it does:**
1. Runs Vite build
2. Executes react-snap for pre-rendering
3. Generates static HTML for all pages
4. Outputs to `/dist` folder

**Duration:** 10-15 minutes (pre-renders 59 main pages)

---

### **build-ssg-blog.js** (if exists)
Extended build that includes blog posts

**Usage:**
```bash
npm run build:blog
```

**What it does:**
- Pre-renders blog detail pages
- Slower but better for SEO

---

## 🔍 INDEXING SCRIPTS (NEW!)

### **generate-sitemap.js** ⭐
**CRITICAL FOR INDEXING**

Generates complete sitemap.xml with ALL 313 pages including blog posts.

**Usage:**
```bash
npm run sitemap
```

**What it does:**
1. Scans `/components/data/blogData.tsx` for blog posts
2. Extracts all blog titles, slugs, and categories
3. Converts to proper URL format
4. Adds all static pages (services, industries, etc)
5. Updates lastmod dates to TODAY
6. Outputs to `/public/sitemap.xml`

**Output:**
```
✅ Sitemap generated successfully!
📊 STATISTICS:
   • Total URLs: 313
   • Blog Posts: 224
   • Static Pages: 89
   • Last Modified: 2025-12-23
```

**Critical:** This MUST be run before deploying if you've added new blog posts or pages.

---

### **fix-indexing.js** ⭐
**COMPREHENSIVE INDEXING DIAGNOSTICS**

Analyzes your entire site for indexing issues and provides actionable fixes.

**Usage:**
```bash
npm run indexing:fix
```

**What it checks:**
1. ✅ **Sitemap completeness** - Are all pages included?
2. ✅ **robots.txt validation** - Properly configured?
3. ✅ **Blog data integrity** - All posts have SEO fields?
4. ✅ **SEO system** - All exports present?
5. ✅ **Internal linking** - Proper link structure?
6. ✅ **Pre-rendering** - Pages pre-rendered?
7. ✅ **IndexNow setup** - API key configured?

**Output:**
```
🔍 INDEXING DIAGNOSTICS & FIX TOOL
═══════════════════════════════════
   Score: 85/100

🚨 CRITICAL ISSUES:
1. [HIGH] Incomplete sitemap
   Fix: Run node scripts/generate-sitemap.js
   Impact: Google cannot discover all pages

💡 RECOMMENDATIONS:
1. [MEDIUM] Blog posts not pre-rendered
   Fix: Add top 50 blog posts to react-snap config
   Impact: Slower indexing for new content
```

---

### **indexnow-submit.js** ⭐
**INSTANT INDEXING VIA INDEXNOW API**

Forces immediate submission of ALL pages to search engines.

**Usage:**
```bash
npm run indexing:submit
```

**What it does:**
1. Creates IndexNow API key file
2. Extracts all URLs from sitemap.xml
3. Submits to Bing (shares with Google)
4. Submits to Yandex
5. Notifies search engines instantly

**Output:**
```
✅ SUCCESS!
   Total URLs submitted: 313
   Successful submissions: 2
   Expected indexing: 1-24 hours
```

**Search Engines:**
- ✅ Bing (shares data with Google)
- ✅ Yandex
- ✅ Seznam.cz (auto-included)
- ✅ Naver (auto-included)

**Note:** Google doesn't directly support IndexNow, but Bing shares discovered URLs with Google.

---

### **npm run indexing:full** ⭐⭐⭐
**ONE-COMMAND FIX FOR EVERYTHING**

Runs all indexing scripts in sequence.

**Usage:**
```bash
npm run indexing:full
```

**What it does:**
```bash
# Equivalent to:
npm run sitemap          # Generate sitemap
npm run indexing:fix     # Run diagnostics
npm run indexing:submit  # Submit to IndexNow
```

**This is the FASTEST way to fix all indexing issues!**

---

## 🎯 SEO SCRIPTS

### **generate-all-routes.js**
Generates list of all routes for react-snap pre-rendering.

**Usage:**
```bash
npm run routes
```

**Output:**
- Creates route list for react-snap
- Used internally by build process

---

## 🔬 DIAGNOSTICS SCRIPTS

### **verify-ssg.js**
Verifies SSG build output.

**Usage:**
```bash
npm run verify
```

**What it checks:**
- All expected HTML files generated
- No broken pre-rendered pages
- Correct file structure in /dist

---

### **diagnose-ssg.js**
Detailed SSG diagnostics.

**Usage:**
```bash
npm run diagnose
```

**What it checks:**
- Pre-rendering coverage
- Missing pages
- Build errors

---

## 🧪 TESTING SCRIPTS

### **test-supabase.js**
Tests Supabase backend connection.

**Usage:**
```bash
npm run test:supabase
```

**What it tests:**
- Database connectivity
- API endpoints
- Authentication

---

## 📊 RECOMMENDED WORKFLOW

### **For New Blog Posts:**
```bash
# 1. Add blog post to blogData.tsx
# 2. Regenerate sitemap
npm run sitemap

# 3. Build site
npm run build

# 4. Deploy to production
vercel --prod

# 5. Submit to search engines
npm run indexing:submit
```

---

### **For Major SEO Updates:**
```bash
# Run complete indexing fix
npm run indexing:full

# Build and deploy
npm run build
vercel --prod
```

---

### **For Regular Maintenance:**
```bash
# Weekly: Check indexing status
npm run indexing:fix

# Monthly: Regenerate sitemap
npm run sitemap
npm run indexing:submit
```

---

## 🚨 CRITICAL FILES GENERATED

These files are generated by the indexing scripts and MUST be deployed:

### **/public/sitemap.xml**
- Generated by: `generate-sitemap.js`
- Contains: All 313 URLs
- Must be deployed to: `https://www.inchtomilez.com/sitemap.xml`

### **/public/c8e47e9a1f2b4d5c6e8a9b3c5d7e9f1a.txt**
- Generated by: `indexnow-submit.js`
- Contains: IndexNow API key
- Must be deployed to: `https://www.inchtomilez.com/c8e47e9a1f2b4d5c6e8a9b3c5d7e9f1a.txt`

### **/public/indexnow-config.json**
- Generated by: `indexnow-submit.js`
- Contains: IndexNow configuration
- Optional but recommended

---

## 📝 SCRIPT EXECUTION ORDER

**For fresh deployments:**
1. `npm run sitemap` - Generate complete sitemap
2. `npm run build` - Build production site
3. Deploy to hosting
4. `npm run indexing:submit` - Notify search engines

**For updates:**
1. `npm run indexing:fix` - Check for issues
2. Fix any reported issues
3. `npm run sitemap` - Regenerate if needed
4. Deploy updated files

---

## 🎯 TROUBLESHOOTING

### Script fails with "Cannot find module"
**Solution:** Install dependencies
```bash
npm install
```

### "Permission denied" error
**Solution:** Make scripts executable
```bash
chmod +x scripts/*.js
```

### Sitemap shows 0 blog posts
**Solution:** Check blogData.tsx exists and has content
```bash
cat components/data/blogData.tsx | grep -c "id:"
# Should output ~224
```

### IndexNow submission fails
**Solution:** Check network and retry
```bash
# Wait 5 minutes, then:
npm run indexing:submit
```

---

## 📚 DOCUMENTATION

- **Quick Start:** `/QUICK_FIX.md`
- **Detailed Guide:** `/INDEXING_FIX_GUIDE.md`
- **Guidelines:** `/Guidelines.md`

---

## 🆕 RECENTLY ADDED (Dec 23, 2025)

### New Scripts:
- ✅ `generate-sitemap.js` - Auto-generates complete sitemap
- ✅ `fix-indexing.js` - Comprehensive diagnostics
- ✅ `indexnow-submit.js` - Instant indexing

### New Commands:
- ✅ `npm run sitemap` - Generate sitemap
- ✅ `npm run indexing:fix` - Run diagnostics
- ✅ `npm run indexing:submit` - Submit to IndexNow
- ✅ `npm run indexing:full` - All-in-one fix

---

**Status:** ✅ Production Ready  
**Last Updated:** December 23, 2025  
**Maintained by:** Inchtomilez Development Team
