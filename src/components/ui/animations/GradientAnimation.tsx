'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientAnimationProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  direction?: 'left' | 'right' | 'up' | 'down' | 'diagonal';
  duration?: number;
  animate?: boolean;
}

export default function GradientAnimation({
  children,
  className = '',
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
  direction = 'right',
  duration = 3,
  animate = true
}: GradientAnimationProps) {
  const getGradientDirection = () => {
    switch (direction) {
      case 'left':
        return 'to left';
      case 'up':
        return 'to top';
      case 'down':
        return 'to bottom';
      case 'diagonal':
        return '135deg';
      default:
        return 'to right';
    }
  };

  const gradientStyle = {
    background: `linear-gradient(${getGradientDirection()}, ${colors.join(', ')})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: animate ? '200% 200%' : '100% 100%',
  };

  const animationStyle = animate ? {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  } : {};

  return (
    <motion.div
      className={className}
      style={gradientStyle}
      animate={animate ? animationStyle : {}}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity
      }}
    >
      {children}
    </motion.div>
  );
}