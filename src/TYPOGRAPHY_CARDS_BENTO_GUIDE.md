# 📐 TYPOGRAPHY, CARDS & BENTO GRIDS DOCUMENTATION

**Website:** Inchtomilez Digital Marketing & Advertising Agency  
**Design System Version:** 5.0.0  
**Last Updated:** December 23, 2025

---

## 📚 TABLE OF CONTENTS

1. [Typography System](#typography-system)
2. [Card Components](#card-components)
3. [Bento Grid System](#bento-grid-system)
4. [Usage Examples](#usage-examples)

---

## 🎯 TYPOGRAPHY SYSTEM

### **Font Family**
**Raleway** (Google Fonts)
- Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- Loaded via: `@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap");`

---

### **Typography Scale**

#### **Desktop Typography (≥768px)**

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **H1** | 30px (1.875rem) | 500 (Medium) | 1.3 | Page titles |
| **H2** | 22px (1.375rem) | 700 (Bold) | 1.3 | Section headings (auto-gradient) |
| **H3** | 22px (1.375rem) | 500 (Medium) | 1.4 | Sub-sections |
| **H4** | 18px (1.125rem) | 500 (Medium) | 1.4 | Card titles |
| **Body (P)** | 15px (0.9375rem) | 400 (Regular) | 1.6 | Standard text |
| **Small** | 13px (0.8125rem) | 400 (Regular) | 1.6 | Captions, labels |
| **Button** | 15px (0.9375rem) | 600 (SemiBold) | 1.5 | CTA buttons |

#### **Mobile Typography (≤768px)**

| Element | Size | Weight | Difference |
|---------|------|--------|------------|
| **H1** | 26px (1.625rem) | 500 | -4px |
| **H2** | 20px (1.25rem) | 700 | -2px |
| **H3** | 20px (1.25rem) | 500 | -2px |
| **H4** | 16px (1rem) | 500 | -2px |
| **Body** | 14px (0.875rem) | 400 | -1px |
| **Small** | 12px (0.75rem) | 400 | -1px |
| **Button** | 14px (0.875rem) | 600 | -1px |

---

### **Special Typography Features**

#### **1. H2 Auto-Gradient**
All `<h2>` elements automatically get an animated gradient:

```css
h2 {
  background: linear-gradient(
    135deg,
    #ef4444 0%,    /* Red */
    #ec4899 25%,   /* Pink */
    #a855f7 50%,   /* Purple */
    #f59e0b 75%,   /* Orange */
    #dc2626 100%   /* Dark Red */
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shimmer 8s ease-in-out infinite;
}
```

**Result:** Smooth, slow-moving gradient animation on all H2 headings.

---

#### **2. Display Typography (Hero Sections)**

```css
.text-display {
  /* Mobile: 40px → Tablet: 56px → Desktop: 72px */
  font-size: 2.5rem;
  line-height: 1.1;
  font-weight: 500;
  letter-spacing: -0.02em;
}
```

**Usage:**
```tsx
<h1 className="text-display">
  Transform Your Business with Digital Marketing
</h1>
```

---

#### **3. Section Typography**

```css
.text-section {
  /* Mobile: 30px → Tablet: 36px → Desktop: 48px */
  font-size: 1.875rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.01em;
}
```

---

#### **4. Lead Text (Larger Body)**

```css
.text-lead {
  /* Mobile: 18px → Tablet/Desktop: 20px */
  font-size: 1.125rem;
  line-height: 1.6;
  font-weight: 400;
}
```

---

#### **5. Text Gradient Utility**

```css
.text-gradient {
  background: linear-gradient(to bottom right, #ffffff, #eab308);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Result:** White → Yellow gradient text

---

### **Typography Code Examples**

```tsx
// ✅ H1 - Page Title
<h1 className="text-[26px] md:text-[30px] font-medium leading-[1.3] text-white">
  Welcome to Inchtomilez
</h1>

// ✅ H2 - Section Heading (auto-gradient)
<h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3]">
  Our Services
</h2>

// ✅ H3 - Sub-section
<h3 className="text-[20px] md:text-[22px] font-medium leading-[1.4] text-white">
  Why Choose Us
</h3>

// ✅ H4 - Card Title
<h4 className="text-[16px] md:text-[18px] font-medium leading-[1.4] text-white">
  SEO Services
</h4>

// ✅ Body Text
<p className="text-[14px] md:text-[15px] font-normal leading-[1.6] text-white/80">
  We help businesses grow through digital marketing strategies.
</p>

// ✅ Small Text (Captions)
<small className="text-[12px] md:text-[13px] text-white/60">
  Posted on December 23, 2025
</small>

// ✅ Button Text
<button className="text-[14px] md:text-[15px] font-semibold bg-yellow-500 text-black px-6 py-3 rounded-lg">
  Get Started
</button>
```

---

## 🃏 CARD COMPONENTS

### **Card System Overview**

The website uses **4 main card variants** (all solid black with dark grey glow):

1. `.glass` - Standard card
2. `.glass-strong` - Card with stronger glow
3. `.glass-card` - Alias for standard card
4. `.glass-{color}` - Colored glow variants (purple, yellow, blue)

---

### **1. Standard Card (`.glass`)**

**Design:**
- Background: `#0a0a0a` (Dark grey, almost black)
- Border: `1px solid rgba(255, 255, 255, 0.1)` (10% white)
- Padding: `1.5rem` (24px)
- Border Radius: `0.75rem` (12px)
- Glow: Dark grey outer glow (soft diffusion)

**CSS:**
```css
.glass {
  background-color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 
    0 0 20px rgba(64, 64, 64, 0.15),    /* Inner glow */
    0 0 40px rgba(64, 64, 64, 0.08),    /* Outer glow */
    0 2px 8px rgba(0, 0, 0, 0.2);       /* Depth shadow */
  transition: all 200ms ease-in-out;
}

.glass:hover {
  box-shadow: 
    0 0 20px rgba(80, 80, 80, 0.20),
    0 0 40px rgba(80, 80, 80, 0.10),
    0 4px 12px rgba(0, 0, 0, 0.3);
}
```

**Usage:**
```tsx
<div className="glass">
  <h3 className="text-[18px] font-medium mb-2 text-white">Card Title</h3>
  <p className="text-[15px] text-white/70">Card description text.</p>
</div>
```

---

### **2. Strong Card (`.glass-strong`)**

**Difference from `.glass`:**
- Same design but **stronger glow** (1.2x multiplier)
- Used for important/featured content

**CSS:**
```css
.glass-strong {
  background-color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 
    0 0 24px rgba(64, 64, 64, 0.21),    /* Stronger inner glow */
    0 0 48px rgba(64, 64, 64, 0.11),    /* Stronger outer glow */
    0 4px 12px rgba(0, 0, 0, 0.3);
}
```

**Usage:**
```tsx
<div className="glass-strong p-8 rounded-2xl">
  <h2 className="text-[22px] font-bold mb-4 text-white">Featured Section</h2>
  <p className="text-[15px] text-white/80">Important content here.</p>
</div>
```

---

### **3. Card Alias (`.glass-card`)**

**Identical to `.glass`**
- Used for semantic clarity in JSX
- Same properties as `.glass`

**Usage:**
```tsx
<div className="glass-card min-w-[280px] p-6">
  <h4 className="text-[18px] font-medium mb-3 text-white">Service Card</h4>
  <p className="text-[14px] text-white/60">Description</p>
</div>
```

---

### **4. Colored Glow Cards**

#### **Purple Card (`.glass-purple`)**
```css
.glass-purple {
  background-color: #0a0a0a;
  border: 1px solid rgba(168, 85, 247, 0.3);   /* Purple border */
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 
    0 0 20px rgba(64, 64, 64, 0.15),            /* Base grey glow */
    0 0 40px rgba(64, 64, 64, 0.08),
    0 0 20px rgba(168, 85, 247, 0.08),          /* Purple accent glow */
    0 2px 8px rgba(0, 0, 0, 0.2);
}

.glass-purple:hover {
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 
    0 0 20px rgba(80, 80, 80, 0.20),
    0 0 40px rgba(80, 80, 80, 0.10),
    0 0 30px rgba(168, 85, 247, 0.15),          /* Stronger purple glow */
    0 4px 12px rgba(168, 85, 247, 0.2);
  transform: translateY(-2px);
}
```

#### **Yellow Card (`.glass-yellow`)**
```css
.glass-yellow {
  border: 1px solid rgba(234, 179, 8, 0.3);    /* Yellow border */
  box-shadow: 
    0 0 20px rgba(64, 64, 64, 0.15),
    0 0 40px rgba(64, 64, 64, 0.08),
    0 0 20px rgba(234, 179, 8, 0.08),           /* Yellow accent glow */
    0 2px 8px rgba(0, 0, 0, 0.2);
}
```

#### **Blue Card (`.glass-blue`)**
```css
.glass-blue {
  border: 1px solid rgba(59, 130, 246, 0.3);   /* Blue border */
  box-shadow: 
    0 0 20px rgba(64, 64, 64, 0.15),
    0 0 40px rgba(64, 64, 64, 0.08),
    0 0 20px rgba(59, 130, 246, 0.08),          /* Blue accent glow */
    0 2px 8px rgba(0, 0, 0, 0.2);
}
```

**Usage:**
```tsx
{/* Purple card for special features */}
<div className="glass-purple">
  <h4>Premium Feature</h4>
</div>

{/* Yellow card for CTAs */}
<div className="glass-yellow">
  <h4>Featured Service</h4>
</div>

{/* Blue card for info sections */}
<div className="glass-blue">
  <h4>Information</h4>
</div>
```

---

### **Card Design Principles**

**Spacing:**
- Default padding: `p-6` (24px)
- Large cards: `p-8` or `p-12` (32px or 48px)
- Compact cards: `p-4` (16px)

**Border Radius:**
- Standard: `rounded-lg` (0.5rem / 8px)
- Large: `rounded-xl` (0.75rem / 12px)
- Extra large: `rounded-2xl` (1rem / 16px)

**Text Hierarchy:**
- Title: `text-white` (100% opacity)
- Description: `text-white/80` or `text-white/70` (80-70% opacity)
- Meta info: `text-white/60` or `text-gray-400` (60% opacity)

**Hover Effects:**
- Border color change: `border-white/10` → `border-yellow-500` or `border-white/20`
- Enhanced glow on hover
- Optional: `hover:scale-[1.02]` (2% scale up)
- Optional: `hover:-translate-y-1` (lift effect)

---

## 🎨 BENTO GRID SYSTEM

### **BentoGrid2 Component**
**Location:** `/components/layout/BentoGrid2.tsx`

**The ONLY grid system used across the entire website.**

---

### **Grid Modes**

#### **1. Asymmetric Mode (Advanced Pattern)**
**For:** Services, features, main content grids

**Grid Structure:**
- Desktop: 8-column grid
- Tablet: 6-column grid
- Mobile: Accordion (collapsible cards)

**Pattern:**
12-card repeating pattern with varied sizes:
- Cards 0-1: Wide (4 columns each)
- Cards 2-5: Small (2 columns each)
- Cards 6-7: Medium (3 columns each)
- Card 8: Small (2 columns)
- Cards 9-10: Small (2 columns each)
- Card 11: Wide (4 columns)

**Desktop Layout Visualization:**
```
┌─────────────┬─────────────┐
│  Card 0 (4) │  Card 1 (4) │
├──────┬──────┼──────┬──────┤
│ C2(2)│ C3(2)│ C4(2)│ C5(2)│
├──────┴──────┼──────┴──────┤
│   Card 6 (3)│   Card 7 (3)│ C8(2)
├─────────────┼─────────────┼─────┤
│   Card 9 (2)│  Card 10(2) │  C11(4)
└─────────────┴─────────────┴──────┘
```

---

#### **2. Uniform Mode (Simple Grid)**
**For:** Stats, teams, simple listings

**Grid Configurations:**
- 2 columns: `grid-cols-1 md:grid-cols-2`
- 3 columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- 4 columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- 5 columns: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`

**Mobile:** Same accordion as asymmetric (if cards have descriptions)

---

### **BentoGrid2 Props**

```typescript
interface BentoGrid2Props {
  // Card data (required)
  cards: BentoCard[] | SimpleBentoCard[];
  
  // Grid mode (optional, default: 'asymmetric')
  mode?: 'asymmetric' | 'uniform';
  
  // Uniform grid columns (only for mode='uniform')
  columns?: 2 | 3 | 4 | 5;
  
  // Visual features (optional, all default: true)
  showBadges?: boolean;     // Show service badges
  showStats?: boolean;      // Show stats on wide cards
  showCTA?: boolean;        // Show "Learn More" CTA
  
  // Styling (optional)
  className?: string;
  
  // Accessibility (optional)
  ariaLabel?: string;
}
```

---

### **Card Data Types**

#### **BentoCard (With Links)**
```typescript
interface BentoCard {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;          // URL to navigate to
}
```

#### **SimpleBentoCard (No Links)**
```typescript
interface SimpleBentoCard {
  icon?: LucideIcon;     // Optional icon
  number?: string;       // Optional stat number (e.g., "100+")
  label: string;         // Main label
  sublabel?: string;     // Optional sublabel
  description?: string;  // Optional description
}
```

---

### **BentoGrid Features**

#### **1. Service Badges**
12 rotating badge variants:
- `popular`, `trending`, `hot`, `new`, `featured`, `top`
- `essential`, `premium`, `best`, `top-pick`, `choice`, `rising`

**Appearance:**
- Small rounded pill badges
- Positioned at top-right of card
- Color-coded (purple, yellow, blue accents)
- Animated on hover

---

#### **2. Stats Display**
Only shown on **wide cards** (4-column cards):
- Icon: Sparkles ✨
- Number + Label format
- Example: "150+ Projects" or "7 Years Experience"

**12 Stat Variations:**
```javascript
const statsVariations = [
  { number: '150+', label: 'Projects' },
  { number: '7', label: 'Years' },
  { number: '98%', label: 'Success' },
  { number: '24/7', label: 'Support' },
  { number: '50+', label: 'Clients' },
  { number: '100%', label: 'Satisfaction' },
  { number: '24h', label: 'Response' },
  { number: '10+', label: 'Services' },
  { number: '5★', label: 'Rating' },
  { number: '99%', label: 'Uptime' },
  { number: '3x', label: 'ROI' },
  { number: '1000+', label: 'Campaigns' }
];
```

---

#### **3. Card Hover Effects**

**Asymmetric Cards:**
```css
/* Base */
border: 1px solid rgba(255, 255, 255, 0.2);
background: #000000;

/* Hover */
border-color: #eab308;                    /* Yellow border */
transform: scale(1.02) translateY(-4px);  /* Lift + scale */
transition: all 500ms;
```

**Icon Animation on Hover:**
```css
/* Icon glow effect */
transform: scale(1.1) rotate(3deg);
filter: drop-shadow(0 0 8px rgba(234, 179, 8, 0.5));
```

---

#### **4. Mobile Accordion**

On screens ≤768px, grid converts to **accordion**:
- Each card becomes collapsible item
- Click to expand/collapse
- Shows icon + title in header
- Description + CTA in collapsed content
- Black background with white/20% border
- Smooth expand/collapse animation

---

### **BentoGrid Usage Examples**

#### **Example 1: Services Grid (Asymmetric)**

```tsx
import { BentoGrid2 } from './components/layout/BentoGrid2';
import { Search, Target, Share2, PenTool } from 'lucide-react';

const services = [
  {
    title: 'SEO Services',
    description: 'Rank higher on Google with our proven SEO strategies.',
    icon: Search,
    link: '/services/search-engine-optimization-seo'
  },
  {
    title: 'PPC Advertising',
    description: 'Get instant results with targeted paid ads.',
    icon: Target,
    link: '/services/ppc-google-ads'
  },
  {
    title: 'Social Media Marketing',
    description: 'Engage your audience on social platforms.',
    icon: Share2,
    link: '/services/social-media-marketing'
  },
  {
    title: 'Content Marketing',
    description: 'Create compelling content that converts.',
    icon: PenTool,
    link: '/services/content-marketing'
  },
  // ... 8 more cards for 12-card pattern
];

// Usage
<BentoGrid2 
  cards={services}
  mode="asymmetric"
  showBadges={true}
  showStats={true}
  showCTA={true}
  ariaLabel="Our digital marketing services"
/>
```

**Result:**
- Desktop: 8-column asymmetric grid with varied card sizes
- Badges on all cards
- Stats on wide cards
- "Learn More" CTA buttons
- Mobile: Accordion with expand/collapse

---

#### **Example 2: Stats Grid (Uniform)**

```tsx
import { BentoGrid2 } from './components/layout/BentoGrid2';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    number: '150+',
    label: 'Projects Completed',
    sublabel: 'Successful Campaigns',
    description: 'We have delivered over 150 successful marketing campaigns.'
  },
  {
    icon: Users,
    number: '96+',
    label: 'Happy Clients',
    sublabel: 'Satisfied Customers',
    description: 'Our clients trust us for results-driven digital marketing.'
  },
  {
    icon: Award,
    number: '7',
    label: 'Years Experience',
    sublabel: 'Industry Expertise',
    description: 'Established agency with proven track record since 2018.'
  },
  {
    icon: Clock,
    number: '24/7',
    label: 'Support',
    sublabel: 'Always Available',
    description: 'Our team is available round the clock for your needs.'
  }
];

// Usage
<BentoGrid2 
  cards={stats}
  mode="uniform"
  columns={4}
  showBadges={false}
  showStats={false}
  showCTA={false}
  ariaLabel="Company statistics"
/>
```

**Result:**
- Desktop: 4 equal columns
- Tablet: 2 columns
- Mobile: 1 column (stacked)
- Large stat numbers with icons
- No badges, no stats, no CTAs

---

#### **Example 3: Team Grid (Uniform 3 Columns)**

```tsx
import { BentoGrid2 } from './components/layout/BentoGrid2';
import { Code, Palette, BarChart } from 'lucide-react';

const team = [
  {
    icon: Code,
    label: 'Developers',
    sublabel: 'Tech Team',
    description: '12 full-stack developers building cutting-edge web solutions.'
  },
  {
    icon: Palette,
    label: 'Designers',
    sublabel: 'Creative Team',
    description: '15 designers crafting beautiful, user-friendly interfaces.'
  },
  {
    icon: BarChart,
    label: 'Marketers',
    sublabel: 'Marketing Team',
    description: '10 digital marketers driving results across all channels.'
  }
];

// Usage
<BentoGrid2 
  cards={team}
  mode="uniform"
  columns={3}
  ariaLabel="Our team structure"
/>
```

---

### **Responsive Behavior**

| Screen Size | Asymmetric Mode | Uniform Mode (4 cols) |
|-------------|-----------------|----------------------|
| **Mobile (≤768px)** | Accordion | 1 column stacked |
| **Tablet (768-1023px)** | 6-column grid | 2 columns |
| **Desktop (≥1024px)** | 8-column grid | 4 columns |

---

### **Grid Spacing**

**Asymmetric Mode:**
- Desktop gap: `gap-2 md:gap-3` (8px → 12px)
- Auto rows: `minmax(140px, auto)`

**Uniform Mode:**
- Gap: `gap-4 md:gap-6 lg:gap-8` (16px → 24px → 32px)

---

### **Accessibility Features**

✅ **Semantic HTML**
- Grid uses `role="list"`
- Cards use `role="listitem"`

✅ **ARIA Labels**
- Grid: `aria-label` prop (e.g., "Our services")
- Links: `aria-label="Learn more about {title}"`

✅ **Keyboard Navigation**
- All cards focusable with Tab
- Enter/Space to activate links
- Focus rings: 2px yellow outline

✅ **Screen Reader Support**
- Icons marked `aria-hidden="true"`
- Descriptive link text
- Stat labels properly announced

---

## 💡 USAGE EXAMPLES

### **Complete Page Section Example**

```tsx
import { BentoGrid2 } from '../layout/BentoGrid2';
import { Search, Target, Share2, PenTool, Mail, Code, Palette, Video } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      title: 'SEO Services',
      description: 'Improve your search engine rankings with our expert SEO strategies and technical optimization.',
      icon: Search,
      link: '/services/search-engine-optimization-seo'
    },
    {
      title: 'PPC & Google Ads',
      description: 'Drive immediate results with targeted paid advertising campaigns across Google and social media.',
      icon: Target,
      link: '/services/ppc-google-ads'
    },
    {
      title: 'Social Media Marketing',
      description: 'Build your brand presence and engage with your audience on Facebook, Instagram, LinkedIn, and Twitter.',
      icon: Share2,
      link: '/services/social-media-marketing'
    },
    {
      title: 'Content Marketing',
      description: 'Create compelling content that attracts, engages, and converts your target audience.',
      icon: PenTool,
      link: '/services/content-marketing'
    },
    {
      title: 'Email Marketing',
      description: 'Build relationships and drive conversions with personalized email campaigns.',
      icon: Mail,
      link: '/services/email-marketing'
    },
    {
      title: 'Web Design & Development',
      description: 'Build fast, responsive, and beautiful websites that convert visitors into customers.',
      icon: Code,
      link: '/services/web-design-development'
    },
    {
      title: 'Branding & Identity',
      description: 'Create a memorable brand identity that resonates with your target audience.',
      icon: Palette,
      link: '/services/branding-identity'
    },
    {
      title: 'Video Marketing',
      description: 'Tell your story with compelling video content that engages and converts.',
      icon: Video,
      link: '/services/video-marketing'
    },
    // ... 4 more cards to complete 12-card pattern
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">
            Our Digital Marketing Services
          </h2>
          <p className="text-[14px] md:text-[15px] text-white/70 max-w-2xl mx-auto leading-[1.6]">
            We offer a complete suite of digital marketing services to help your business grow online.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid2 
          cards={services}
          mode="asymmetric"
          showBadges={true}
          showStats={true}
          showCTA={true}
          ariaLabel="Our digital marketing services"
          className="mb-8"
        />

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-lg text-[14px] md:text-[15px] font-semibold hover:bg-yellow-400 transition-colors"
          >
            Get Started Today
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

