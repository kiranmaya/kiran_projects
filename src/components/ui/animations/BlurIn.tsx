'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface BlurInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blurAmount?: number;
  stagger?: number;
  once?: boolean;
}

export default function BlurIn({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  blurAmount = 4,
  stagger = 0.1,
  once = true
}: BlurInProps) {
  const text = typeof children === 'string' ? children : '';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blurAmount}px)`,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{
            display: letter === ' ' ? 'inline' : 'inline-block'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}