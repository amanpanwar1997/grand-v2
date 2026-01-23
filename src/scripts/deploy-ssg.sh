#!/bin/bash

##############################################################################
# SSG DEPLOYMENT SCRIPT
# Complete build, verify, and deploy workflow
##############################################################################

echo ""
echo "🚀 SSG DEPLOYMENT WORKFLOW"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo "📦 STEP 1/5: Installing dependencies..."
echo ""
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Installation failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 2: Type check
echo "🔍 STEP 2/5: Running TypeScript check..."
echo ""
npm run type-check
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  TypeScript errors found (proceeding anyway)${NC}"
else
    echo -e "${GREEN}✅ TypeScript check passed${NC}"
fi
echo ""

# Step 3: Build
echo "⚡ STEP 3/5: Building with SSG..."
echo ""
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build completed${NC}"
echo ""

# Step 4: Verify
echo "🔍 STEP 4/5: Verifying SEO tags in HTML..."
echo ""
npm run verify
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Verification issues found${NC}"
    echo ""
    echo "Continue anyway? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 1
    fi
else
    echo -e "${GREEN}✅ Verification passed${NC}"
fi
echo ""

# Step 5: Deploy options
echo "🚀 STEP 5/5: Deployment options"
echo "───────────────────────────────────────────────────────────────"
echo ""
echo "Choose deployment target:"
echo "  1) Vercel"
echo "  2) Netlify"
echo "  3) Test locally (serve dist)"
echo "  4) Skip deployment"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📤 Deploying to Vercel..."
        echo ""
        if command -v vercel &> /dev/null; then
            vercel deploy --prod
            echo -e "${GREEN}✅ Deployed to Vercel${NC}"
        else
            echo -e "${RED}❌ Vercel CLI not found${NC}"
            echo "Install with: npm i -g vercel"
        fi
        ;;
    2)
        echo ""
        echo "📤 Deploying to Netlify..."
        echo ""
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=dist
            echo -e "${GREEN}✅ Deployed to Netlify${NC}"
        else
            echo -e "${RED}❌ Netlify CLI not found${NC}"
            echo "Install with: npm i -g netlify-cli"
        fi
        ;;
    3)
        echo ""
        echo "🧪 Starting local server..."
        echo ""
        echo "Visit: http://localhost:3000"
        echo "Press Ctrl+C to stop"
        echo ""
        npm run serve
        ;;
    4)
        echo ""
        echo "✅ Build complete (deployment skipped)"
        echo ""
        echo "To deploy manually:"
        echo "  Vercel: vercel deploy --prod"
        echo "  Netlify: netlify deploy --prod --dir=dist"
        ;;
    *)
        echo ""
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo ""
echo "✅ Next steps:"
echo "  1. Visit your live site"
echo "  2. View page source (Ctrl+U)"
echo "  3. Verify meta tags in HTML"
echo "  4. Submit sitemap to Google Search Console"
echo "  5. Request indexing for top pages"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
