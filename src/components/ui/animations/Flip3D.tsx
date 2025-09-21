'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface Flip3DProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  once?: boolean;
}

export default function Flip3D({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.1,
  direction = 'up',
  once = true
}: Flip3DProps) {
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

  const getLetterVariants = (): Variants => {
    const baseVariants: Variants = {
      hidden: {
        opacity: 0,
        rotateX: -90,
        rotateY: 0,
        rotateZ: 0
      },
      visible: {
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        transition: {
          duration,
          ease: "easeOut"
        }
      }
    };

    switch (direction) {
      case 'left':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            rotateY: -90
          }
        };
      case 'right':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            rotateY: 90
          }
        };
      case 'down':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            rotateX: 90
          }
        };
      default: // up
        return baseVariants;
    }
  };

  const letterVariants = getLetterVariants();

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
            transformStyle: 'preserve-3d'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}