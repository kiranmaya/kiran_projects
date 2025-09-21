'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color1?: string;
  color2?: string;
  duration?: number;
  trigger?: boolean;
}

export default function Glitch({
  text,
  className = '',
  intensity = 'medium',
  color1: _color1 = '#ff0000',
  color2: _color2 = '#00ffff',
  duration = 0.3,
  trigger = true
}: GlitchProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  const getIntensityValues = () => {
    switch (intensity) {
      case 'low':
        return { x: [0, 1, -1, 0], y: [0, 0.5, -0.5, 0] };
      case 'high':
        return { x: [0, 3, -3, 2, -2, 0], y: [0, 1, -1, 0.5, -0.5, 0] };
      default: // medium
        return { x: [0, 2, -2, 1, -1, 0], y: [0, 0.8, -0.8, 0] };
    }
  };

  const glitchValues = getIntensityValues();

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          {/* Red glitch layer */}
          <motion.span
            className="absolute top-0 left-0 text-red-500 mix-blend-screen"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
            animate={{
              x: glitchValues.x,
              y: glitchValues.y,
              opacity: [0, 0.8, 0.4, 0]
            }}
            transition={{
              duration: duration,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1]
            }}
          >
            {text}
          </motion.span>

          {/* Cyan glitch layer */}
          <motion.span
            className="absolute top-0 left-0 text-cyan-400 mix-blend-screen"
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
            animate={{
              x: glitchValues.x.map(v => -v),
              y: glitchValues.y.map(v => -v),
              opacity: [0, 0.6, 0.8, 0]
            }}
            transition={{
              duration: duration,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1]
            }}
          >
            {text}
          </motion.span>

          {/* Additional distortion layer */}
          <motion.span
            className="absolute top-0 left-0 opacity-60"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              filter: 'hue-rotate(180deg)'
            }}
            animate={{
              x: [0, 1, -1, 0],
              skewX: [0, 5, -5, 0]
            }}
            transition={{
              duration: duration,
              ease: "easeInOut"
            }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  );
}