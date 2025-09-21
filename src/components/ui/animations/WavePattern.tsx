'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface WavePatternProps {
  children: ReactNode;
  className?: string;
  waveCount?: number;
  amplitude?: number;
  frequency?: number;
  duration?: number;
  delay?: number;
  color?: string;
  autoStart?: boolean;
}

export default function WavePattern({
  children,
  className = '',
  waveCount = 5,
  amplitude = 20,
  duration = 2,
  delay = 0,
  color = '#3b82f6',
  autoStart = true
}: WavePatternProps) {
  const waveVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeInOut"
      }
    }
  };

  const createWavePath = (index: number) => {
    const waveAmplitude = amplitude * (1 - index * 0.1);
    return `M 0,50 Q 25,${50 - waveAmplitude} 50,50 T 100,50 Q 125,${50 + waveAmplitude} 150,50 T 200,50`;
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
            {Array.from({ length: waveCount }).map((_, i) => (
              <motion.path
                key={i}
                d={createWavePath(i)}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                variants={waveVariants}
                initial="hidden"
                animate="visible"
                style={{
                  transform: `translateY(${i * 10}px)`,
                  opacity: 1 - (i * 0.15)
                }}
                transition={{
                  delay: delay + (i * 0.1),
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: duration + (i * 0.2),
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}