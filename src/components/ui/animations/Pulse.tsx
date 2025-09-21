'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface PulseProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: number;
  intensity?: 'subtle' | 'medium' | 'strong';
  once?: boolean;
}

export default function Pulse({
  children,
  className = '',
  delay = 0,
  duration = 2,
  intensity = 'medium',
  once = true
}: PulseProps) {
  const getScaleIntensity = () => {
    switch (intensity) {
      case 'subtle':
        return 1.05;
      case 'strong':
        return 1.2;
      default:
        return 1.1;
    }
  };

  const variants: Variants = {
    hidden: {
      scale: 1,
      opacity: 0
    },
    visible: {
      scale: [1, getScaleIntensity(), 1],
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeInOut",
        repeat: once ? 0 : Infinity,
        repeatType: "reverse" as const
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