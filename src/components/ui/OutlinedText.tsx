import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect } from 'react';

/**
 * OutlinedText V5.0 - SSG COMPATIBLE EDITION
 * 
 * ✨ BASE FEATURES:
 * ✅ 15% VISIBLE outline (stroke has rgba 0.15 alpha = 85% transparent) - EXTRA SUBTLE
 * ✅ Alternating LEFT/RIGHT entrance (no overlap)
 * ✅ One by one animation (sequential delays)
 * ✅ Scroll-down: Text slides in from sides, STOPS at edge (not center)
 * ✅ Scroll-up: Text fades and slides away
 * ✅ EDGE POSITIONING: Text stops at X% of viewport width (default: 25%)
 * ✅ NO SHADOWS - Ultra crisp and clean
 * ✅ GPU-accelerated performance (60fps)
 * 
 * 🌊 3D FEATURES:
 * ✨ Multi-layer depth (zDepth: -500 to +500)
 * ✨ Depth of field blur (depthBlur: 0-10px)
 * ✨ Scale by distance (depthScale: 0.5-1.5)
 * ✨ 3D rotation on scroll (rotateOnScroll with X/Y/Both axes)
 * ✨ Mouse-interactive tilt (mouseTilt with configurable strength)
 * ✨ Dynamic blur on scroll (dynamicBlur with range)
 * 
 * ✅ SSG COMPATIBLE - No external dependencies
 */

interface OutlinedTextProps {
  // V3.3 Base Props
  text: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  parallax?: boolean;
  parallaxSpeed?: number;
  animate?: boolean;
  position?: 'center' | 'left' | 'right';
  direction?: 'left' | 'right'; // ONLY left or right for alternating
  delay?: number; // Sequential reveal delay (0, 0.2, 0.4, 0.6...)
  scale?: boolean; // Enable subtle scale animation on scroll
  fadeEdges?: boolean; // Fade opacity at scroll edges
  ariaHidden?: boolean;
  stopPosition?: number; // Percentage of viewport width where text stops (default: 25%)
  
  // V4.0 3D Enhancement Props
  zDepth?: number; // Z-axis depth (-500 to +500, 0 = normal plane)
  depthBlur?: number; // Blur amount based on depth (0-10px)
  depthScale?: number; // Scale multiplier based on depth (0.5-1.5)
  rotateOnScroll?: boolean; // Enable 3D rotation on scroll
  rotateAxis?: 'x' | 'y' | 'both'; // Rotation axis
  rotateAmount?: number; // Rotation degrees (5-20° recommended)
  rotateSpeed?: number; // Rotation speed multiplier (0.1-1.0)
  mouseTilt?: boolean; // Enable mouse-interactive tilt
  tiltAmount?: number; // Tilt degrees on mouse (5-20°)
  tiltSpeed?: number; // Tilt smooth factor (0.1-0.5)
  dynamicBlur?: boolean; // Enable scroll-based blur
  blurRange?: [number, number]; // Min/max blur [0, 10]
  opacity?: number; // Custom opacity override (0-1)
}

