'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface MagneticHoverProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  range?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
}

export default function MagneticHover({
  children,
  className = '',
  strength = 0.3,
  range = 100,
  springConfig = { stiffness: 300, damping: 30 }
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    mouseX.set(Math.max(-range, Math.min(range, deltaX)));
    mouseY.set(Math.max(-range, Math.min(range, deltaY)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`cursor-pointer ${className}`}
      style={{
        x: springX,
        y: springY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  );
}