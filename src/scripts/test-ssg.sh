#!/bin/bash

###############################################################################
# SSG TESTING & VERIFICATION SCRIPT
# 
# Tests that your Static Site Generation is working correctly
# Run after: npm run build
###############################################################################

echo ""
echo "🧪 SSG TESTING & VERIFICATION"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if dist exists
if [ ! -d "dist" ]; then
  echo -e "${RED}❌ ERROR: dist/ folder not found${NC}"
  echo "   Run: npm run build"
  exit 1
fi

echo "📂 Checking dist folder..."
echo ""

# Count HTML files
html_count=$(find dist -name "index.html" | wc -l)
echo "📊 HTML files found: $html_count / 274 expected"

if [ $html_count -lt 250 ]; then
  echo -e "${YELLOW}⚠️  WARNING: Less than 250 pages generated${NC}"
  echo "   Expected: 274"
else
  echo -e "${GREEN}✅ Good coverage!${NC}"
fi

echo ""
echo "───────────────────────────────────────────────────────────────"
echo ""

# Check critical pages exist
echo "🔍 Checking critical pages..."
echo ""

critical_pages=(
  "dist/index.html"
  "dist/about/index.html"
  "dist/services/index.html"
  "dist/services/search-engine-optimization-seo/index.html"
  "dist/blogs/index.html"
  "dist/contact/index.html"
)

missing_pages=0

for page in "${critical_pages[@]}"; do
  page_name=$(echo $page | sed 's/dist\///' | sed 's/\/index.html//')
  if [ -f "$page" ]; then
    echo -e "${GREEN}✅${NC} /$page_name"
  else
    echo -e "${RED}❌${NC} /$page_name - MISSING"
    missing_pages=$((missing_pages + 1))
  fi
done

echo ""

if [ $missing_pages -gt 0 ]; then
  echo -e "${RED}❌ $missing_pages critical pages missing${NC}"
  echo "   Re-run: npm run build"
else
  echo -e "${GREEN}✅ All critical pages generated${NC}"
fi

echo ""
echo "───────────────────────────────────────────────────────────────"
echo ""

# Check for meta tags in HTML
echo "🏷️  Checking meta tags in HTML..."
echo ""

homepage="dist/index.html"

if [ -f "$homepage" ]; then
  # Check for title
  if grep -q "<title>" "$homepage"; then
    title=$(grep -o "<title>.*</title>" "$homepage" | head -1)
    echo -e "${GREEN}✅${NC} Title tag found: $title"
  else
    echo -e "${RED}❌${NC} Title tag missing"
  fi
  
  # Check for description
  if grep -q 'name="description"' "$homepage"; then
    echo -e "${GREEN}✅${NC} Description meta tag found"
  else
    echo -e "${RED}❌${NC} Description meta tag missing"
  fi
  
  # Check for og:title
  if grep -q 'property="og:title"' "$homepage"; then
    echo -e "${GREEN}✅${NC} Open Graph title found"
  else
    echo -e "${RED}❌${NC} Open Graph title missing"
  fi
  
  # Check for structured data
  if grep -q 'application/ld+json' "$homepage"; then
    echo -e "${GREEN}✅${NC} Structured data found"
    schema_count=$(grep -o 'application/ld+json' "$homepage" | wc -l)
    echo "   Schemas found: $schema_count"
  else
    echo -e "${RED}❌${NC} Structured data missing"
  fi
  
  # Check for h1
  if grep -q "<h1" "$homepage"; then
    echo -e "${GREEN}✅${NC} H1 heading found"
  else
    echo -e "${RED}❌${NC} H1 heading missing"
  fi
else
  echo -e "${RED}❌ Homepage not found${NC}"
fi

echo ""
echo "───────────────────────────────────────────────────────────────"
echo ""

# Check file sizes
echo "📦 Checking file sizes..."
echo ""

if [ -f "$homepage" ]; then
  size=$(wc -c < "$homepage")
  size_kb=$((size / 1024))
  
  if [ $size_kb -lt 10 ]; then
    echo -e "${RED}❌${NC} Homepage too small: ${size_kb}KB (likely not pre-rendered)"
  elif [ $size_kb -lt 30 ]; then
    echo -e "${YELLOW}⚠️${NC}  Homepage small: ${size_kb}KB (may be incomplete)"
  else
    echo -e "${GREEN}✅${NC} Homepage size: ${size_kb}KB (good)"
  fi
fi

echo ""
echo "───────────────────────────────────────────────────────────────"
echo ""

# Check assets
echo "🎨 Checking assets..."
echo ""

if [ -d "dist/assets" ]; then
  js_files=$(find dist/assets -name "*.js" | wc -l)
  css_files=$(find dist/assets -name "*.css" | wc -l)
  
  echo "   JavaScript files: $js_files"
  echo "   CSS files: $css_files"
  
  if [ $js_files -gt 0 ] && [ $css_files -gt 0 ]; then
    echo -e "${GREEN}✅ Assets generated${NC}"
  else
    echo -e "${RED}❌ Assets missing${NC}"
  fi
else
  echo -e "${RED}❌ Assets folder missing${NC}"
fi

echo ""
echo "───────────────────────────────────────────────────────────────"
echo ""

# Summary
echo "📊 SUMMARY"
echo ""
echo "   Pages generated: $html_count / 274"
echo "   Missing critical pages: $missing_pages / 6"

if [ $html_count -ge 250 ] && [ $missing_pages -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✅ SSG BUILD SUCCESSFUL!${NC}"
  echo ""
  echo "🎉 Next steps:"
  echo "   1. Test locally: npm run serve"
  echo "   2. Open: http://localhost:3000"
  echo "   3. View source (Ctrl+U) and verify meta tags"
  echo "   4. Deploy to production"
  echo "   5. Submit sitemap to Google Search Console"
else
  echo ""
  echo -e "${YELLOW}⚠️  SSG BUILD INCOMPLETE${NC}"
  echo ""
  echo "🔧 Troubleshooting:"
  echo "   1. Check build logs for errors"
  echo "   2. Verify all routes in package.json"
  echo "   3. Run: npm run build"
  echo "   4. Run this script again"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Advanced checks (optional - only if serve is running)
if command -v curl &> /dev/null; then
  echo "🌐 LIVE SERVER CHECK (Optional)"
  echo ""
  echo "To test live server:"
  echo "   1. Run: npm run serve"
  echo "   2. Run: curl http://localhost:3000 | grep '<title>'"
  echo "   3. Check for: Full title in output"
  echo ""
fi

exit 0
