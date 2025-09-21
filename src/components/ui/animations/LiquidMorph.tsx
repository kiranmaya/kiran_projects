'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface LiquidMorphProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  borderRadius?: number;
  scale?: number;
  once?: boolean;
}

export default function LiquidMorph({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  borderRadius = 60,
  scale = 0.8,
  once = true
}: LiquidMorphProps) {
  const variants: Variants = {
    hidden: {
      borderRadius: `${borderRadius}%`,
      scale,
      opacity: 0,
      filter: 'blur(10px)'
    },
    visible: {
      borderRadius: '16px',
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: "easeOut",
        borderRadius: {
          duration: duration * 0.8,
          ease: "easeInOut"
        },
        filter: {
          duration: duration * 0.6,
          ease: "easeOut"
        }
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