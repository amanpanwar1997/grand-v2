/**
 * BENTO GRID 2.0 - UNIFIED GRID SYSTEM
 * Version: 3.0.0 - CENTRALIZED & OPTIMIZED
 * 
 * This is the PRIMARY and ONLY grid system for the entire website.
 * Handles all grid layouts with consistent spacing, accessibility, and performance.
 * 
 * GRID MODES:
 * 1. "asymmetric" - Advanced 2/6/8 column grid with 12-card pattern (PRIMARY for services/features)
 * 2. "uniform" - Simple equal-column grid for stats/teams (2/3/4/5 columns)
 * 
 * RESPONSIVE BREAKPOINTS:
 * - Mobile (≤768px): Simplified layouts
 * - Tablet (768-1023px): Intermediate layouts
 * - Desktop (≥1024px): Full grid layouts
 * 
 * PERFORMANCE:
 * - Pure CSS transitions (GPU-accelerated)
 * - Zero animation library dependencies
 * - Lazy loading ready
 * - Optimized for minimal re-renders
 * 
 * ACCESSIBILITY:
 * - Semantic HTML
 * - ARIA roles and labels
 * - Keyboard navigation support
 * - Screen reader optimized
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, LucideIcon } from 'lucide-react';
import { ServiceBadge, BadgeVariant, statsVariations } from '../ui/BadgeSystem';
import { useIsMobile } from '../ui/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BentoCard {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export interface SimpleBentoCard {
  icon?: LucideIcon;
  number?: string;
  label: string;
  sublabel?: string;
  description?: string;
}

interface BentoGrid2Props {
  // Card data
  cards: BentoCard[] | SimpleBentoCard[];
  
  // Grid mode
  mode?: 'asymmetric' | 'uniform';
  
  // Uniform grid columns (only for mode="uniform")
  columns?: 2 | 3 | 4 | 5;
  
  // Visual features
  showBadges?: boolean;
  showStats?: boolean;
  showCTA?: boolean;
  
  // Styling
  className?: string;
  
  // Accessibility
  ariaLabel?: string;
}

// ============================================================================
// ASYMMETRIC PATTERN SYSTEM (12-Card Pattern)
// ============================================================================

/**
 * 12-CARD ASYMMETRIC PATTERN (Desktop 8-col)
 * Perfect mathematical distribution - no empty spaces
 * 
 * Position 0-1:  col-span-4 (Wide) → 8 columns filled (4+4=8)
 * Position 2-5:  col-span-2 (Small) → 8 columns filled (2+2+2+2=8)
 * Position 6-8:  col-span-3, col-span-3, col-span-2 → 8 columns filled (3+3+2=8)
 * Position 9-11: col-span-2, col-span-2, col-span-4 → 8 columns filled (2+2+4=8)
 */
const asymmetricPattern = [
  'col-span-2 md:col-span-3 lg:col-span-4', // 0 - Wide
  'col-span-2 md:col-span-3 lg:col-span-4', // 1 - Wide
  'col-span-1 md:col-span-2 lg:col-span-2', // 2 - Small
  'col-span-1 md:col-span-2 lg:col-span-2', // 3 - Small
  'col-span-2 md:col-span-2 lg:col-span-2', // 4 - Small
  'col-span-2 md:col-span-2 lg:col-span-2', // 5 - Small
  'col-span-2 md:col-span-3 lg:col-span-3', // 6 - Medium
  'col-span-2 md:col-span-3 lg:col-span-3', // 7 - Medium
  'col-span-1 md:col-span-2 lg:col-span-2', // 8 - Small
  'col-span-1 md:col-span-2 lg:col-span-2', // 9 - Small
  'col-span-2 md:col-span-2 lg:col-span-2', // 10 - Small
  'col-span-2 md:col-span-4 lg:col-span-4', // 11 - Wide
];

// Badge pattern (12 variants)
const badgePattern: (BadgeVariant | null)[] = [
  'popular', 'trending', 'hot', 'new', 'featured', 'top',
  'essential', 'premium', 'best', 'top-pick', 'choice', 'rising'
];

// ============================================================================
// UNIFORM GRID CONFIGURATIONS
// ============================================================================

const uniformGridClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
};

// ============================================================================
// MAIN BENTO GRID 2.0 COMPONENT
// ============================================================================

