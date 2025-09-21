'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface Cube3DProps {
  children: ReactNode;
  className?: string;
  size?: number;
  rotationSpeed?: number;
  autoStart?: boolean;
  axis?: 'x' | 'y' | 'z' | 'all';
  perspective?: number;
}

export default function Cube3D({
  children,
  className = '',
  size = 100,
  rotationSpeed = 4,
  autoStart = true,
  axis = 'all',
  perspective = 1000
}: Cube3DProps) {
  const cubeVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const getRotationAnimation = () => {
    switch (axis) {
      case 'x':
        return { rotateX: 360 };
      case 'y':
        return { rotateY: 360 };
      case 'z':
        return { rotateZ: 360 };
      case 'all':
        return {
          rotateX: 360,
          rotateY: 360,
          rotateZ: 120
        };
      default:
        return { rotateY: 360 };
    }
  };

  const rotationVariants: Variants = {
    rotate: {
      ...getRotationAnimation(),
      transition: {
        duration: rotationSpeed,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const cubeStyle = {
    width: size,
    height: size,
    position: 'relative' as const,
    transformStyle: 'preserve-3d' as const,
    perspective: perspective
  };

  const faceStyle = {
    width: size,
    height: size,
    position: 'absolute' as const,
    border: '2px solid #3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">
        {children}
      </div>

      {autoStart && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            style={cubeStyle}
            variants={cubeVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={rotationVariants}
              animate="rotate"
            >
              {/* Front face */}
              <div
                style={{
                  ...faceStyle,
                  transform: `translateZ(${size / 2}px)`
                }}
              />

              {/* Back face */}
              <div
                style={{
                  ...faceStyle,
                  transform: `translateZ(-${size / 2}px) rotateY(180deg)`
                }}
              />

              {/* Right face */}
              <div
                style={{
                  ...faceStyle,
                  transform: `rotateY(90deg) translateZ(${size / 2}px)`
                }}
              />

              {/* Left face */}
              <div
                style={{
                  ...faceStyle,
                  transform: `rotateY(-90deg) translateZ(${size / 2}px)`
                }}
              />

              {/* Top face */}
              <div
                style={{
                  ...faceStyle,
                  transform: `rotateX(90deg) translateZ(${size / 2}px)`
                }}
              />

              {/* Bottom face */}
              <div
                style={{
                  ...faceStyle,
                  transform: `rotateX(-90deg) translateZ(${size / 2}px)`
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}