export const OutlinedText = ({
  text,
  size = 'large',
  className = '',
  parallax = false,
  parallaxSpeed = 0.5,
  animate = true,
  position = 'center',
  direction = 'left',
  delay = 0,
  scale = false,
  fadeEdges = false,
  ariaHidden = true,
  stopPosition = 25, // Default stop position (25% from edge)
  // 3D Enhancement defaults
  zDepth = 0,
  depthBlur = 0,
  depthScale = 1,
  rotateOnScroll = false,
  rotateAxis = 'y',
  rotateAmount = 10,
  rotateSpeed = 0.5,
  mouseTilt = false,
  tiltAmount = 10,
  tiltSpeed = 0.3,
  dynamicBlur = false,
  blurRange = [0, 5],
  opacity: customOpacity,
}: OutlinedTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Mouse position for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for mouse tilt
  const tiltX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const tiltY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // Mouse move handler for tilt effect
  useEffect(() => {
    if (!mouseTilt || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate tilt based on mouse position (-1 to 1 range)
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      // Apply tilt amount
      mouseX.set(xPercent * tiltAmount);
      mouseY.set(-yPercent * tiltAmount); // Negative for natural tilt direction
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseTilt, tiltAmount, mouseX, mouseY]);

  // Parallax transform - vertical movement based on scroll
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [0, -100 * parallaxSpeed] : [0, 0]
  );

  // Animation transforms - ONLY LEFT or RIGHT (alternating entrance)
  const slideDistance = 300; // Initial distance to slide from edges (px)
  
  // X-axis transform - Enters from left OR right based on direction
  // Stops at stopPosition% of viewport width instead of center (0)
  // Convert stopPosition to actual vw value for the transform
  const stopVw = typeof window !== 'undefined' ? (window.innerWidth * stopPosition) / 100 : stopPosition * 10;
  
  const xTransform = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    direction === 'left' 
      ? [-slideDistance, -stopVw, -stopVw, -stopVw]  // Slide in from LEFT, stop at -X% vw
      : [slideDistance, stopVw, stopVw, stopVw]   // Slide in from RIGHT, stop at X% vw
  );

  // Y-axis - ONLY parallax (no vertical entrance)
  const y = yParallax;

  // 🌊 3D SCALE ANIMATION (depth-based + breathing)
  const baseScale = depthScale || 1; // Use depthScale prop or default
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scale 
      ? [baseScale * 0.98, baseScale * 1.02, baseScale * 0.98] // Breathing with depth scale
      : [baseScale, baseScale, baseScale] // Static depth scale
  );

  // 🌊 3D ROTATION ON SCROLL
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    rotateOnScroll && (rotateAxis === 'x' || rotateAxis === 'both')
      ? [0, rotateAmount * rotateSpeed, 0]
      : [0, 0, 0]
  );
  
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    rotateOnScroll && (rotateAxis === 'y' || rotateAxis === 'both')
      ? [0, rotateAmount * rotateSpeed, 0]
      : [0, 0, 0]
  );

  // 🌊 DYNAMIC BLUR (scroll-based)
  const scrollBlur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    dynamicBlur 
      ? [blurRange[1], blurRange[0], blurRange[0], blurRange[1]] // Start/end blurred, middle sharp
      : [0, 0, 0, 0]
  );

  // Combine depth blur + dynamic blur
  const totalBlur = useTransform(
    [scrollBlur],
    ([scroll]) => depthBlur + (scroll || 0)
  );

  // ⭐ OPACITY (with custom override support)
  const baseOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9, 1],
    [0, 0.8, 1, 0.8, 0]  // Full opacity range - stroke transparency is in CSS
  );
  
  const finalOpacity = customOpacity !== undefined ? customOpacity : baseOpacity;

  // 🎯 SIZE CLASSES - Responsive background text
  const sizeClasses = {
    small: 'text-[60px] md:text-[80px] lg:text-[100px]',
    medium: 'text-[80px] md:text-[120px] lg:text-[160px]',
    large: 'text-[100px] md:text-[150px] lg:text-[200px]',
    xlarge: 'text-[120px] md:text-[180px] lg:text-[240px]',
  };

  // Position classes
  const positionClasses = {
    center: 'left-1/2 -translate-x-1/2 text-center',
    left: 'left-4 md:left-8 text-left',
    right: 'right-4 md:right-8 text-right',
  };

  return (
    <div 
      ref={ref} 
      className="absolute inset-0 overflow-visible pointer-events-none"
      style={{
        perspective: '1000px', // Enable 3D perspective
        perspectiveOrigin: 'center',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={animate ? { 
          x: xTransform, 
          y, 
          opacity: finalOpacity,
          scale: scaleValue,
          // 🌊 3D TRANSFORMS
          translateZ: zDepth, // Z-axis depth
          rotateX: mouseTilt ? tiltY : rotateX, // Mouse tilt overrides scroll rotation on X
          rotateY: mouseTilt ? tiltX : rotateY, // Mouse tilt overrides scroll rotation on Y
          filter: totalBlur ? `blur(${totalBlur}px)` : undefined, // Depth + dynamic blur
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        } : undefined}
        initial={animate ? { opacity: 0 } : undefined}
        transition={{ 
          delay,
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={`
          absolute top-1/2 -translate-y-1/2
          ${positionClasses[position]}
          ${sizeClasses[size]}
          font-bold
          text-outlined-visible-full
          select-none
          whitespace-nowrap
          bg-transparent
          will-change-transform
          ${className}
        `}
        aria-hidden={ariaHidden}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default OutlinedText;
