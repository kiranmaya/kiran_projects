'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  scrambleSpeed?: number;
  once?: boolean;
  characters?: string;
}

export default function ScrambleText({
  text,
  className = '',
  delay = 0,
  duration = 2,
  scrambleSpeed = 50,
  once = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
}: ScrambleTextProps) {
  const [scrambledText, setScrambledText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setScrambledText(prev =>
          prev.split('').map((char, index) => {
            if (char === text[index] || char === ' ') {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          }).join('')
        );
      }, scrambleSpeed);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setScrambledText(text);
        setIsAnimating(false);
      }, duration * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isAnimating, text, duration, scrambleSpeed, characters]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      }
    }
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
      onAnimationStart={() => setIsAnimating(true)}
    >
      {scrambledText.split('').map((letter, index) => (
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