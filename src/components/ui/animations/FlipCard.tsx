'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface FlipCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  once?: boolean;
}

export default function FlipCard({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  once = true
}: FlipCardProps) {
  const getInitialRotation = () => {
    switch (direction) {
      case 'left':
        return { rotateY: -90, opacity: 0 };
      case 'right':
        return { rotateY: 90, opacity: 0 };
      case 'up':
        return { rotateX: -90, opacity: 0 };
      case 'down':
        return { rotateX: 90, opacity: 0 };
      default:
        return { rotateY: -90, opacity: 0 };
    }
  };

  const variants: Variants = {
    hidden: getInitialRotation(),
    visible: {
      rotateX: 0,
      rotateY: 0,
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
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </motion.div>
  );
}