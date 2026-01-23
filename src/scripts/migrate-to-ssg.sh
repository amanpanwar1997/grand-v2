#!/bin/bash

###############################################################################
# BULK MIGRATION TO SSG - SEOHead → SEOHeadSSG
# 
# This script updates all page components to use SEOHeadSSG instead of SEOHead
###############################################################################

echo ""
echo "🔄 MIGRATING ALL PAGES TO SSG (SEOHeadSSG)"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
updated=0
skipped=0

# Find all .tsx files in components/pages/ that import SEOHead
echo "📁 Scanning components/pages/ for files using SEOHead..."
echo ""

files=$(grep -l "from '../SEOHead'" components/pages/*.tsx 2>/dev/null)

if [ -z "$files" ]; then
  echo -e "${GREEN}✅ No files found using old SEOHead - migration already complete!${NC}"
  echo ""
  exit 0
fi

echo "Found files to migrate:"
echo "$files" | while read file; do
  echo "   - $file"
done
echo ""

echo "Starting migration..."
echo ""

# Migrate each file
for file in $files; do
  filename=$(basename "$file")
  
  # Check if file uses SEOHead
  if grep -q "from '../SEOHead'" "$file"; then
    echo -n "🔄 Migrating $filename... "
    
    # Replace import statement
    sed -i.bak "s/from '..\/SEOHead'/from '..\/SEOHeadSSG'/g" "$file"
    
    # Replace component usage
    sed -i.bak "s/<SEOHead /<SEOHeadSSG /g" "$file"
    sed -i.bak "s/<SEOHead>/<SEOHeadSSG>/g" "$file"
    
    # Remove backup file
    rm -f "${file}.bak"
    
    # Verify changes
    if grep -q "SEOHeadSSG" "$file"; then
      echo -e "${GREEN}✅ Done${NC}"
      updated=$((updated + 1))
    else
      echo -e "${RED}❌ Failed${NC}"
      skipped=$((skipped + 1))
    fi
  else
    echo -e "${YELLOW}⏭️  Skipping $filename (already migrated)${NC}"
    skipped=$((skipped + 1))
  fi
done

echo ""
echo "───────────────────────────────────────────────────────────────"
echo ""
echo "📊 MIGRATION SUMMARY"
echo ""
echo "   Files updated: $updated"
echo "   Files skipped: $skipped"
echo ""

if [ $updated -gt 0 ]; then
  echo -e "${GREEN}✅ MIGRATION COMPLETE!${NC}"
  echo ""
  echo "🧪 Next steps:"
  echo "   1. Verify changes: git diff"
  echo "   2. Test build: npm run build"
  echo "   3. Test locally: npm run serve"
  echo "   4. Check HTML source for meta tags"
  echo ""
else
  echo -e "${YELLOW}⚠️  No files were updated${NC}"
  echo ""
fi

echo "═══════════════════════════════════════════════════════════════"
echo ""
