'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface LightningEffectProps {
  children: ReactNode;
  className?: string;
  boltCount?: number;
  duration?: number;
  delay?: number;
  color?: string;
  thickness?: number;
  autoStart?: boolean;
  intensity?: number;
}

export default function LightningEffect({
  children,
  className = '',
  boltCount = 3,
  duration = 0.8,
  delay = 0,
  color = '#ffffff',
  thickness = 3,
  autoStart = true,
  intensity = 1
}: LightningEffectProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => setIsActive(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [autoStart, delay]);

  const generateLightningPath = () => {
    const segments = 8;
    const points = [];

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 200;
      const y = 50 + (Math.random() - 0.5) * 80 * intensity;
      points.push(`${x},${y}`);
    }

    return `M ${points.join(' L ')}`;
  };

  const lightningVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    strike: {
      pathLength: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: {
        duration,
        ease: "easeOut",
        times: [0, 0.1, 1]
      }
    }
  };

  const glowVariants: Variants = {
    hidden: {
      opacity: 0
    },
    glow: {
      opacity: [0, 0.8, 0],
      scale: [1, 1.5, 1],
      transition: {
        duration: duration * 0.6,
        ease: "easeOut",
        times: [0, 0.2, 1]
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">
        {children}
      </div>

      {isActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
          >
            {Array.from({ length: boltCount }).map((_, i) => (
              <g key={i}>
                {/* Main lightning bolt */}
                <motion.path
                  d={generateLightningPath()}
                  fill="none"
                  stroke={color}
                  strokeWidth={thickness}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="drop-shadow(0 0 10px currentColor)"
                  variants={lightningVariants}
                  initial="hidden"
                  animate="strike"
                  transition={{
                    delay: i * 0.1
                  }}
                />

                {/* Glow effect */}
                <motion.path
                  d={generateLightningPath()}
                  fill="none"
                  stroke={color}
                  strokeWidth={thickness * 3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.6}
                  filter="blur(4px)"
                  variants={glowVariants}
                  initial="hidden"
                  animate="glow"
                  transition={{
                    delay: i * 0.1
                  }}
                />
              </g>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}