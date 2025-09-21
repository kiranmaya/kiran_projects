'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface BounceLettersProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  bounceHeight?: number;
  stagger?: number;
  once?: boolean;
  repeat?: boolean;
}

export default function BounceLetters({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  bounceHeight = 30,
  stagger = 0.1,
  once = true,
  repeat = true
}: BounceLettersProps) {
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
      y: bounceHeight
    },
    visible: {
      opacity: 1,
      y: [bounceHeight, 0, -bounceHeight * 0.3, 0],
      transition: {
        duration,
        ease: "easeOut",
        times: [0, 0.6, 0.8, 1],
        repeat: repeat ? Infinity : 0,
        repeatDelay: 2
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