'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface MorphingBlobProps {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
  duration?: number;
  intensity?: number;
  autoStart?: boolean;
}

export default function MorphingBlob({
  children,
  className = '',
  size = 200,
  color = '#3b82f6',
  duration = 4,
  intensity = 1,
  autoStart = true
}: MorphingBlobProps) {
  const blobVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 0.7,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const morphVariants: Variants = {
    morph: {
      borderRadius: [
        '60% 40% 30% 70% / 60% 30% 70% 40%',
        '30% 60% 70% 40% / 50% 60% 30% 60%',
        '50% 60% 30% 60% / 30% 60% 70% 40%',
        '60% 40% 30% 70% / 60% 30% 70% 40%'
      ],
      scale: [1, 1.1 * intensity, 0.9 * intensity, 1],
      transition: {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">
        {children}
      </div>

      {autoStart && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            className="absolute"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              filter: 'blur(40px)',
              mixBlendMode: 'multiply'
            }}
            variants={blobVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="w-full h-full"
              style={{
                backgroundColor: color,
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
              }}
              variants={morphVariants}
              animate="morph"
            />
          </motion.div>

          {/* Additional smaller blob for more complex effect */}
          <motion.div
            className="absolute"
            style={{
              width: size * 0.6,
              height: size * 0.6,
              backgroundColor: color,
              filter: 'blur(30px)',
              mixBlendMode: 'multiply'
            }}
            variants={blobVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="w-full h-full"
              style={{
                backgroundColor: color,
                borderRadius: '40% 60% 70% 30% / 50% 40% 60% 50%'
              }}
              variants={morphVariants}
              animate="morph"
              transition={{
                duration: duration * 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: duration * 0.5
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}