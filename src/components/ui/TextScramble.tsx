import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number; // Characters per frame
  delay?: number; // Delay before starting (ms)
  triggerOnView?: boolean; // Trigger when scrolled into view
}

/**
 * ⭐ TEXT SCRAMBLE EFFECT (Enhancement #15) ⭐
 * 
 * Text "decodes" letter by letter (matrix-style)
 * - Tech-forward, unique effect
 * - Hero headings on page load
 * - Section headings on scroll
 * - Button labels on hover
 */

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function TextScramble({
  text,
  className = '',
  speed = 1,
  delay = 0,
  triggerOnView = false,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const resolveRef = useRef(0);

  const scramble = () => {
    let frame = 0;
    const queue: Array<{ from: string; to: string; start: number; end: number }> = [];
    
    // Build queue of character animations
    for (let i = 0; i < Math.max(text.length, displayText.length); i++) {
      const from = displayText[i] || '';
      const to = text[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      queue.push({ from, to, start, end });
    }

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!to) {
            complete++;
            continue;
          }
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          output += from;
        }
      }

      setDisplayText(output);
      
      if (complete === queue.length) {
        cancelAnimationFrame(resolveRef.current);
      } else {
        frame += speed;
        frameRef.current = requestAnimationFrame(update);
      }
    };

    update();
  };

  useEffect(() => {
    if (triggerOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(scramble, delay);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        observer.disconnect();
        cancelAnimationFrame(frameRef.current);
        cancelAnimationFrame(resolveRef.current);
      };
    } else {
      // Trigger immediately with delay
      const timeout = setTimeout(scramble, delay);
      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(frameRef.current);
        cancelAnimationFrame(resolveRef.current);
      };
    }
  }, [text, delay, triggerOnView, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