### **Stats Section Example**

```tsx
import { BentoGrid2 } from '../layout/BentoGrid2';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      number: '150+',
      label: 'Projects',
      sublabel: 'Delivered',
      description: 'Successfully completed marketing campaigns.'
    },
    {
      icon: Users,
      number: '96+',
      label: 'Clients',
      sublabel: 'Satisfied',
      description: 'Businesses trust us for digital growth.'
    },
    {
      icon: Award,
      number: '7',
      label: 'Years',
      sublabel: 'Experience',
      description: 'Established agency since 2018.'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Support',
      sublabel: 'Available',
      description: 'Always here when you need us.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-center mb-12">
          Our Track Record
        </h2>

        <BentoGrid2 
          cards={stats}
          mode="uniform"
          columns={4}
          showBadges={false}
          ariaLabel="Company statistics"
        />
      </div>
    </section>
  );
}
```

---

## 🎯 BEST PRACTICES

### **Typography**
✅ **Always specify explicit sizing**
```tsx
// ❌ BAD
<h1>Heading</h1>

// ✅ GOOD
<h1 className="text-[30px] font-medium text-white">Heading</h1>
```

✅ **Use responsive sizing**
```tsx
<h1 className="text-[26px] md:text-[30px]">Heading</h1>
```

✅ **Specify text color**
```tsx
<p className="text-white/80">Text</p>
```

