import { useEffect, useRef } from 'react';

/**
 * EarthGlobe Component - 3D Particle Earth with Orbital Rings
 * 
 * Features:
 * - Particle-based globe (800+ particles)
 * - 3D rotation animation
 * - Orbital rings with satellites
 * - Floating ambient particles
 * - White/silver color scheme ⭐ UPDATED
 * - GPU-accelerated canvas rendering
 * - Responsive sizing
 * - Performance optimized: Particle culling, dynamic count, throttling ⭐ NEW
 */

interface EarthGlobeProps {
  size?: number; // Globe diameter in pixels (default: 400)
  particleCount?: number; // Number of particles (default: 800)
  rotationSpeed?: number; // Rotation speed (default: 0.001)
  glowIntensity?: number; // Glow effect intensity (default: 0.3)
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  alpha: number;
}

interface Satellite {
  angle: number;
  speed: number;
  radius: number;
  orbitTilt: number;
}

// 🚀 PERFORMANCE: Dynamic particle count based on device
function getOptimalParticleCount(requestedCount: number, screenWidth: number): number {
  if (screenWidth < 768) return Math.floor(requestedCount * 0.4); // Mobile: 40% (320 particles)
  if (screenWidth < 1024) return Math.floor(requestedCount * 0.6); // Tablet: 60% (480 particles)
  return requestedCount; // Desktop: 100% (800 particles)
}

