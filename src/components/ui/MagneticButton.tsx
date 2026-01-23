import { ReactNode, useRef, useState } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number; // Magnetic pull strength (0-1)
}

/**
 * ⭐ MAGNETIC BUTTON HOVER EFFECT (Enhancement #4) ⭐
 * 
 * Buttons that "pull" toward cursor on hover
 * - Smooth transform based on cursor position
 * - Glow effect intensifies on hover
 * - Scale + shadow animation
 * - Yellow accent enhancement
 */

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Apply magnetic pull (with strength multiplier)
    setPosition({
      x: deltaX * strength,
      y: deltaY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    willChange: 'transform',
  };

  const glowStyles = isHovered
    ? {
        boxShadow: '0 0 30px rgba(234, 179, 8, 0.4), 0 8px 20px rgba(0, 0, 0, 0.6)',
      }
    : {};

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`inline-block ${className}`}
        style={{ ...baseStyles, ...glowStyles }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={className}
      style={{ ...baseStyles, ...glowStyles }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </button>
  );
}
