import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'word' | 'letter' | 'line';
}

/**
 * ⭐ TEXT REVEAL ANIMATIONS (Enhancement #7) ⭐
 * 
 * Text animates in word-by-word or letter-by-letter
 * - Cinematic, premium feel
 * - Hero headings on load
 * - Section titles on scroll
 * - Stagger delays for smooth effect
 */

export function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  type = 'word',
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Split text based on type
  const getTextParts = () => {
    if (type === 'letter') {
      return text.split('');
    } else if (type === 'word') {
      return text.split(' ');
    } else {
      return text.split('\n');
    }
  };

  const parts = getTextParts();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === 'letter' ? 0.03 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {parts.map((part, index) => (
        <motion.span
          key={index}
          variants={item}
          style={{ display: 'inline-block' }}
        >
          {part}
          {type === 'word' && index < parts.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
}