export const EarthGlobe = ({
  size = 400,
  particleCount = 800,
  rotationSpeed = 0.001,
  glowIntensity = 0.3,
  className = '',
}: EarthGlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const satellitesRef = useRef<Satellite[]>([]);
  const rotationRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true); // 🚀 PERFORMANCE: Track visibility

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size (2x for retina)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35; // Globe radius (70% of canvas)

    // 🚀 PERFORMANCE: Dynamic particle count based on device
    const optimalCount = getOptimalParticleCount(particleCount, window.innerWidth);

    // Initialize particles on a sphere (Fibonacci sphere algorithm)
    const particles: Particle[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = Math.PI * 2 * goldenRatio;

    for (let i = 0; i < optimalCount; i++) {
      const t = i / optimalCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      const x = radius * Math.sin(inclination) * Math.cos(azimuth);
      const y = radius * Math.sin(inclination) * Math.sin(azimuth);
      const z = radius * Math.cos(inclination);

      particles.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
        alpha: Math.random() * 0.5 + 0.5, // Random brightness
      });
    }
    particlesRef.current = particles;

    // Initialize orbital satellites (3 satellites on 3 orbital rings)
    const satellites: Satellite[] = [
      { angle: 0, speed: 0.01, radius: radius * 1.3, orbitTilt: 0 },
      { angle: Math.PI, speed: 0.008, radius: radius * 1.4, orbitTilt: Math.PI / 6 },
      { angle: Math.PI / 2, speed: 0.012, radius: radius * 1.5, orbitTilt: -Math.PI / 6 },
    ];
    satellitesRef.current = satellites;

    // 🚀 PERFORMANCE: Intersection Observer to pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Animation loop with performance optimizations
    let lastTime = 0;
    let lastFrameTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      // 🚀 PERFORMANCE: Pause when not visible
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // 🚀 PERFORMANCE: Frame rate throttling
      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime - (elapsed % frameInterval);

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Clear canvas with transparency
      ctx.clearRect(0, 0, size, size);

      // Update rotation
      rotationRef.current.y += rotationSpeed * deltaTime;

      // 🚀 PERFORMANCE: Pre-calculate rotation matrix (not per-particle)
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      // Rotate particles (reuse matrix)
      particles.forEach((particle) => {
        // Rotate around Y axis
        const x = particle.originalX * cosY - particle.originalZ * sinY;
        const z = particle.originalX * sinY + particle.originalZ * cosY;

        particle.x = x;
        particle.z = z;
      });

      // 🚀 PERFORMANCE: Sort in-place (no new array allocation)
      particles.sort((a, b) => a.z - b.z);

      // Draw orbital rings (3 elliptical rings)
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.20 * glowIntensity})`; // White with transparency ⭐ UPDATED
      ctx.lineWidth = 1;

      // Ring 1 (horizontal)
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const rx = radius * 1.3 * Math.cos(angle);
        const ry = radius * 0.3 * Math.sin(angle);
        const x = centerX + rx;
        const y = centerY + ry;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Ring 2 (tilted)
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const rx = radius * 1.4 * Math.cos(angle);
        const ry = radius * 0.35 * Math.sin(angle);
        const tilt = Math.PI / 6;
        const x = centerX + rx * Math.cos(tilt);
        const y = centerY + ry + rx * Math.sin(tilt) * 0.3;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Ring 3 (opposite tilt)
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const rx = radius * 1.5 * Math.cos(angle);
        const ry = radius * 0.4 * Math.sin(angle);
        const tilt = -Math.PI / 6;
        const x = centerX + rx * Math.cos(tilt);
        const y = centerY + ry + rx * Math.sin(tilt) * 0.3;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // 🚀 PERFORMANCE: Particle culling - only draw visible particles (z > -radius * 0.1)
      const visibleParticles = particles.filter(p => p.z > -radius * 0.1);

      // Draw particles (with depth-based size and opacity)
      visibleParticles.forEach((particle) => {
        // Calculate screen position
        const scale = 1 + particle.z / (radius * 2); // Perspective scale
        const x = centerX + particle.x;
        const y = centerY + particle.y;

        // Size based on depth (closer = larger)
        const baseSize = 1.5;
        const particleSize = baseSize * scale;

        // Opacity based on depth and hemisphere (front brighter)
        const depthFactor = (particle.z + radius) / (radius * 2); // 0 to 1
        const opacity = particle.alpha * depthFactor * 0.8;

        // White color with subtle gradient based on Y position ⭐ UPDATED
        const colorMix = (particle.y / radius + 1) / 2; // 0 to 1
        const brightness = Math.floor(255 * (0.8 + colorMix * 0.2)); // 204 to 255 (80% to 100% white)
        const r = brightness;
        const g = brightness;
        const b = brightness;

        // Draw particle with glow
        if (particle.z > 0) {
          // Front hemisphere - brighter with glow
          ctx.shadowBlur = 8 * glowIntensity;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        } else {
          // Back hemisphere - dimmer, no glow
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw satellites on orbital rings
      ctx.shadowBlur = 12 * glowIntensity;
      satellites.forEach((satellite, index) => {
        // Update satellite position
        satellite.angle += satellite.speed;

        // Calculate 3D orbital position
        const orbitalX = satellite.radius * Math.cos(satellite.angle);
        const orbitalY = satellite.radius * 0.3 * Math.sin(satellite.angle);
        const orbitalZ = satellite.radius * Math.sin(satellite.angle) * Math.sin(satellite.orbitTilt);

        // Apply tilt transformation
        const tiltedX = orbitalX * Math.cos(satellite.orbitTilt);
        const tiltedY = orbitalY + orbitalX * Math.sin(satellite.orbitTilt) * 0.3;

        const x = centerX + tiltedX;
        const y = centerY + tiltedY;

        // White color for satellites ⭐ UPDATED
        const colors = [
          'rgba(255, 255, 255, 1)', // White
          'rgba(240, 240, 240, 1)', // Bright silver
          'rgba(220, 220, 220, 1)', // Silver
        ];

        ctx.shadowColor = colors[index];
        ctx.fillStyle = colors[index];

        // Draw satellite (larger dot with trail)
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw satellite trail
        ctx.shadowBlur = 4;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Reset shadow
      ctx.shadowBlur = 0;

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, particleCount, rotationSpeed, glowIntensity]);

  return (
    <div className={`relative ${className}`}>
      {/* Ambient glow background ⭐ UPDATED to white */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 70%)',
        }}
      />

      {/* Canvas ⭐ UPDATED to white glow */}
      <canvas
        ref={canvasRef}
        className="relative z-10"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.25))',
        }}
      />

      {/* Corner accent lights (decorative) ⭐ UPDATED to white */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </div>
  );
};

export default EarthGlobe;
