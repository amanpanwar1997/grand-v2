/**
 * BADGE SYSTEM - Simple Version for Bento Grid 2.0
 */

import { 
  Star, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Trophy, 
  Shield
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export type BadgeVariant = 
  | 'popular' 
  | 'trending' 
  | 'hot' 
  | 'new' 
  | 'featured' 
  | 'top' 
  | 'essential' 
  | 'premium' 
  | 'best' 
  | 'top-pick' 
  | 'choice' 
  | 'rising';

interface BadgeConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

const badgeConfigs: Record<BadgeVariant, BadgeConfig> = {
  'popular': {
    label: 'Popular',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: Star
  },
  'trending': {
    label: 'Trending',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    icon: TrendingUp
  },
  'hot': {
    label: 'Hot',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    icon: Award
  },
  'new': {
    label: 'New',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    icon: Sparkles
  },
  'featured': {
    label: 'Featured',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    icon: Trophy
  },
  'top': {
    label: 'Top',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: Star
  },
  'essential': {
    label: 'Essential',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
    borderColor: 'border-indigo-500/30',
    icon: Shield
  },
  'premium': {
    label: 'Premium',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
    borderColor: 'border-pink-500/30',
    icon: Award
  },
  'best': {
    label: 'Best',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
    icon: TrendingUp
  },
  'top-pick': {
    label: 'Top Pick',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: Trophy
  },
  'choice': {
    label: 'Choice',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: Star
  },
  'rising': {
    label: 'Rising',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/20',
    borderColor: 'border-violet-500/30',
    icon: Sparkles
  }
};

interface ServiceBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

export const ServiceBadge = ({ variant, className = '' }: ServiceBadgeProps) => {
  const config = badgeConfigs[variant];
  const Icon = config.icon;

  return (
    <div 
      className={`
        flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-sm
        ${config.color} ${config.bgColor} ${config.borderColor}
        ${className}
      `}
    >
      <Icon className="w-3 h-3" />
      <span className="text-xs">{config.label}</span>
    </div>
  );
};

// 12 Stats Variations
export const statsVariations = [
  { number: '500+', label: 'Projects' },
  { number: '98%', label: 'Success Rate' },
  { number: '24/7', label: 'Support' },
  { number: '10x', label: 'ROI' },
  { number: '1M+', label: 'Reach' },
  { number: '250+', label: 'Campaigns' },
  { number: '95%', label: 'Retention' },
  { number: '50+', label: 'Awards' },
  { number: '3x', label: 'Growth' },
  { number: '100+', label: 'Brands' },
  { number: '2.5M', label: 'Views' },
  { number: '99%', label: 'Uptime' }
];
