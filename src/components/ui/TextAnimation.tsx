'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TextAnimationProps {
  text: string;
  type?: 'split' | 'typewriter' | 'fadeIn' | 'slideUp' | 'scaleIn';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function TextAnimation({
  text,
  type = 'split',
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.1
}: TextAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (type === 'typewriter') {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, text, type]);

  if (type === 'typewriter') {
    return (
      <span className={className}>
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-current ml-1"
        />
      </span>
    );
  }

  if (type === 'split') {
    const words = text.split(' ');
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const wordVariants: Variants = {
      hidden: {
        opacity: 0,
        y: 20,
        rotateX: -90
      },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: duration,
          ease: "easeOut"
        },
      },
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={className}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (type === 'fadeIn') {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration, delay }}
        viewport={{ once: true }}
        className={className}
      >
        {text}
      </motion.span>
    );
  }

  if (type === 'slideUp') {
    return (
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration, delay }}
        viewport={{ once: true }}
        className={className}
      >
        {text}
      </motion.span>
    );
  }

  if (type === 'scaleIn') {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration, delay }}
        viewport={{ once: true }}
        className={className}
      >
        {text}
      </motion.span>
    );
  }

  return <span className={className}>{text}</span>;
}

// Character splitting component for more granular control
interface CharacterSplitProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function CharacterSplit({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  direction = 'up'
}: CharacterSplitProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 20, opacity: 0 };
      case 'down': return { y: -20, opacity: 0 };
      case 'left': return { x: 20, opacity: 0 };
      case 'right': return { x: -20, opacity: 0 };
      default: return { y: 20, opacity: 0 };
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: getInitialPosition(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}