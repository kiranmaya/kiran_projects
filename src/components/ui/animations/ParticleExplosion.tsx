'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface ParticleExplosionProps {
  children: ReactNode;
  className?: string;
  particleCount?: number;
  particleSize?: number;
  explosionRadius?: number;
  duration?: number;
  delay?: number;
  trigger?: boolean;
  colors?: string[];
}

export default function ParticleExplosion({
  children,
  className = '',
  particleCount = 12,
  particleSize = 4,
  explosionRadius = 100,
  duration = 0.8,
  delay = 0,
  trigger = true,
  colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']
}: ParticleExplosionProps) {
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => setIsExploded(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  const particleVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0
    },
    explode: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.cos((i / particleCount) * 2 * Math.PI) * explosionRadius,
      y: Math.sin((i / particleCount) * 2 * Math.PI) * explosionRadius,
      transition: {
        duration,
        ease: "easeOut",
        times: [0, 0.3, 1]
      }
    })
  };

  const containerVariants: Variants = {
    initial: {
      scale: 1
    },
    exploded: {
      scale: 1.1,
      transition: {
        duration: duration * 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate={isExploded ? "exploded" : "initial"}
      >
        {children}
      </motion.div>

      {isExploded && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: particleSize,
                height: particleSize,
                backgroundColor: colors[i % colors.length],
                left: '50%',
                top: '50%',
                marginLeft: -particleSize / 2,
                marginTop: -particleSize / 2
              }}
              variants={particleVariants}
              custom={i}
              initial="hidden"
              animate="explode"
            />
          ))}
        </div>
      )}
    </div>
  );
}