'use client';

import { motion, PanInfo, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ElasticDragProps {
  children: ReactNode;
  className?: string;
  dragConstraints?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  disabled?: boolean;
}

export default function ElasticDrag({
  children,
  className = '',
  dragConstraints = { left: -50, right: 50, top: -50, bottom: 50 },
  springConfig = { stiffness: 400, damping: 25 },
  onDragEnd,
  disabled = false
}: ElasticDragProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-50, 50], [15, -15]);
  const rotateY = useTransform(springX, [-50, 50], [-15, 15]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    x.set(0);
    y.set(0);

    if (onDragEnd) {
      onDragEnd(event, info);
    }
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        perspective: 1000
      }}
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 10
      }}
    >
      {children}
    </motion.div>
  );
}