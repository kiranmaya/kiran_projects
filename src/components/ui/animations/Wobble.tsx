'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface WobbleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  intensity?: 'subtle' | 'medium' | 'strong';
  once?: boolean;
}

export default function Wobble({
  children,
  className = '',
  delay = 0,
  duration = 1,
  intensity = 'medium',
  once = true
}: WobbleProps) {
  const getWobbleIntensity = () => {
    switch (intensity) {
      case 'subtle':
        return 2;
      case 'strong':
        return 8;
      default:
        return 4;
    }
  };

  const variants: Variants = {
    hidden: {
      rotate: 0,
      opacity: 0
    },
    visible: {
      rotate: [0, -getWobbleIntensity(), getWobbleIntensity(), -getWobbleIntensity(), 0],
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {children}
    </motion.div>
  );
}