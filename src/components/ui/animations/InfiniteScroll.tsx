'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface InfiniteScrollProps {
  children: ReactNode[];
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
  pauseOnHover?: boolean;
  autoStart?: boolean;
  gap?: number;
}

export default function InfiniteScroll({
  children,
  className = '',
  direction = 'left',
  speed = 50,
  pauseOnHover = true,
  autoStart = true,
  gap = 20
}: InfiniteScrollProps) {
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedChildren = [...children, ...children, ...children];

  const getAnimationProps = () => {
    switch (direction) {
      case 'left':
        return {
          x: ['0%', '-33.33%', '-66.66%'],
          transition: {
            duration: speed,
            ease: "linear" as const,
            repeat: Infinity
          }
        };
      case 'right':
        return {
          x: ['-33.33%', '-66.66%', '0%'],
          transition: {
            duration: speed,
            ease: "linear" as const,
            repeat: Infinity
          }
        };
      case 'up':
        return {
          y: ['0%', '-33.33%', '-66.66%'],
          transition: {
            duration: speed,
            ease: "linear" as const,
            repeat: Infinity
          }
        };
      case 'down':
        return {
          y: ['-33.33%', '-66.66%', '0%'],
          transition: {
            duration: speed,
            ease: "linear" as const,
            repeat: Infinity
          }
        };
      default:
        return {
          x: ['0%', '-33.33%', '-66.66%'],
          transition: {
            duration: speed,
            ease: "linear" as const,
            repeat: Infinity
          }
        };
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const scrollVariants: Variants = {
    scroll: getAnimationProps()
  };

  const getContainerClass = () => {
    const baseClasses = 'flex h-full';
    const gapClass = `gap-[${gap}px]`;
    const sizeClasses = direction === 'up' || direction === 'down'
      ? 'w-full h-[300%] flex-col'
      : 'w-[300%] h-full flex-row';

    return `${baseClasses} ${gapClass} ${sizeClasses}`;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={autoStart && !isPaused ? "visible" : "hidden"}
        className="absolute inset-0"
      >
        <motion.div
          className={getContainerClass()}
          variants={scrollVariants}
          animate="scroll"
          onHoverStart={() => pauseOnHover && setIsPaused(true)}
          onHoverEnd={() => pauseOnHover && setIsPaused(false)}
        >
          {duplicatedChildren.map((child, index) => (
            <div key={index} className="flex-shrink-0">
              {child}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}