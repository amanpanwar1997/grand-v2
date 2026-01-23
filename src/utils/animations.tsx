/**
 * ANIMATION UTILITIES - MOTION (FRAMER MOTION)
 * Enterprise-level animation system for Inchtomilez
 * Version: 3.0.0
 * 
 * Uses: motion/react (modern Motion library)
 * 
 * Features:
 * ✅ Scroll-triggered animations
 * ✅ Page transitions
 * ✅ Stagger effects
 * ✅ Parallax scrolling
 * ✅ Hover interactions
 * ✅ Performance-optimized (GPU-accelerated)
 */

import { Variants } from 'motion/react';

/**
 * ANIMATION CONFIGURATION
 */

export const animationConfig = {
  // Standard timing
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    verySlow: 0.8,
  },
  
  // Easing functions
  ease: {
    smooth: [0.4, 0, 0.2, 1], // Smooth cubic-bezier
    snappy: [0.6, 0.01, 0.05, 0.95], // Snappy feel
    bounce: [0.68, -0.55, 0.265, 1.55], // Bounce effect
    elastic: [0.175, 0.885, 0.32, 1.275], // Elastic feel
  },
  
  // Stagger timing
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
};

/**
 * FADE ANIMATIONS
 */

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

/**
 * SCALE ANIMATIONS
 */

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationConfig.duration.slow,
      ease: animationConfig.ease.snappy,
    },
  },
};

export const bounce: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationConfig.duration.slow,
      ease: animationConfig.ease.bounce,
    },
  },
};

/**
 * SLIDE ANIMATIONS
 */

export const slideInFromTop: Variants = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const slideInFromBottom: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const slideInFromLeft: Variants = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    },
  },
};

/**
 * STAGGER CONTAINER
 * Use this for parent elements to stagger children
 */

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animationConfig.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animationConfig.stagger.fast,
      delayChildren: 0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animationConfig.stagger.slow,
      delayChildren: 0.2,
    },
  },
};

/**
 * CARD HOVER ANIMATIONS
 */

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: animationConfig.ease.snappy,
    },
  },
};

export const cardHoverGlow = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0px rgba(234, 179, 8, 0)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 30px rgba(234, 179, 8, 0.3)',
    transition: {
      duration: 0.3,
      ease: animationConfig.ease.smooth,
    },
  },
};

/**
 * TEXT ANIMATIONS
 */

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const gradientShift = {
  initial: {
    backgroundPosition: '0% 50%',
  },
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 8,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

/**
 * SCROLL-TRIGGERED ANIMATIONS
 * Use with InView component from motion/react
 */

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const scrollScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: animationConfig.ease.snappy,
    },
  },
};

export const scrollSlideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const scrollSlideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: animationConfig.ease.smooth,
    },
  },
};

/**
 * PAGE TRANSITION VARIANTS
 */

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: animationConfig.ease.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: animationConfig.ease.smooth,
    },
  },
};

export const pageFade: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const pageSlide: Variants = {
  initial: {
    x: 50,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: animationConfig.ease.smooth,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: animationConfig.ease.smooth,
    },
  },
};

/**
 * MODAL/DIALOG ANIMATIONS
 */

export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: animationConfig.ease.snappy,
    },
  },
};

export const slideUpModal: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: animationConfig.ease.smooth,
    },
  },
};

/**
 * NUMBER COUNTER ANIMATION
 * For statistics/counters
 */

export const counterAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5,
    ease: animationConfig.ease.bounce,
  },
};

/**
 * FLOATING ANIMATION (Continuous)
 */

export const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/**
 * MOBILE-SAFE ANIMATIONS
 * Reduced motion for mobile devices
 */

export const getMobileSafeVariant = (
  variant: Variants,
  isMobile: boolean
): Variants => {
  if (isMobile) {
    // Reduce animation distance and speed on mobile
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
    };
  }
  return variant;
};

/**
 * USAGE EXAMPLES:
 * 
 * 1. Fade in on mount:
 * <motion.div
 *   initial="hidden"
 *   animate="visible"
 *   variants={fadeInUp}
 * >
 *   Content
 * </motion.div>
 * 
 * 2. Scroll-triggered:
 * <motion.div
 *   initial="hidden"
 *   whileInView="visible"
 *   viewport={{ once: true, amount: 0.3 }}
 *   variants={scrollReveal}
 * >
 *   Content
 * </motion.div>
 * 
 * 3. Stagger children:
 * <motion.div
 *   initial="hidden"
 *   animate="visible"
 *   variants={staggerContainer}
 * >
 *   {items.map((item, i) => (
 *     <motion.div key={i} variants={fadeInUp}>
 *       {item}
 *     </motion.div>
 *   ))}
 * </motion.div>
 * 
 * 4. Hover effect:
 * <motion.div
 *   whileHover="hover"
 *   initial="rest"
 *   variants={cardHover}
 * >
 *   Hover me
 * </motion.div>
 */
