'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  once?: boolean;
}

export default function SlideIn({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  distance = 100,
  direction = 'left',
  once = true
}: SlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      default:
        return { x: distance, opacity: 0 };
    }
  };

  const variants: Variants = {
    hidden: getInitialPosition(),
    visible: {
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