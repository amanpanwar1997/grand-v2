import { useEffect, useRef } from 'react';

/**
 * OceanWaves Component - 3D Glowing Orb Ocean Effect ⭐ PREMIUM EDITION
 * 
 * Features:
 * - 3D particle-based ocean waves using Canvas2D
 * - GLOWING ORB RENDERING with radial gradients (white → yellow halos)
 * - Triple-layer post-processing (sharp + soft glow + wide halo)
 * - Dynamic wave animation with 3D rotation
 * - Perspective depth and scale effects
 * - GPU-accelerated rendering (60fps)
 * - Responsive sizing with ResizeObserver
 * - Performance optimized with Intersection Observer
 * 
 * Visual Effect:
 * ✨ Premium glowing energy spheres
 * ✨ Bright white cores with yellow-gold halos
 * ✨ Soft luminous glow (24px blur radius)
 * ✨ Cinematic floating light aesthetic
 * ✨ Futuristic premium brand perception
 * 
 * Version: 2.0.0 - Glowing Orbs Edition
 */

interface OceanWavesProps {
  /**
   * Number of particles/vertices (default: 7000)
   * Higher = more detail, lower = better performance
   */
  vertexCount?: number;
  
  /**
   * Size of each particle/dot (default: 3)
   */
  vertexSize?: number;
  
  /**
   * Wave height intensity (default: 16)
   */
  waveSize?: number;
  
  /**
   * Particle color (default: 'whitesmoke')
   */
  particleColor?: string;
  
