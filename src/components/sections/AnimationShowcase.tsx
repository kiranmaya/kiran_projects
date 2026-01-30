'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Effect {
  name: string;
  element: React.ReactElement;
}

type CategoryType = 'text' | 'div' | 'advanced';

const AnimationShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('text');
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const containerRef = useRef(null);

  // Motion values for advanced effects

  // TEXT EFFECTS COLLECTION
  const textEffects = [
    {
      name: "Fade In Up",
      element: (
        <motion.h2
          key={triggerAnimation}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white"
        >
          Fade In Up
        </motion.h2>
      )
    },
    {
      name: "Letter by Letter",
      element: (
        <div className="text-4xl font-bold text-white">
          {"ANIMATE".split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      )
    },
    {
      name: "Typewriter Effect",
      element: (
        <motion.div
          className="text-3xl font-mono text-green-400"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 2, ease: "linear" }}
          style={{ overflow: "hidden", whiteSpace: "nowrap" }}
        >
          Typewriter Effect...
        </motion.div>
      )
    },
    {
      name: "Glitch Effect",
      element: (
        <motion.h2
          className="text-4xl font-bold text-white relative"
          animate={{
            x: [0, -2, 2, -2, 2, 0],
            textShadow: [
              "0 0 0 rgba(255,0,0,0)",
              "-2px 0 red, 2px 0 cyan",
              "2px 0 red, -2px 0 cyan",
              "-2px 0 red, 2px 0 cyan",
              "2px 0 red, -2px 0 cyan",
              "0 0 0 rgba(255,0,0,0)"
            ]
          }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        >
          GLITCH
        </motion.h2>
      )
    },
    {
      name: "Wave Text",
      element: (
        <div className="text-4xl font-bold text-white">
          {"WAVE".split('').map((char, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      )
    },
    {
      name: "3D Flip",
      element: (
        <motion.h2
          className="text-4xl font-bold text-white"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          3D FLIP
        </motion.h2>
      )
    },
    {
      name: "Blur In",
      element: (
        <motion.h2
          key={triggerAnimation}
          initial={{ filter: "blur(20px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-white"
        >
          Blur Focus
        </motion.h2>
      )
    },
    {
      name: "Scramble Text",
      element: <ScrambleText text="SCRAMBLE" />
    },
    {
      name: "Gradient Animation",
      element: (
        <motion.h2
          className="text-4xl font-bold text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(90deg, #ff0080, #00ff88, #0080ff)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          GRADIENT
        </motion.h2>
      )
    },
    {
      name: "Neon Glow",
      element: (
        <motion.h2
          className="text-4xl font-bold text-white"
          animate={{
            textShadow: [
              "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff, 0 0 40px #0ff",
              "0 0 20px #fff, 0 0 30px #ff0, 0 0 40px #ff0, 0 0 50px #ff0",
              "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff, 0 0 40px #0ff"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          NEON
        </motion.h2>
      )
    },
    {
      name: "Bounce Letters",
      element: (
        <div className="text-4xl font-bold text-white">
          {"BOUNCE".split('').map((char, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="inline-block mx-1"
            >
              {char}
            </motion.span>
          ))}
        </div>
      )
    },
    {
      name: "Split Text",
      element: (
        <div className="relative text-4xl font-bold">
          <motion.div
            className="text-white"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            SPLIT
          </motion.div>
          <motion.div
            className="absolute top-0 text-cyan-400"
            initial={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            SPLIT
          </motion.div>
        </div>
      )
    }
  ];

  // DIV/CONTAINER EFFECTS COLLECTION
  const divEffects = [
    {
      name: "Scale Fade",
      element: (
        <motion.div
          key={triggerAnimation}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
        />
      )
    },
    {
      name: "Rotate Scale",
      element: (
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"
        />
      )
    },
    {
      name: "Slide In",
      element: (
        <motion.div
          key={triggerAnimation}
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-32 h-32 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg"
        />
      )
    },
    {
      name: "Morph Shape",
      element: (
        <motion.div
          animate={{
            borderRadius: ["20%", "50%", "20%"],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-orange-500"
        />
      )
    },
    {
      name: "Pulse",
      element: (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
        />
      )
    },
    {
      name: "Wobble",
      element: (
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 0.9, 1.1, 0.95, 1.05, 1]
          }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"
        />
      )
    },
    {
      name: "Flip Card",
      element: (
        <motion.div
          animate={{ rotateY: 180 }}
          transition={{ duration: 1 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-32 h-32"
        >
          <div className="absolute inset-0 bg-blue-500 rounded-lg backface-hidden" />
          <div className="absolute inset-0 bg-red-500 rounded-lg backface-hidden" style={{ transform: "rotateY(180deg)" }} />
        </motion.div>
      )
    },
    {
      name: "Skew Transform",
      element: (
        <motion.div
          animate={{
            skewY: [0, 20, -20, 0],
            skewX: [0, -20, 20, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
        />
      )
    },
    {
      name: "Liquid Morph",
      element: (
        <motion.div
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500"
        />
      )
    },
    {
      name: "Shimmer",
      element: (
        <motion.div
          className="w-32 h-32 bg-gray-700 rounded-lg overflow-hidden relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>
      )
    },
    {
      name: "Parallax Layers",
      element: (
        <div className="relative w-32 h-32">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-blue-500/50 rounded-lg"
          />
          <motion.div
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-2 bg-purple-500/50 rounded-lg"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-4 bg-pink-500/50 rounded-lg"
          />
        </div>
      )
    },
    {
      name: "Glow Pulse",
      element: (
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0px rgba(0,255,255,0.5)",
              "0 0 0 20px rgba(0,255,255,0)",
              "0 0 0 0px rgba(0,255,255,0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
        />
      )
    }
  ];

  // ADVANCED EFFECTS COLLECTION
  const advancedEffects = [
    {
      name: "Particle Explosion",
      element: <ParticleExplosion />
    },
    {
      name: "Matrix Rain",
      element: <MatrixRain />
    },
    {
      name: "Wave Pattern",
      element: <WavePattern />
    },
    {
      name: "Orbiting Elements",
      element: <OrbitingElements />
    },
    {
      name: "Magnetic Hover",
      element: <MagneticHover />
    },
    {
      name: "Elastic Drag",
      element: <ElasticDrag />
    },
    {
      name: "Stagger Grid",
      element: <StaggerGrid />
    },
    {
      name: "Path Animation",
      element: <PathAnimation />
    },
    {
      name: "Morphing Blob",
      element: <MorphingBlob />
    },
    {
      name: "Infinite Scroll",
      element: <InfiniteScroll />
    },
    {
      name: "3D Cube",
      element: <Cube3D />
    },
    {
      name: "Lightning Effect",
      element: <LightningEffect />
    }
  ];

  const categories: Record<CategoryType, Effect[]> = {
    text: textEffects,
    div: divEffects,
    advanced: advancedEffects
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Animation Effects Library
        </motion.h1>
        <p className="text-foreground/60 text-lg">Comprehensive collection of React + Framer Motion animations</p>
      </div>

      {/* Category Selector */}
      <div className="flex justify-center gap-4 mb-12">
        {Object.keys(categories).map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${activeCategory === category
                ? 'bg-gradient-to-r from-primary to-secondary text-background shadow-lg shadow-primary/20'
                : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category} Effects
          </motion.button>
        ))}
      </div>

      {/* Trigger Button */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={() => setTriggerAnimation(prev => prev + 1)}
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-background rounded-full font-bold shadow-lg shadow-primary/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Replay Animations
        </motion.button>
      </div>

      {/* Effects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" ref={containerRef}>
        <AnimatePresence mode="wait">
          {categories[activeCategory as CategoryType].map((effect: Effect, index: number) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className="bg-foreground/5 backdrop-blur-sm rounded-xl p-6 border border-foreground/10 hover:border-primary/50 transition-all"
            >
              <h3 className="text-primary font-bold mb-4 text-center">{effect.name}</h3>
              <div className="flex items-center justify-center min-h-[150px]">
                {effect.element}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Component implementations for advanced effects
const ScrambleText = ({ text }: { text: string }) => {
  const [scrambled, setScrambled] = useState(text);

  useEffect(() => {
    const chars = '!@#$%^&*()_+{}[]|<>?/';
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambled(text.split('').map((char, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <div className="text-4xl font-bold text-white font-mono">{scrambled}</div>;
};

const ParticleExplosion = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="relative w-32 h-32">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          initial={{ x: 64, y: 64 }}
          animate={{
            x: 64 + Math.cos(i * 18 * Math.PI / 180) * 80,
            y: 64 + Math.sin(i * 18 * Math.PI / 180) * 80,
            opacity: [1, 0]
          }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
    </div>
  );
};

const MatrixRain = () => {
  const columns = Array.from({ length: 8 });

  return (
    <div className="relative w-32 h-32 overflow-hidden bg-black rounded">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 text-xs"
          style={{ left: i * 16 }}
          animate={{ y: [-20, 140] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          {Array.from({ length: 10 }).map((_, j) => (
            <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const WavePattern = () => {
  const bars = Array.from({ length: 10 });

  return (
    <div className="flex items-end justify-center h-32 gap-1">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-3 bg-gradient-to-t from-cyan-500 to-purple-500"
          animate={{ height: [20, 80, 20] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
};

const OrbitingElements = () => {
  return (
    <div className="relative w-32 h-32">
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-cyan-400 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            marginTop: -8,
            marginLeft: -8
          }}
          animate={{
            x: Math.cos(angle * Math.PI / 180) * 50,
            y: Math.sin(angle * Math.PI / 180) * 50,
            rotate: 360
          }}
          transition={{
            x: { duration: 3, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "linear" },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        />
      ))}
    </div>
  );
};

const MagneticHover = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg cursor-pointer"
      animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2
        });
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    />
  );
};

const ElasticDrag = () => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.2 }}
      className="w-32 h-32 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg cursor-move"
    />
  );
};

const StaggerGrid = () => {
  const grid = Array.from({ length: 16 });

  return (
    <div className="grid grid-cols-4 gap-1 w-32 h-32">
      {grid.map((_, i) => (
        <motion.div
          key={i}
          className="bg-cyan-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
        />
      ))}
    </div>
  );
};

const PathAnimation = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128">
      <motion.circle
        cx="10"
        cy="64"
        r="5"
        fill="cyan"
        animate={{
          cx: [10, 64, 118, 64, 10],
          cy: [64, 10, 64, 118, 64]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <path
        d="M 10 64 Q 64 10, 118 64 T 10 64"
        stroke="gray"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
};

const MorphingBlob = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128">
      <motion.path
        d="M64,20 Q90,40 90,64 Q70,90 64,90 Q40,70 40,64 Q50,40 64,20"
        fill="url(#gradient)"
        animate={{
          d: [
            "M64,20 Q90,40 90,64 Q70,90 64,90 Q40,70 40,64 Q50,40 64,20",
            "M64,30 Q85,50 80,64 Q65,85 64,80 Q45,65 45,64 Q55,45 64,30",
            "M64,20 Q90,40 90,64 Q70,90 64,90 Q40,70 40,64 Q50,40 64,20"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const InfiniteScroll = () => {
  return (
    <div className="relative w-32 h-32 overflow-hidden">
      <motion.div
        className="flex flex-col"
        animate={{ y: [0, -160] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {[1, 2, 3, 4, 5, 1, 2, 3].map((num, i) => (
          <div key={i} className="h-8 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 mb-1 flex items-center justify-center text-white">
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Cube3D = () => {
  return (
    <motion.div
      className="relative w-32 h-32"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute w-32 h-32 bg-cyan-500/80 border-2 border-cyan-400" style={{ transform: "translateZ(64px)" }} />
      <div className="absolute w-32 h-32 bg-purple-500/80 border-2 border-purple-400" style={{ transform: "translateZ(-64px) rotateY(180deg)" }} />
      <div className="absolute w-32 h-32 bg-pink-500/80 border-2 border-pink-400" style={{ transform: "rotateY(90deg) translateZ(64px)" }} />
      <div className="absolute w-32 h-32 bg-yellow-500/80 border-2 border-yellow-400" style={{ transform: "rotateY(-90deg) translateZ(64px)" }} />
    </motion.div>
  );
};

const LightningEffect = () => {
  return (
    <div className="relative w-32 h-32">
      <motion.svg width="128" height="128" viewBox="0 0 128 128">
        <motion.path
          d="M64,0 L55,50 L70,50 L64,128"
          stroke="cyan"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2
          }}
          style={{
            filter: "drop-shadow(0 0 10px cyan)"
          }}
        />
      </motion.svg>
    </div>
  );
};

export default AnimationShowcase;