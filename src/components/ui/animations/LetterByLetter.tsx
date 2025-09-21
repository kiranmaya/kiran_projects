'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface LetterByLetterProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  once?: boolean;
}

export default function LetterByLetter({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
  direction = 'up',
  once = true
}: LetterByLetterProps) {
  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { y: 20, opacity: 0 };
      case 'down':
        return { y: -20, opacity: 0 };
      case 'left':
        return { x: 20, opacity: 0 };
      case 'right':
        return { x: -20, opacity: 0 };
      case 'scale':
        return { scale: 0, opacity: 0 };
      default:
        return { y: 20, opacity: 0 };
    }
  };

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
    hidden: getInitialState(),
    visible: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration,
        ease: "easeOut"
      }
    }
  };

  const text = typeof children === 'string' ? children : '';

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
          style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}