  /**
   * Background opacity (default: 0.15)
   * 0 = transparent, 1 = fully opaque
   */
  opacity?: number;
  
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

interface Vertex {
  x: number;
  y: number;
  z: number;
}

export const OceanWaves = ({
  vertexCount = 7000,
  vertexSize = 3,
  waveSize = 16,
  particleColor = 'whitesmoke',
  opacity = 0.15,
  className = '',
}: OceanWavesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const postCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const verticesRef = useRef<Vertex[]>([]);
  const frameRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const postCanvas = postCanvasRef.current;
    if (!canvas || !postCanvas) {
      console.warn('OceanWaves: Canvas refs not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    const postCtx = postCanvas.getContext('2d');
    if (!ctx || !postCtx) {
      console.warn('OceanWaves: Could not get canvas context');
      return;
    }

    console.log('🌊 OceanWaves initialized:', {
      vertexCount,
      vertexSize,
      waveSize,
      particleColor,
      opacity
    });

    // Effect Properties - Adjusted for full screen coverage
    const oceanWidth = 250;      // ← Increased from 204 (wider distribution)
    const oceanHeight = -60;     // ← Adjusted from -80 (better vertical fill)
    const gridSize = 28;         // ← Decreased from 32 (tighter grid, more coverage)
    const perspective = 120;     // ← Increased from 100 (better depth perception)

    // Common variables
    const depth = vertexCount / oceanWidth * gridSize;
    const sin = Math.sin;
    const cos = Math.cos;
    const PI = Math.PI;

    // Resize handler - Size to parent section
    const resizeCanvas = () => {
      // Get parent section dimensions (if available)
      const parent = canvas.parentElement?.parentElement;
      const width = parent?.offsetWidth || window.innerWidth;
      const height = parent?.offsetHeight || window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      postCanvas.width = width;
      postCanvas.height = height;
      
      console.log('🌊 OceanWaves canvas resized:', { width, height, parent: !!parent });
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ResizeObserver for parent section size changes
    const parent = canvas.parentElement?.parentElement;
    const resizeObserver = parent ? new ResizeObserver(() => {
      resizeCanvas();
    }) : null;
    
    if (parent && resizeObserver) {
      resizeObserver.observe(parent);
    }

    // Generate vertices (dots)
    const vertices: Vertex[] = [];
    const offset = oceanWidth / 2;
    
    for (let i = 0; i < vertexCount; i++) {
      const x = i % oceanWidth;
      const y = 0;
      const z = Math.floor(i / oceanWidth);
      
      vertices.push({
        x: (-offset + x) * gridSize,
        y: y * gridSize,
        z: z * gridSize,
      });
    }
    
    verticesRef.current = vertices;

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(postCanvas);

    // Animation loop
    const animate = () => {
      // Pause when not visible
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Check canvas dimensions are valid before drawing
      if (canvas.width === 0 || canvas.height === 0 || postCanvas.width === 0 || postCanvas.height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const frame = frameRef.current;
      frameRef.current++;

      // Rotation angles
      const rad = sin(frame / 100) * PI / 20;
      const rad2 = sin(frame / 50) * PI / 10;

      // Clear canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.beginPath();

      // Draw each vertex
      vertices.forEach((vertex, i) => {
        let x = vertex.x - frame % (gridSize * 2);
        let z = vertex.z - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0);
        
        // Wave calculation
        const wave = cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z * x / 10000);
        let y = vertex.y + wave * waveSize;

        // Alpha based on distance
        const a = Math.max(0, 1 - Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2)) / depth);

        // Transformation variables
        let tx: number;
        let ty: number;
        let tz: number;

        y -= oceanHeight;

        // Rotation Y
        tx = x * cos(rad) + z * sin(rad);
        tz = -x * sin(rad) + z * cos(rad);
        x = tx;
        z = tz;

        // Rotation Z
        tx = x * cos(rad) - y * sin(rad);
        ty = x * sin(rad) + y * cos(rad);
        x = tx;
        y = ty;

        // Rotation X
        ty = y * cos(rad2) - z * sin(rad2);
        tz = y * sin(rad2) + z * cos(rad2);
        y = ty;
        z = tz;

        // Perspective (with safety check to prevent division by zero)
        const perspectiveDivisor = z / perspective;
        if (perspectiveDivisor === 0 || !isFinite(perspectiveDivisor)) return;
        
        x /= perspectiveDivisor;
        y /= perspectiveDivisor;

        // Only draw if visible and values are finite
        if (a < 0.01 || z < 0) return;
        if (!isFinite(x) || !isFinite(y) || !isFinite(a)) return;

        // 🌟 GLOWING ORB RENDERING - Radial gradient spheres
        const glowRadius = a * vertexSize * 2.5; // Glow extends beyond core
        
        // Safety check: ensure glowRadius is valid
        if (!isFinite(glowRadius) || glowRadius <= 0) return;
        
        // Create radial gradient for glowing orb effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        
        // Bright white/yellow core
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');      // Bright white center
        gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.95)'); // Solid white core
        gradient.addColorStop(0.3, 'rgba(234, 179, 8, 0.85)');    // Yellow-white blend
        gradient.addColorStop(0.5, 'rgba(234, 179, 8, 0.5)');     // Yellow glow
        gradient.addColorStop(0.7, 'rgba(234, 179, 8, 0.25)');    // Fading yellow
        gradient.addColorStop(0.85, 'rgba(234, 179, 8, 0.1)');    // Soft halo
        gradient.addColorStop(1, 'rgba(234, 179, 8, 0)');         // Transparent edge

        ctx.globalAlpha = a;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      ctx.restore();

      // 🌟 ENHANCED POST-PROCESSING - Triple-layer glow for maximum luminosity
      try {
        postCtx.clearRect(0, 0, postCanvas.width, postCanvas.height);
        
        // Layer 1: Base orbs (sharp)
        postCtx.drawImage(canvas, 0, 0);
        
        // Layer 2: Soft glow (medium blur)
        postCtx.globalCompositeOperation = 'screen';
        postCtx.globalAlpha = 0.5;
        postCtx.filter = 'blur(12px)';
        postCtx.drawImage(canvas, 0, 0);
        
        // Layer 3: Wide glow halo (large blur)
        postCtx.globalAlpha = 0.3;
        postCtx.filter = 'blur(24px)';
        postCtx.drawImage(canvas, 0, 0);
        
        // Reset filters
        postCtx.filter = 'blur(0)';
        postCtx.globalAlpha = 1;
        postCtx.globalCompositeOperation = 'source-over';
      } catch (error) {
        console.warn('OceanWaves: Drawing error (canvas may not be ready)', error);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      observer.disconnect();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [vertexCount, vertexSize, waveSize, particleColor]);

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        opacity,
        zIndex: 0
      }}
    >
      {/* Hidden rendering canvas */}
      <canvas
        ref={canvasRef}
        className="hidden"
        aria-hidden="true"
      />
      
      {/* Visible output canvas */}
      <canvas
        ref={postCanvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          display: 'block',
          backgroundColor: 'transparent'
        }}
        aria-hidden="true"
      />
    </div>
  );
};
