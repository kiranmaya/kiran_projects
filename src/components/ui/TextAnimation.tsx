'use client';
 
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

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
      // Use a span so "split" can be safely used inline (e.g., inside <p>) without producing invalid HTML.
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={className}
        style={{ display: 'inline-block' }}
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
      </motion.span>
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
// Improvements:
// - Respect prefers-reduced-motion using useReducedMotion
// - Use useInView with an explicit ref for more reliable in-view detection on mobile
// - Ensure each character wrapper uses inline-block styles and performance hints to work well on mobile
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
  // respect user's reduced motion preference
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  if (shouldReduceMotion) {
    // Return plain text if user prefers reduced motion
    return <span className={className}>{text}</span>;
  }

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

  // Only enable background-clip / transparent text fill when the caller actually applies a gradient/text-clip class.
  const enableClip = /bg-clip-text|text-transparent|bg-gradient/.test(className);

  const containerStyle: CSSProperties = {
    display: 'inline-block',
    ...(enableClip
      ? {
          // Apply background-clip/text-fill so the element's own gradient background (from Tailwind classes)
          // is visible through the text. Do NOT override the background itself.
          backgroundClip: 'text' as CSSProperties['backgroundClip'],
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }
      : {}),
  };

  // If the caller requested gradient/text-clip styling, render the whole text as a single animated span.
  // This avoids per-character background-clip rendering issues where child spans don't correctly show
  // the parent's gradient in all browsers and can appear invisible.
  if (enableClip) {
    return (
      <motion.span
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={className}
        style={containerStyle}
      >
        {text}
      </motion.span>
    );
  }

  return (
    // Use a span as the outer container and force inline-block to avoid mobile inline transform issues.
    <motion.span
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      // drive animation via inView for consistent behavior across browsers (including mobile)
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={containerStyle}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={charVariants}
          className="inline-block"
          // Ensure mobile-friendly rendering & hint GPU acceleration
          style={{
            display: char === ' ' ? 'inline' : 'inline-block',
            WebkitFontSmoothing: 'antialiased',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            // Only apply text-clip / transparent fill when enabled by the parent class.
            ...(enableClip
              ? {
                  // Characters inherit the container's clip; only force transparent fill so the
                  // background-clip on the container shows through per character.
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }
              : {}),
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}