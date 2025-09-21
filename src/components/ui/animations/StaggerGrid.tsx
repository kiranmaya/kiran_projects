'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerGridProps {
  children: ReactNode[];
  className?: string;
  gridCols?: number;
  staggerDelay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
  distance?: number;
  autoStart?: boolean;
}

export default function StaggerGrid({
  children,
  className = '',
  gridCols = 3,
  staggerDelay = 0.1,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  autoStart = true
}: StaggerGridProps) {
  const getInitialPosition = (index: number) => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'center':
        return {
          scale: 0,
          opacity: 0,
          x: (index % gridCols - (gridCols - 1) / 2) * distance,
          y: Math.floor(index / gridCols) * distance
        };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    return { x: 0, y: 0, scale: 1, opacity: 1 };
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: (index: number) => getInitialPosition(index),
    visible: getFinalPosition()
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    gap: '1rem'
  };

  return (
    <motion.div
      className={className}
      style={gridStyle}
      variants={containerVariants}
      initial="hidden"
      animate={autoStart ? "visible" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          custom={index}
          transition={{
            duration,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}