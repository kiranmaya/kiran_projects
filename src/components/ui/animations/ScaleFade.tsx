'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface ScaleFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
  once?: boolean;
}

export default function ScaleFade({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  scale = 0.8,
  direction = 'center',
  once = true
}: ScaleFadeProps) {
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { scale, y: 50, opacity: 0 };
      case 'down':
        return { scale, y: -50, opacity: 0 };
      case 'left':
        return { scale, x: 50, opacity: 0 };
      case 'right':
        return { scale, x: -50, opacity: 0 };
      default:
        return { scale, opacity: 0 };
    }
  };

  const variants: Variants = {
    hidden: getInitialTransform(),
    visible: {
      scale: 1,
      x: 0,
      y: 0,
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