---

### **Cards**
✅ **Use appropriate card variant**
```tsx
// Standard content
<div className="glass p-6">...</div>

// Featured/important content
<div className="glass-strong p-8">...</div>

// Special features
<div className="glass-purple p-6">...</div>
```

✅ **Maintain consistent spacing**
```tsx
// Default card padding
<div className="glass p-6">...</div>

// Large card
<div className="glass p-8 md:p-12">...</div>
```

---

### **Bento Grids**
✅ **Choose correct mode**
```tsx
// For services/features with links → Asymmetric
<BentoGrid2 mode="asymmetric" cards={services} />

// For stats/teams without links → Uniform
<BentoGrid2 mode="uniform" columns={4} cards={stats} />
```

✅ **Provide 12 cards for asymmetric** (for perfect pattern)
```tsx
// If you have 14 services, pattern repeats after 12
<BentoGrid2 mode="asymmetric" cards={allServices} />
// Cards 0-11: First pattern
// Cards 12-13: Start of second pattern
```

✅ **Use aria-label for accessibility**
```tsx
<BentoGrid2 
  cards={services}
  ariaLabel="Our digital marketing services"
/>
```

---

## 📊 COMPONENT HIERARCHY

```
BentoGrid2 (Main Container)
├── Asymmetric Mode
│   ├── Mobile: Accordion
│   │   └── AccordionItem (per card)
│   │       ├── AccordionTrigger (icon + title)
│   │       └── AccordionContent (badge + description + CTA)
│   └── Desktop: Grid
│       └── AsymmetricCard (per card)
│           ├── Badge (if showBadges)
│           ├── Icon
│           ├── Title
│           ├── Description
│           ├── Stats (if showStats & wide card)
│           └── CTA (if showCTA)
│
└── Uniform Mode
    ├── Mobile: Accordion or Grid (depends on card type)
    └── Desktop: Grid
        ├── UniformCard (if BentoCard)
        │   ├── Icon
        │   ├── Title
        │   ├── Description
        │   └── CTA (if showCTA)
        └── SimpleCard (if SimpleBentoCard)
            ├── Icon (optional)
            ├── Number (optional)
            ├── Label
            ├── Sublabel (optional)
            └── Description (optional)
```

---

## 📏 DIMENSIONS & SPACING

### **Card Dimensions**
- **Asymmetric Mode:**
  - Small cards (2 cols): ~200px width (desktop)
  - Medium cards (3 cols): ~300px width
  - Wide cards (4 cols): ~400px width
  - Min height: 120px (mobile), 140px (desktop)

- **Uniform Mode:**
  - All cards equal width
  - Min height: 160px (simple), 200px (with links)

### **Grid Gaps**
- **Asymmetric:** 8px → 12px (mobile → desktop)
- **Uniform:** 16px → 24px → 32px (mobile → tablet → desktop)

### **Card Padding**
- **Default:** 24px (`p-6`)
- **Large:** 32px (`p-8`) or 48px (`p-12`)
- **Compact:** 16px (`p-4`)

---

**Documentation Version:** 1.0  
**Last Updated:** December 23, 2025  
**Status:** ✅ Complete & Production Ready
