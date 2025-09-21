'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface SkewTransformProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  skewX?: number;
  skewY?: number;
  direction?: 'horizontal' | 'vertical' | 'both';
  once?: boolean;
}

export default function SkewTransform({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  skewX = 20,
  skewY = 0,
  direction = 'horizontal',
  once = true
}: SkewTransformProps) {
  const getInitialSkew = () => {
    switch (direction) {
      case 'horizontal':
        return { skewX, skewY: 0, opacity: 0 };
      case 'vertical':
        return { skewX: 0, skewY, opacity: 0 };
      case 'both':
        return { skewX, skewY, opacity: 0 };
      default:
        return { skewX, skewY: 0, opacity: 0 };
    }
  };

  const variants: Variants = {
    hidden: getInitialSkew(),
    visible: {
      skewX: 0,
      skewY: 0,
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