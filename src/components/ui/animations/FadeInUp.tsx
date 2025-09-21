'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export default function FadeInUp({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  distance = 20,
  once = true
}: FadeInUpProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: distance
    },
    visible: {
      opacity: 1,
      y: 0,
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