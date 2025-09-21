'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface WaveTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  waveHeight?: number;
  stagger?: number;
  once?: boolean;
  repeat?: boolean;
}

export default function WaveText({
  children,
  className = '',
  delay = 0,
  duration = 2,
  waveHeight = 10,
  stagger = 0.1,
  once = true,
  repeat = true
}: WaveTextProps) {
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
      y: 0,
      opacity: 0
    },
    visible: {
      y: [0, -waveHeight, waveHeight, 0],
      opacity: 1,
      transition: {
        duration,
        ease: "easeInOut",
        repeat: repeat ? Infinity : 0,
        repeatType: "reverse" as const
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
            display: letter === ' ' ? 'inline' : 'inline-block',
            animationDelay: `${index * stagger}s`
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}