'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface PathAnimationProps {
  children: ReactNode;
  className?: string;
  path?: string;
  duration?: number;
  delay?: number;
  repeat?: number;
  autoStart?: boolean;
  reverse?: boolean;
  elementSize?: number;
  elementColor?: string;
}

export default function PathAnimation({
  children,
  className = '',
  path = "M 0,50 Q 50,0 100,50 T 200,50",
  duration = 3,
  delay = 0,
  repeat = Infinity,
  autoStart = true,
  reverse = false,
  elementSize = 12,
  elementColor = '#3b82f6'
}: PathAnimationProps) {
  const pathVariants: Variants = {
    hidden: {
      offsetDistance: reverse ? '100%' : '0%',
      opacity: 0
    },
    visible: {
      offsetDistance: reverse ? '0%' : '100%',
      opacity: [0, 1, 1, 0],
      transition: {
        duration,
        delay,
        ease: "linear",
        repeat,
        repeatType: "loop",
        times: [0, 0.1, 0.9, 1]
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">
        {children}
      </div>

      {autoStart && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="motion-path"
                d={path}
                fill="none"
                stroke="none"
              />
            </defs>

            <motion.circle
              r={elementSize / 2}
              fill={elementColor}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              style={{
                offsetPath: 'url(#motion-path)',
                offsetRotate: 'auto'
              }}
            />

            {/* Optional glow effect */}
            <motion.circle
              r={(elementSize / 2) + 4}
              fill={elementColor}
              opacity={0.3}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              style={{
                offsetPath: 'url(#motion-path)',
                offsetRotate: 'auto',
                filter: 'blur(2px)'
              }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}