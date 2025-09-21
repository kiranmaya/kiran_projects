'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface MatrixRainProps {
  children: ReactNode;
  className?: string;
  density?: number;
  speed?: number;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  characters?: string;
  autoStart?: boolean;
  duration?: number;
}

export default function MatrixRain({
  children,
  className = '',
  density = 50,
  fontSize = 14,
  color = '#00ff00',
  backgroundColor = 'rgba(0, 0, 0, 0.1)',
  characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  autoStart = true,
  duration = 3
}: MatrixRainProps) {
  const isActive = autoStart;

  const rainVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -50
    },
    visible: {
      opacity: [0, 1, 1, 0],
      y: [0, 0, 100, 150],
      transition: {
        duration,
        ease: "linear",
        times: [0, 0.1, 0.9, 1]
      }
    }
  };

  const getRandomCharacter = () => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const getRandomDelay = () => {
    return Math.random() * 2;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative z-10">
        {children}
      </div>

      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor,
            fontFamily: 'monospace'
          }}
        >
          {Array.from({ length: density }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${(i / density) * 100}%`,
                fontSize: `${fontSize}px`,
                color
              }}
              variants={rainVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: getRandomDelay(),
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 1
              }}
            >
              {getRandomCharacter()}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}