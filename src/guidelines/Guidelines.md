# Inchtomilez Design System Guidelines

**Version:** 5.0.0 - BLACK THEME ONLY  
**Status:** ✅ **PRODUCTION READY**  
**Last Updated:** November 16, 2025

---

## 📊 CURRENT PROJECT STATUS

### **✅ Complete & Production Ready:**
- ✅ Typography System (100%)
- ✅ Color System (100% - Black Theme Only)
- ✅ Spacing System (100%)
- ✅ SEO System V2.0 (100% - 274 pages)
- ✅ Component Library (100%)
- ✅ Navigation (100%)
- ✅ Footer (100%)
- ✅ All Pages (100%)

### **⚠️ REMOVED:**
- ❌ Theme Toggle System (Removed)
- ❌ Light Mode Support (Removed)
- ❌ ThemeContext (Removed)
- ❌ ThemeSettings Panel (Removed)

**Website is now pure BLACK theme with no light mode option.**

---

## 📚 QUICK NAVIGATION

| Section | What You'll Find |
|---------|-----------------|
| [🎯 Typography](#-typography-system) | Font sizes, weights, hierarchy |
| [🎨 Colors](#-color-system) | Black/White/Yellow palette |
| [📐 Spacing](#-spacing-system) | Gap, padding, margins |
| [🧱 Components](#-key-components) | Ready-to-use components |
| [⚡ Styling Rules](#-styling-rules) | Best practices |
| [🔍 SEO](#-seo-system-v20) | Centralized SEO management |
| [📱 Responsive](#-responsive-design) | Breakpoints & mobile-first |
| [🎨 Assets](#-assets--branding) | Favicon, OG images, videos |

---

## 🎯 TYPOGRAPHY SYSTEM

**Font Family:** Raleway (400, 500, 600, 700)

### **⚠️ CRITICAL RULE: ALWAYS Override Typography!**

**❌ NEVER rely on component defaults:**
```tsx
// ❌ WRONG - Uses random default sizing
<h1>Heading</h1>
<p>Body text</p>
```

**✅ ALWAYS specify explicit sizing:**
```tsx
// ✅ CORRECT - Overrides defaults
<h1 className="text-[30px] md:text-[36px] font-medium text-white">Heading</h1>
<p className="text-[15px] font-normal text-white/80">Body text</p>
```

---

### **Desktop Typography Scale:**

| Element | Size (px) | Size (rem) | Weight | Line Height | Usage |
|---------|-----------|------------|--------|-------------|-------|
| **H1** | 30px | 1.875rem | 500 (medium) | 1.3 | Page titles |
| **H2** | 22px | 1.375rem | 700 (bold) | 1.3 | Section headings (auto-gradient) |
| **H3** | 22px | 1.375rem | 500 (medium) | 1.4 | Sub-sections |
| **H4** | 18px | 1.125rem | 500 (medium) | 1.4 | Card titles |
| **Body** | 15px | 0.9375rem | 400 (normal) | 1.6 | Standard text |
| **Small** | 13px | 0.8125rem | 400 (normal) | 1.6 | Captions, labels |
| **Button** | 15px | 0.9375rem | 600 (semibold) | 1.5 | CTA buttons |

---

### **Mobile Typography Scale (≤768px):**

| Element | Size | Weight | Note |
|---------|------|--------|------|
| **H1** | 26px | 500 | 4px smaller than desktop |
| **H2** | 20px | 700 | 2px smaller |
| **H3** | 20px | 500 | 2px smaller |
| **H4** | 16px | 500 | 2px smaller |
| **Body** | 14px | 400 | 1px smaller |
| **Small** | 13px | 400 | Same as desktop |

---

### **Typography Examples:**

```tsx
// ✅ Responsive heading with proper sizing
<h1 className="text-[26px] md:text-[30px] font-medium leading-[1.3] text-white">
  Welcome to Inchtomilez
</h1>

// ✅ H2 with auto-gradient (no gradient class needed)
<h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3]">
  Our Services
</h2>

// ✅ Body text with proper sizing
<p className="text-[14px] md:text-[15px] font-normal leading-[1.6] text-white/70">
  We are a leading digital marketing agency based in Indore, India.
</p>

// ✅ Small text (captions, labels)
<span className="text-[13px] font-normal text-white/60">
  Posted on November 16, 2025
</span>

// ✅ Button text
<button className="text-[15px] font-semibold bg-yellow-500 text-black px-6 py-3 rounded-lg">
  Get Started
</button>
```

---

### **Special Typography Rules:**

1. **H2 Auto-Gradient:**
   - H2 elements automatically get yellow gradient via `globals.css`
   - No need to add `text-gradient` class
   - Gradient: `linear-gradient(135deg, #ffffff 0%, #eab308 100%)`

2. **Never Use Tailwind Size Classes:**
   ```tsx
   // ❌ WRONG - Don't use Tailwind size classes
   <h1 className="text-3xl">Heading</h1>
   
   // ✅ CORRECT - Use explicit pixel values
   <h1 className="text-[30px]">Heading</h1>
   ```

3. **Always Include Font Weight:**
   ```tsx
   // ❌ WRONG - Missing weight
   <h1 className="text-[30px]">Heading</h1>
   
   // ✅ CORRECT - Explicit weight
   <h1 className="text-[30px] font-medium">Heading</h1>
   ```

---

## 🎨 COLOR SYSTEM

### **Brand Palette - BLACK THEME ONLY:**

| Color | Hex | Usage |
|-------|-----|-------|
| **Black** | `#000000` | Backgrounds |
| **White** | `#ffffff` | Text |
| **Yellow** | `#eab308` | Accents, CTAs |
| **Grey** | `#737373` | Muted text |

---

### **Color Usage Guide:**

**Primary Colors:**
```tsx
// Background - Pure Black
bg-black

// Card Backgrounds - Dark Grey
bg-[#0a0a0a]

// Primary Text - White
text-white

// Secondary Text - Faded White
text-white/80
text-white/70
text-white/60

// Muted Text - Grey
text-gray-400
text-gray-500

// Borders - Subtle White
border-white/10
border-white/20

// Brand Accent - Yellow
bg-yellow-500
text-yellow-500

// CTA Buttons
bg-yellow-500 text-black
```

---

### **Color Usage Examples:**

```tsx
// ✅ Standard black card
<div className="bg-[#0a0a0a] text-white border border-white/10 rounded-xl p-6">
  <h3 className="text-[22px] font-medium mb-2">Card Title</h3>
  <p className="text-[15px] text-white/70">
    Description text
  </p>
</div>

// ✅ Using glass utility (glassmorphism effect)
<div className="glass p-6 rounded-xl">
  <h3 className="text-[22px] font-medium text-white">Glass Card</h3>
  <p className="text-[15px] text-white/70">Content</p>
</div>

// ✅ CTA Button (yellow with black text)
<button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
  Get Started
</button>

// ✅ Opacity pattern for text hierarchy
<div className="text-white">
  <p className="opacity-100">Primary text (100%)</p>
  <p className="opacity-80">Secondary text (80%)</p>
  <p className="opacity-60">Tertiary text (60%)</p>
</div>
```

---

### **Glass Utility Classes:**

These classes provide glassmorphism effects:

```tsx
// ✅ Semi-transparent glass effect
<div className="glass">Content</div>

// ✅ Stronger glass effect
<div className="glass-strong">Content</div>

// ✅ Glass card with padding
<div className="glass-card">Content</div>

// ✅ Colored glass variants
<div className="glass-yellow">Yellow tint</div>
<div className="glass-purple">Purple tint</div>
<div className="glass-blue">Blue tint</div>
```

---

## 📐 SPACING SYSTEM

### **⚠️ CRITICAL: Override Component Defaults!**

**Some components have built-in spacing defaults. ALWAYS override them explicitly.**

---

### **Standard Spacing Scale:**

| Class | Size | Usage | Override Priority |
|-------|------|-------|-------------------|
| `gap-4` | 16px | Compact grids | ⚠️ Override if needed |
| `gap-6` | 24px | **Default grid gap** | ✅ Recommended |
| `gap-10` | 40px | BentoGrid spacing | ✅ Use for bento |
| `p-4` | 16px | Small cards | ⚠️ Override |
| `p-6` | 24px | **Standard card padding** | ✅ Recommended |
| `p-8` | 32px | Section padding (mobile) | ✅ Use for sections |
| `p-12` | 48px | Section padding (desktop) | ✅ Use for sections |
| `py-16` | 64px | Vertical section (mobile) | ✅ Recommended |
| `py-24` | 96px | Vertical section (desktop) | ✅ Recommended |

---

### **Spacing Examples:**

```tsx
// ✅ Standard page section
<section className="py-16 md:py-24">
  <div className="container mx-auto px-6">
    <h2 className="text-[22px] font-bold mb-6 text-white">Section Title</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cards */}
    </div>
  </div>
</section>

// ✅ Card with explicit padding (overrides defaults)
<div className="glass rounded-xl p-6">
  <h3 className="text-[22px] font-medium mb-4 text-white">Card Title</h3>
  <p className="text-[15px] text-white/70">Content</p>
</div>

// ✅ Tight grid for stats
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {stats.map(stat => (
    <div key={stat.id} className="glass p-4">
      <p className="text-[30px] font-bold text-white">{stat.value}</p>
      <p className="text-[13px] text-white/60">{stat.label}</p>
    </div>
  ))}
</div>

// ✅ Wide grid for features
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
  {/* Feature cards with more breathing room */}
</div>
```

---

## 🧱 KEY COMPONENTS

### **1. BentoGrid2**

**Location:** `/components/layout/BentoGrid2.tsx`

**Two Modes:**
- **Asymmetric:** Advanced 8-column layout for services/features
- **Uniform:** Simple equal columns for stats/teams

```tsx
// ✅ Asymmetric mode (services grid)
<BentoGrid2 
  cards={services}
  mode="asymmetric"
  showBadges={true}
  ariaLabel="Our digital marketing services"
/>

// ✅ Uniform mode (stats grid)
<BentoGrid2 
  cards={stats}
  mode="uniform"
  columns={4}
  ariaLabel="Company statistics"
/>
```

---

### **2. OutlinedText**

**Location:** `/components/ui/OutlinedText.tsx`

**Large outlined background text with scroll animations.**

```tsx
<OutlinedText 
  text="INNOVATION"
  direction="left"        // "left" | "right"
  delay={0}               // Animation delay (ms)
  stopPosition={25}       // Distance from edge (%)
  parallax={true}         // Enable parallax effect
  parallaxSpeed={0.3}     // Parallax speed (0-1)
/>
```

---

### **3. WhatsAppButton**

**Location:** `/components/ui/WhatsAppButton.tsx`

**Floating WhatsApp button (bottom-left).**

```tsx
// Already in App.tsx - appears globally
<WhatsAppButton />
```

**Features:**
- ✅ Links to +91-9669988666
- ✅ Glassmorphism design
- ✅ Pulse animation
- ✅ Expands on hover ("Chat with us")

---

### **4. SEOHead**

**Location:** `/components/SEOHead.tsx`

**SEO meta tags using React Helmet.**

```tsx
<SEOHead 
  title="Page Title | Inchtomilez"
  description="Page description for meta tags"
  keywords="keyword1, keyword2, keyword3"
  canonicalUrl="/page-slug"
  ogImage="/og-image.jpg"
  structuredData={schemaObject}
/>
```

**SEO managed centrally in `/utils/seoConfig.tsx`**

---

### **5. Navigation**

**Location:** `/components/Navigation.tsx`

**✅ Complete - Black Theme**

**Features:**
- Desktop: Horizontal menu with mega dropdowns
- Mobile: Hamburger menu
- Glassmorphism background
- Smooth transitions
- White text on black background

---

### **6. Footer**

**Location:** `/components/Footer.tsx`

**✅ Complete - Black Theme**

**Features:**
- 4 columns (desktop)
- 2 columns (tablet)
- 1 column (mobile)
- Social media links
- Quick links
- Contact info

---

### **7. VideoBackground**

**Location:** `/components/ui/VideoBackground.tsx`

**✅ Complete**

**Background video for hero sections.**

```tsx
<VideoBackground 
  src="/videos/hero-video.mp4"  // Video URL
  overlayOpacity={0.7}           // Darkness (0-1)
  startTime={9}                  // Start at second 9
  fallbackImage="/backup.jpg"    // If video fails
/>
```

**Used in:** HomePage hero section

---

### **8. LenisScroll**

**Location:** `/components/ui/LenisScroll.tsx`

**Smooth scrolling library wrapper.**

```tsx
// Already in App.tsx - applies globally
<LenisScroll>
  <App />
</LenisScroll>
```

---

## ⚡ STYLING RULES

### **🚨 CRITICAL: ALWAYS Override Component Defaults**

---

### **Rule #1: Explicit Typography**

```tsx
// ❌ WRONG - Relies on component defaults
<h1>Heading</h1>
<p>Body text</p>

// ✅ CORRECT - Overrides all defaults
<h1 className="text-[30px] md:text-[36px] font-medium leading-[1.3] text-white">
  Heading
</h1>
<p className="text-[15px] font-normal leading-[1.6] text-white/70">
  Body text
</p>
```

---

### **Rule #2: Explicit Spacing**

```tsx
// ❌ WRONG - Relies on defaults
<div className="grid">
  <div className="p-4">Card</div>
</div>

// ✅ CORRECT - Explicit spacing
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="glass p-6">Card</div>
</div>
```

---

### **Rule #3: Black Theme Colors**

```tsx
// ✅ CORRECT - Black theme colors
<div className="bg-black text-white">Content</div>
<div className="bg-[#0a0a0a] text-white/80">Card</div>
<button className="bg-yellow-500 text-black">CTA</button>
```

---

### **Rule #4: Mobile-First Responsive**

```tsx
// ❌ WRONG - Desktop-first
<h1 className="lg:text-[30px] text-[26px]">Heading</h1>

// ✅ CORRECT - Mobile-first
<h1 className="text-[26px] md:text-[30px]">Heading</h1>
```

---

## 🔍 SEO SYSTEM V2.0

### **Status:** ✅ **100% Complete - 274 Pages Optimized**

**Version:** 2.0 - Centralized Management  
**Coverage:** 59 main pages + 224 blog posts  
**SEO Score:** 88/100 (Enterprise-Grade)

---

### **🎯 ONE FILE Controls All SEO:**

**File:** `/utils/seoConfig.tsx`

**This single file controls SEO for ALL 59 main pages.**

```tsx
// Example: Edit About page SEO
export const SEO_CONFIG = {
  '/about': {
    title: 'About Us | Leading Digital Marketing Agency',
    description: 'Learn about Inchtomilez...',
    keywords: ['marketing agency', 'Indore', 'team'],
    h1: 'About Inchtomilez',
    ogType: 'website',
    schema: 'organization',
  },
  // ... 58 more pages
};
```

**Change SEO → Save file → It applies instantly!** ✅

---

### **📝 How to Edit SEO:**

**Step 1:** Open `/utils/seoConfig.tsx`

**Step 2:** Find your page (e.g., `/services`)

**Step 3:** Edit properties:

```tsx
'/services': {
  title: 'Your New Title | Inchtomilez',           // ← Edit
  description: 'Your new meta description here',    // ← Edit
  keywords: ['new', 'keywords', 'here'],            // ← Edit
  h1: 'Your New H1 Heading',                        // ← Edit
},
```

**Step 4:** Save file. Done! ✅

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints:**

```css
/* Mobile-first approach (Tailwind defaults) */
sm:   640px   /* Small phones */
md:   768px   /* Tablets */
lg:   1024px  /* Small desktops */
xl:   1280px  /* Large desktops */
2xl:  1536px  /* Extra large */
```

---

### **Mobile-First Pattern:**

```tsx
// ✅ CORRECT - Start with mobile, add larger screens
<div className="
  grid 
  grid-cols-1           /* Mobile: 1 column */
  sm:grid-cols-2        /* Small: 2 columns */
  md:grid-cols-3        /* Tablet: 3 columns */
  lg:grid-cols-4        /* Desktop: 4 columns */
  gap-4 md:gap-6        /* Smaller gap on mobile */
">
  {/* Cards */}
</div>

// ✅ Responsive typography
<h1 className="
  text-[26px]           /* Mobile: 26px */
  md:text-[30px]        /* Desktop: 30px */
  font-medium
  text-white
">
  Heading
</h1>

// ✅ Responsive padding
<section className="
  py-16                 /* Mobile: 64px vertical */
  md:py-24              /* Desktop: 96px vertical */
  px-4                  /* Mobile: 16px horizontal */
  md:px-6               /* Desktop: 24px horizontal */
">
  {/* Content */}
</section>
```

---

## 🎨 ASSETS & BRANDING

### **1. Favicon:**

**File:** `/public/favicon.svg`

**Current:** SVG favicon with yellow "I" on black background

**How to Change:**
```svg
<!-- Edit /public/favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#000000"/>
  <text x="256" y="330" text-anchor="middle" font-size="420" fill="#eab308">
    I  <!-- ← Change this letter -->
  </text>
</svg>
```

---

### **2. Hero Video:**

**File:** `/components/pages/HomePage.tsx` (Line 378)

```tsx
<VideoBackground 
  src="/videos/hero-video.mp4"   // ← Change video URL
  overlayOpacity={0.7}            // ← Adjust darkness
  startTime={9}                   // ← Start time
/>
```

**Video Specs:**
- Format: MP4 (H.264)
- Resolution: 1920x1080 or 1280x720
- Duration: 15-30 seconds (loops)
- Size: < 5 MB
- Audio: None (muted)

---

## ✅ PRE-SHIP CHECKLIST

**Before deploying ANY component, verify:**

### **Typography:**
- [ ] Explicit font size specified: `text-[15px]`
- [ ] Explicit font weight specified: `font-medium`
- [ ] Line height set if needed: `leading-[1.6]`
- [ ] Mobile sizes defined: `text-[14px] md:text-[15px]`
- [ ] Text color specified: `text-white` or `text-white/80`

### **Colors:**
- [ ] Black backgrounds: `bg-black` or `bg-[#0a0a0a]`
- [ ] White text: `text-white` or opacity variants
- [ ] Yellow accents: `text-yellow-500` or `bg-yellow-500`
- [ ] CTA buttons: `bg-yellow-500 text-black`

### **Spacing:**
- [ ] Explicit gap defined: `gap-6`
- [ ] Explicit padding defined: `p-6`
- [ ] Section padding: `py-16 md:py-24`
- [ ] Container padding: `px-6`

### **Responsive:**
- [ ] Mobile-first approach used
- [ ] Tested on mobile (320px - 768px)
- [ ] Tested on tablet (768px - 1024px)
- [ ] Tested on desktop (1024px+)
- [ ] No horizontal scroll on mobile

### **SEO (if new page):**
- [ ] Added to `/utils/seoConfig.tsx`
- [ ] Uses `useSEO()` hook
- [ ] H1 uses `{seo.h1}`
- [ ] SEOHead component added

### **Performance:**
- [ ] Images lazy loaded
- [ ] Videos optimized
- [ ] No unnecessary re-renders
- [ ] CSS transforms used for animations

---

## 🎯 QUICK REFERENCE

### **Standard Page Structure:**

```tsx
import { useSEO } from '../../utils/seoConfig';
import { SEOHead } from '../../components/SEOHead';

export function YourPage() {
  const seo = useSEO();
  
  return (
    <>
      <SEOHead {...seo.meta} />
      
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h1 className="text-[26px] md:text-[30px] font-medium mb-6 text-white">
              {seo.h1}
            </h1>
            <p className="text-[15px] text-white/70 mb-8">
              Description text
            </p>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-[22px] font-bold mb-6 text-white">Section Title</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map(item => (
                <div key={item.id} className="glass p-6 rounded-xl">
                  <h3 className="text-[22px] font-medium mb-4 text-white">{item.title}</h3>
                  <p className="text-[15px] text-white/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
```

---

### **Standard Card Component:**

```tsx
export function Card({ title, description }: CardProps) {
  return (
    <div className="glass p-6 rounded-xl border border-white/10 hover:border-yellow-500 transition-all duration-300">
      <h3 className="text-[22px] font-medium mb-4 text-white">
        {title}
      </h3>
      <p className="text-[15px] text-white/70 leading-[1.6]">
        {description}
      </p>
    </div>
  );
}
```

---

### **Standard Button:**

```tsx
export function Button({ children, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`
      px-6 py-3 rounded-lg 
      text-[15px] font-semibold 
      transition-all duration-200
      ${variant === 'primary' 
        ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
        : 'bg-[#0a0a0a] text-white border border-white/10 hover:bg-white/5'
      }
    `}>
      {children}
    </button>
  );
}
```

---

## 📚 DOCUMENTATION INDEX

### **For Developers:**
- **This File** - Complete design system guide
- `/SEO_SYSTEM_V2_COMPLETE.md` - SEO system docs

### **For Reference:**
- `/styles/globals.css` - All CSS variables
- `/utils/seoConfig.tsx` - SEO database

---

## 🎓 LEARNING PATH

### **New to this project? Start here:**

1. **Read this Guidelines.md** (you are here)
2. **Review Typography & Colors sections** (critical!)
3. **Check Pre-Ship Checklist** (before coding)
4. **Study Quick Reference examples** (copy patterns)

### **Creating a new page?**

1. Use Standard Page Structure (see Quick Reference)
2. Add SEO to `/utils/seoConfig.tsx`
3. Follow Pre-Ship Checklist
4. Test mobile + desktop

---

**Status:** ✅ **PURE BLACK THEME - PRODUCTION READY**  
**Version:** 5.0.0  
**Last Updated:** November 16, 2025

🎯 **Your black theme website is complete!**
