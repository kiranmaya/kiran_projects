'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface ShimmerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  shimmerWidth?: number;
  once?: boolean;
}

export default function Shimmer({
  children,
  className = '',
  delay = 0,
  duration = 2,
  shimmerWidth = 100,
  once = true
}: ShimmerProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay
      }
    }
  };

  const shimmerVariants: Variants = {
    hidden: {
      x: '-100%'
    },
    visible: {
      x: '100%',
      transition: {
        duration,
        delay: delay + 0.2,
        ease: "easeInOut",
        repeat: once ? 0 : Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <motion.div
        variants={shimmerVariants}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          width: `${shimmerWidth}%`
        }}
      />
    </motion.div>
  );
}