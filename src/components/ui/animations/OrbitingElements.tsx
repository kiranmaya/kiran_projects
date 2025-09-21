'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface OrbitingElementsProps {
  children: ReactNode;
  className?: string;
  orbitCount?: number;
  orbitRadius?: number;
  orbitDuration?: number;
  elementSize?: number;
  elementColor?: string;
  autoStart?: boolean;
  reverse?: boolean;
}

export default function OrbitingElements({
  children,
  className = '',
  orbitCount = 3,
  orbitRadius = 60,
  orbitDuration = 4,
  elementSize = 8,
  elementColor = '#3b82f6',
  autoStart = true,
  reverse = false
}: OrbitingElementsProps) {
  const orbitVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const elementVariants: Variants = {
    orbit: (i: number) => ({
      rotate: reverse ? -360 : 360,
      transition: {
        duration: orbitDuration,
        ease: "linear",
        repeat: Infinity,
        delay: i * (orbitDuration / orbitCount)
      }
    })
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">
        {children}
      </div>

      {autoStart && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {Array.from({ length: orbitCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: orbitRadius * 2,
                height: orbitRadius * 2,
                left: '50%',
                top: '50%',
                marginLeft: -orbitRadius,
                marginTop: -orbitRadius
              }}
              variants={orbitVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: elementSize,
                  height: elementSize,
                  backgroundColor: elementColor,
                  left: orbitRadius - elementSize / 2,
                  top: -elementSize / 2,
                  boxShadow: `0 0 ${elementSize}px ${elementColor}40`
                }}
                variants={elementVariants}
                custom={i}
                animate="orbit"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}