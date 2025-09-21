'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface RotateScaleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  rotation?: number;
  scale?: number;
  direction?: 'clockwise' | 'counterclockwise';
  once?: boolean;
}

export default function RotateScale({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  rotation = 180,
  scale = 0.5,
  direction = 'clockwise',
  once = true
}: RotateScaleProps) {
  const variants: Variants = {
    hidden: {
      scale,
      rotate: direction === 'clockwise' ? -rotation : rotation,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut"
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