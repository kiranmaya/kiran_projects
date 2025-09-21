'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonGlowProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
  animate?: boolean;
  glowSize?: number;
}

export default function NeonGlow({
  children,
  className = '',
  color = '#00ffff',
  intensity = 'medium',
  animate = true,
  glowSize = 20
}: NeonGlowProps) {
  const getGlowIntensity = () => {
    switch (intensity) {
      case 'low':
        return {
          textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}`,
          filter: 'brightness(1.2)'
        };
      case 'high':
        return {
          textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}`,
          filter: 'brightness(1.5)'
        };
      default: // medium
        return {
          textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
          filter: 'brightness(1.3)'
        };
    }
  };

  const glowStyle = getGlowIntensity();

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        color: color,
        ...glowStyle
      }}
      animate={animate ? {
        textShadow: [
          glowStyle.textShadow,
          `0 0 ${glowSize}px ${color}, 0 0 ${glowSize * 2}px ${color}, 0 0 ${glowSize * 3}px ${color}`,
          glowStyle.textShadow
        ],
        filter: animate ? [
          glowStyle.filter,
          'brightness(1.8)',
          glowStyle.filter
        ] : glowStyle.filter
      } : {}}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {children}

      {/* Additional glow layers for enhanced effect */}
      {intensity === 'high' && (
        <>
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              color: color,
              textShadow: `0 0 ${glowSize}px ${color}`,
              filter: 'blur(1px)'
            }}
            animate={animate ? {
              opacity: [0.3, 0.6, 0.3]
            } : { opacity: 0.3 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}