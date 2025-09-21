'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowPulseProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  glowColor?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  once?: boolean;
}

export default function GlowPulse({
  children,
  className = '',
  delay = 0,
  duration = 2.5,
  glowColor = '#3b82f6',
  intensity = 'medium',
  once = true
}: GlowPulseProps) {
  const getGlowIntensity = () => {
    switch (intensity) {
      case 'subtle':
        return '0px 0px 20px';
      case 'strong':
        return '0px 0px 40px';
      default:
        return '0px 0px 30px';
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: `drop-shadow(${getGlowIntensity()} ${glowColor}00)`
    },
    visible: {
      opacity: 1,
      filter: [
        `drop-shadow(${getGlowIntensity()} ${glowColor}00)`,
        `drop-shadow(${getGlowIntensity()} ${glowColor}ff)`,
        `drop-shadow(${getGlowIntensity()} ${glowColor}00)`
      ],
      transition: {
        duration,
        delay,
        ease: "easeInOut",
        repeat: once ? 0 : Infinity,
        repeatType: "reverse" as const,
        times: [0, 0.5, 1]
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