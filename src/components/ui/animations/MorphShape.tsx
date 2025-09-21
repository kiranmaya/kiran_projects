'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface MorphShapeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  borderRadius?: number;
  scale?: number;
  once?: boolean;
}

export default function MorphShape({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  borderRadius = 50,
  scale = 0.3,
  once = true
}: MorphShapeProps) {
  const variants: Variants = {
    hidden: {
      borderRadius: `${borderRadius}%`,
      scale,
      opacity: 0
    },
    visible: {
      borderRadius: '8px',
      scale: 1,
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
        overflow: 'hidden'
      }}
    >
      {children}
    </motion.div>
  );
}