export const BentoGrid2 = ({ 
  cards, 
  mode = 'asymmetric',
  columns = 4,
  showBadges = true, 
  showStats = true,
  showCTA = true,
  className = '',
  ariaLabel = 'Grid of cards'
}: BentoGrid2Props) => {
  
  // Mobile detection hook
  const isMobile = useIsMobile();
  
  // Determine if cards are BentoCard or SimpleBentoCard
  const isBentoCard = (card: BentoCard | SimpleBentoCard): card is BentoCard => {
    return 'link' in card;
  };

  // Asymmetric mode (advanced pattern)
  if (mode === 'asymmetric') {
    // Mobile: Render as Accordion
    if (isMobile) {
      return (
        <div className={className} aria-label={ariaLabel}>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {cards.map((card, index) => {
              if (!isBentoCard(card)) return null;
              
              const Icon = card.icon;
              const badge = badgePattern[index % badgePattern.length];
              
              return (
                <AccordionItem 
                  key={`accordion-card-${index}`}
                  value={`item-${index}`}
                  className="
                    bg-black
                    border border-white/20 rounded-lg
                    transition-all duration-300
                  "
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3 text-left w-full">
                      <Icon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-white flex-1">{card.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      {/* Badge */}
                      {showBadges && badge && (
                        <div className="flex justify-start">
                          <ServiceBadge variant={badge} />
                        </div>
                      )}
                      
                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {card.description}
                      </p>
                      
                      {/* CTA Link */}
                      {showCTA && (
                        <Link 
                          to={card.link}
                          className="
                            inline-flex items-center gap-2 text-yellow-500 text-sm
                            hover:gap-3 transition-all duration-300
                          "
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      );
    }
    
    // Desktop: Render as Grid
    return (
      <div 
        className={`grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 auto-rows-[minmax(120px,auto)] md:auto-rows-[minmax(140px,auto)] ${className}`}
        role="list"
        aria-label={ariaLabel}
      >
        {cards.map((card, index) => {
          if (!isBentoCard(card)) return null;
          
          const pattern = asymmetricPattern[index % asymmetricPattern.length];
          const badge = badgePattern[index % badgePattern.length];
          const stat = statsVariations[index % statsVariations.length];
          
          // Determine if card is "wide" (shows stats)
          const isWide = pattern.includes('col-span-4') || pattern.includes('lg:col-span-4');

          return (
            <AsymmetricCard
              key={`bento-card-${index}`}
              card={card}
              pattern={pattern}
              badge={showBadges && badge ? badge : null}
              stat={showStats && isWide ? stat : null}
              showCTA={showCTA}
              index={index}
            />
          );
        })}
      </div>
    );
  }

  // Uniform mode (simple equal columns)
  // Mobile: Render as Accordion (for cards with links/descriptions)
  if (isMobile && cards.some(card => isBentoCard(card) && 'description' in card)) {
    return (
      <div className={className} aria-label={ariaLabel}>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {cards.map((card, index) => {
            if (!isBentoCard(card)) {
              // For simple cards (stats), still show them as cards
              return (
                <SimpleCard
                  key={`simple-card-${index}`}
                  card={card}
                  index={index}
                />
              );
            }
            
            const Icon = card.icon;
            
            return (
              <AccordionItem 
                key={`accordion-uniform-${index}`}
                value={`item-${index}`}
                className="
                  bg-black
                  border border-white/20 rounded-lg
                  transition-all duration-300
                "
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center gap-3 text-left w-full">
                    <Icon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-white flex-1">{card.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3">
                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {card.description}
                    </p>
                    
                    {/* CTA Link */}
                    {showCTA && (
                      <Link 
                        to={card.link}
                        className="
                          inline-flex items-center gap-2 text-yellow-500 text-sm
                          hover:gap-3 transition-all duration-300
                        "
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }
  
  // Desktop or simple stats: Render as Grid
  return (
    <div 
      className={`grid ${uniformGridClasses[columns]} gap-4 md:gap-6 lg:gap-8 ${className}`}
      role="list"
      aria-label={ariaLabel}
    >
      {cards.map((card, index) => {
        if (isBentoCard(card)) {
          // If it's a linked card, render as AsymmetricCard with uniform sizing
          return (
            <UniformCard
              key={`uniform-card-${index}`}
              card={card}
              showCTA={showCTA}
              index={index}
            />
          );
        } else {
          // Render as simple stat/content card
          return (
            <SimpleCard
              key={`simple-card-${index}`}
              card={card}
              index={index}
            />
          );
        }
      })}
    </div>
  );
};

// ============================================================================
// ASYMMETRIC CARD COMPONENT (Advanced Pattern)
// ============================================================================

interface AsymmetricCardProps {
  card: BentoCard;
  pattern: string;
  badge: BadgeVariant | null;
  stat: { number: string; label: string } | null;
  showCTA: boolean;
  index: number;
}

const AsymmetricCard = ({ card, pattern, badge, stat, showCTA, index }: AsymmetricCardProps) => {
  const Icon = card.icon;

  return (
    <div className={pattern} role="listitem">
      <Link 
        to={card.link} 
        className="block h-full"
        aria-label={`Learn more about ${card.title}`}
      >
        <div className="
          h-full relative overflow-hidden rounded-lg
          bg-black
          border border-white/20 hover:border-yellow-500
          transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
          flex flex-col p-3 md:p-4
          group
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
        ">
          {/* Content Layer */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Badge */}
            {badge && (
              <div className="self-end mb-2">
                <ServiceBadge variant={badge} />
              </div>
            )}

            {/* Icon + Text */}
            <div className="flex flex-col gap-2 md:gap-3 mb-auto">
              {/* Icon - ⭐ SERVICE ICON ANIMATIONS (Enhancement #24) ⭐ */}
              <Icon 
                className="w-5 h-5 text-white group-hover:text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
                aria-hidden="true"
                style={{
                  filter: 'drop-shadow(0 0 0 transparent)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.5))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)';
                }}
              />

              {/* Title */}
              <h3 className="
                text-white group-hover:text-yellow-500 
                transition-colors duration-300
                mb-0.5 md:mb-1
              ">
                {card.title}
              </h3>

              {/* Description */}
              <p className="
                text-gray-400 group-hover:text-gray-300
                text-sm
                transition-colors duration-300
                line-clamp-2
              ">
                {card.description}
              </p>
            </div>

            {/* Bottom Section: Stats + CTA */}
            <div className="mt-auto pt-3 flex items-center justify-between gap-2">
              {/* Stats Display (Wide Cards Only) */}
              {stat ? (
                <div className="
                  flex items-center gap-1.5 px-2 py-1
                  bg-black border border-white/10 group-hover:border-yellow-500/20
                  rounded transition-colors duration-300
                " aria-label={`${stat.number} ${stat.label}`}>
                  <Sparkles className="w-3 h-3 text-white" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-white text-xs md:text-sm font-semibold">{stat.number}</span>
                    <span className="text-gray-400 text-xs">{stat.label}</span>
                  </div>
                </div>
              ) : (
                <div aria-hidden="true" /> 
              )}

              {/* CTA Button */}
              {showCTA && (
                <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <span className="hidden sm:inline">View</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// ============================================================================
// UNIFORM CARD COMPONENT (Equal Columns with Links)
// ============================================================================

interface UniformCardProps {
  card: BentoCard;
  showCTA: boolean;
  index: number;
}

const UniformCard = ({ card, showCTA, index }: UniformCardProps) => {
  const Icon = card.icon;

  return (
    <div role="listitem">
      <Link 
        to={card.link} 
        className="block h-full"
        aria-label={`Learn more about ${card.title}`}
      >
        <div className="
          h-full relative overflow-hidden rounded-lg
          bg-black
          border border-white/20 hover:border-yellow-500
          transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
          flex flex-col p-6
          group
          min-h-[200px]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
        ">
          {/* Content Layer */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <Icon 
              className="w-8 h-8 text-white mb-4" 
              aria-hidden="true"
            />

            {/* Title */}
            <h3 className="
              text-white group-hover:text-yellow-500 
              transition-colors duration-300
              mb-2
            ">
              {card.title}
            </h3>

            {/* Description */}
            <p className="
              text-gray-400 group-hover:text-gray-300
              text-sm
              transition-colors duration-300
              mb-auto
              line-clamp-3
            ">
              {card.description}
            </p>

            {/* CTA */}
            {showCTA && (
              <div className="mt-4 flex items-center gap-1 text-yellow-500 text-sm font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <span className="hidden sm:inline">Learn More</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

// ============================================================================
// SIMPLE CARD COMPONENT (Stats, Features - No Links)
// ============================================================================

interface SimpleCardProps {
  card: SimpleBentoCard;
  index: number;
}

const SimpleCard = ({ card, index }: SimpleCardProps) => {
  const Icon = card.icon;

  return (
    <div 
      role="listitem"
      className="
        relative overflow-hidden rounded-lg
        bg-black border border-white/10
        p-6
        min-h-[160px]
        flex flex-col
        transition-all duration-300 hover:border-white/20
      "
    >
      {/* Icon (if provided) */}
      {Icon && (
        <Icon 
          className="w-8 h-8 text-white mb-4" 
          aria-hidden="true"
        />
      )}

      {/* Number/Stat (if provided) */}
      {card.number && (
        <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-3">
          {card.number}
        </div>
      )}

      {/* Label */}
      <h4 className="text-white font-semibold mb-2">
        {card.label}
      </h4>

      {/* Sublabel (if provided) */}
      {card.sublabel && (
        <p className="text-sm text-gray-400 mb-2">
          {card.sublabel}
        </p>
      )}

      {/* Description (if provided) */}
      {card.description && (
        <p className="text-sm text-gray-400 leading-relaxed">
          {card.description}
        </p>
      )}
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default BentoGrid2;
