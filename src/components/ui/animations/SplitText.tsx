'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface SplitTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  splitDirection?: 'horizontal' | 'vertical' | 'diagonal';
  splitDistance?: number;
  stagger?: number;
  once?: boolean;
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  splitDirection = 'horizontal',
  splitDistance = 50,
  stagger = 0.1,
  once = true
}: SplitTextProps) {
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

  const getSplitVariants = (): Variants => {
    const baseVariants: Variants = {
      hidden: {
        opacity: 0
      },
      visible: {
        opacity: 1,
        transition: {
          duration,
          ease: "easeOut"
        }
      }
    };

    switch (splitDirection) {
      case 'horizontal':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            x: [-splitDistance, splitDistance]
          },
          visible: {
            ...baseVariants.visible,
            x: 0
          }
        };
      case 'vertical':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            y: [-splitDistance, splitDistance]
          },
          visible: {
            ...baseVariants.visible,
            y: 0
          }
        };
      case 'diagonal':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            x: [-splitDistance, splitDistance],
            y: [-splitDistance, splitDistance]
          },
          visible: {
            ...baseVariants.visible,
            x: 0,
            y: 0
          }
        };
      default:
        return baseVariants;
    }
  };

  const letterVariants = getSplitVariants();

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