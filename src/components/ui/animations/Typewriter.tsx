'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
  cursorClassName?: string;
  startDelay?: number;
  loop?: boolean;
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  className = '',
  delay = 100,
  speed: _speed = 100,
  showCursor = true,
  cursorClassName = '',
  startDelay = 0,
  loop = false,
  onComplete
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        startTyping();
      }, startDelay);
      return () => clearTimeout(startTimer);
    } else {
      startTyping();
    }
  }, [startDelay]);

  const startTyping = () => {
    setDisplayText('');
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      if (onComplete) {
        onComplete();
      }
      if (loop) {
        const loopTimeout = setTimeout(() => {
          startTyping();
        }, 2000);
        return () => clearTimeout(loopTimeout);
      }
    }
  }, [currentIndex, text, delay, loop, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`inline-block w-0.5 h-5 bg-current ml-1 ${cursorClassName}`}
        />
      )}
    </span>
  );
}