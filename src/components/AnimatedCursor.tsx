import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Point {
  x: number;
  y: number;
}

// Brand colors: White, Yellow-500, Yellow-400
const BRAND_COLORS = [
  { r: 255, g: 255, b: 255 },  // White (#FFFFFF) - Shining silver
  { r: 234, g: 179, b: 8 },    // Yellow (#EAB308) - Brand yellow-500
  { r: 251, g: 191, b: 36 },   // Light Yellow (#FBBF24) - yellow-400
];

export function AnimatedCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number>();
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection - disable cursor effect on small screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Don't render on mobile/tablet
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Resize canvas for high DPI displays (retina support)
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Track mouse position (viewport coordinates)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Color interpolation function
    const getColor = (t: number, opacity: number): string => {
      const pos = (t % 1) * (BRAND_COLORS.length - 1);
      const idx1 = Math.floor(pos);
      const idx2 = (idx1 + 1) % BRAND_COLORS.length;
      const blend = pos - idx1;
      
      const c1 = BRAND_COLORS[idx1];
      const c2 = BRAND_COLORS[idx2];
      
      const r = Math.round(c1.r + (c2.r - c1.r) * blend);
      const g = Math.round(c1.g + (c2.g - c1.g) * blend);
      const b = Math.round(c1.b + (c2.b - c1.b) * blend);
      
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Add current mouse position to trail
      pointsRef.current.unshift({ ...mouseRef.current });
      
      // Limit trail length to 20 points
      if (pointsRef.current.length > 20) {
        pointsRef.current.length = 20;
      }

      // Smooth trail with elastic easing
      for (let i = 1; i < pointsRef.current.length; i++) {
        const prev = pointsRef.current[i - 1];
        const curr = pointsRef.current[i];
        
        // Lerp toward previous point (elastic smoothing)
        curr.x += (prev.x - curr.x) * 0.2;
        curr.y += (prev.y - curr.y) * 0.2;
      }

      // Draw trail if we have enough points
      if (pointsRef.current.length >= 2) {
        const time = Date.now() / 3000; // 3-second color cycle

        // Create gradient from cursor to tail
        const start = pointsRef.current[0];
        const end = pointsRef.current[pointsRef.current.length - 1];
        const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        
        // Add color stops with fading opacity
        for (let i = 0; i <= 10; i++) {
          const progress = i / 10;
          const opacity = 0.8 * (1 - progress * 0.6); // Fade from 80% to 32%
          gradient.addColorStop(
            progress,
            getColor(progress * 0.3 + time, opacity)
          );
        }

        // Configure line style
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = getColor(time, 0.6);

        // Draw smooth bezier curve through points
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);

        for (let i = 1; i < pointsRef.current.length - 1; i++) {
          const curr = pointsRef.current[i];
          const next = pointsRef.current[i + 1];
          const midX = (curr.x + next.x) / 2;
          const midY = (curr.y + next.y) / 2;
          ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
        }

        const last = pointsRef.current[pointsRef.current.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      }

      // Request next frame
      rafRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  // Portal to document.body with minimal CSS (no conflicting transforms)
  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // Allow clicks through canvas
        zIndex: 999999, // Always on top
      }}
    />,
    document.body
  );
}
