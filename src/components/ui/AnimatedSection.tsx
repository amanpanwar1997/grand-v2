/**
 * ANIMATED SECTION COMPONENT
 * Scroll-triggered animations using Motion (Framer Motion)
 * Version: 4.0.0 - Cinematic Edition
 * 
 * Features:
 * - Scroll direction detection (up/down)
 * - Fade in when scrolling down, fade out when scrolling up
 * - GPU-accelerated, performance-optimized
 * - Respects prefers-reduced-motion
 */

import { ReactNode, useEffect, useState } from 'react';
import { motion, Variants, useScroll, useTransform, useMotionValue } from 'motion/react';
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scrollReveal,
  scrollScale,
  staggerContainer,
} from '../../utils/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 
    | 'fadeInUp' 
    | 'fadeInDown' 
    | 'fadeInLeft' 
    | 'fadeInRight' 
    | 'scaleIn'
    | 'scrollReveal'
    | 'scrollScale'
    | 'stagger'
    | 'scrollDirection' // NEW: Fade in on scroll down, fade out on scroll up
    | 'none';
  delay?: number;
  once?: boolean; // Animate only once when entering viewport
  amount?: number; // How much of element should be visible (0-1)
  stagger?: boolean; // Enable stagger for children
  scrollDirection?: 'both' | 'down-only'; // NEW: Control scroll direction behavior
}

const animationVariants: Record<string, Variants> = {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scrollReveal,
  scrollScale,
  stagger: staggerContainer,
};

export function AnimatedSection({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  once = true,
  amount = 0.3,
  stagger = false,
  scrollDirection = 'both',
}: AnimatedSectionProps) {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // If no animation or prefers reduced motion, render without motion
  if (animation === 'none' || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // NEW: Scroll direction animation
  if (animation === 'scrollDirection') {
    return (
      <ScrollDirectionSection
        className={className}
        delay={delay}
        once={once}
        amount={amount}
        direction={scrollDirection}
      >
        {children}
      </ScrollDirectionSection>
    );
  }

  const variants = animationVariants[animation] || fadeInUp;

  // Add delay to transition if specified
  const variantsWithDelay: Variants = {
    ...variants,
    visible: {
      ...(variants.visible as any),
      transition: {
        ...(variants.visible as any)?.transition,
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once, 
        amount,
        margin: '0px 0px -50px 0px', // Start animation 50px before entering viewport
      }}
      variants={stagger ? staggerContainer : variantsWithDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * SCROLL DIRECTION SECTION
 * Fades in when scrolling down, fades out when scrolling up
 */
interface ScrollDirectionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  direction?: 'both' | 'down-only';
}

function ScrollDirectionSection({
  children,
  className = '',
  delay = 0,
  once = false,
  amount = 0.3,
  direction = 'both',
}: ScrollDirectionSectionProps) {
  const scrollDirectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once, 
        amount,
        margin: '0px 0px -100px 0px',
      }}
      variants={scrollDirectionVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ANIMATED STAGGER CONTAINER
 * Automatically staggers children elements
 */

interface AnimatedStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childAnimation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
}

export function AnimatedStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  childAnimation = 'fadeInUp',
}: AnimatedStaggerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = animationVariants[childAnimation];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

/**
 * ANIMATED CARD
 * Card with hover and scroll animations
 */

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  glowOnHover?: boolean;
}

export function AnimatedCard({
  children,
  className = '',
  hoverScale = 1.02,
  hoverY = -4,
  glowOnHover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scrollReveal}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: glowOnHover
          ? '0 0 30px rgba(234, 179, 8, 0.3)'
          : undefined,
        transition: {
          duration: 0.3,
          ease: [0.6, 0.01, 0.05, 0.95],
        },
      }}
      className={className}
      style={{
        willChange: 'transform, box-shadow',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ANIMATED TEXT
 * Text reveal animation with gradient
 */

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  delay?: number;
}

export function AnimatedText({
  children,
  className = '',
  gradient = false,
  delay = 0,
}: AnimatedTextProps) {
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={textVariants}
      className={`${className} ${gradient ? 'bg-gradient-to-br from-white to-yellow-500 bg-clip-text text-transparent' : ''}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * ANIMATED NUMBER COUNTER
 * Animates numbers counting up
 */

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.68, -0.55, 0.265, 1.55],
      }}
    >
      <motion.span
        initial={{ textContent: from }}
        whileInView={{ textContent: to }}
        viewport={{ once: true }}
        transition={{
          duration,
          ease: 'easeOut',
        }}
        // @ts-ignore
        style={{
          display: 'inline-block',
        }}
      >
        {prefix}{from}{suffix}
      </motion.span>
    </motion.span>
  );
}

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic animated section:
 * <AnimatedSection animation="fadeInUp">
 *   <h2>This fades in from bottom</h2>
 * </AnimatedSection>
 * 
 * 2. Staggered list:
 * <AnimatedStagger staggerDelay={0.1} childAnimation="scaleIn">
 *   {items.map(item => (
 *     <div key={item.id}>{item.name}</div>
 *   ))}
 * </AnimatedStagger>
 * 
 * 3. Animated card with hover:
 * <AnimatedCard glowOnHover={true}>
 *   <h3>Service Title</h3>
 *   <p>Description</p>
 * </AnimatedCard>
 * 
 * 4. Animated text with gradient:
 * <AnimatedText gradient={true}>
 *   <h1>Beautiful Heading</h1>
 * </AnimatedText>
 * 
 * 5. Number counter:
 * <AnimatedCounter to={100} suffix="+" duration={2} />
 */
