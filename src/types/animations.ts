import { ReactNode } from 'react';

// ========================================
// BASE ANIMATION TYPES AND INTERFACES
// ========================================

/**
 * Base interface for all animation components
 */
export interface BaseAnimationProps {
  /** Additional CSS classes */
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Whether to trigger animation only once */
  once?: boolean;
  /** Whether to start animation automatically */
  autoStart?: boolean;
}

/**
 * Common animation directions
 */
export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'center';

/**
 * Animation intensity levels
 */
export type AnimationIntensity = 'subtle' | 'medium' | 'strong';

/**
 * Animation easing options
 */
export type AnimationEase = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'circInOut' | 'backIn' | 'backOut' | 'backInOut' | 'anticipate';

/**
 * Animation trigger types
 */
export type AnimationTrigger = 'hover' | 'click' | 'inView' | 'manual' | 'auto';

/**
 * Animation repeat options
 */
export type AnimationRepeat = 'once' | 'loop' | 'reverse' | number;

/**
 * Color configuration for animations
 */
export interface AnimationColors {
  /** Primary color */
  primary?: string;
  /** Secondary color */
  secondary?: string;
  /** Array of colors for multi-color animations */
  colors?: string[];
  /** Background color */
  background?: string;
  /** Text color */
  text?: string;
}

// ========================================
// SPRING PHYSICS CONFIGURATION
// ========================================

/**
 * Spring animation configuration
 */
export interface SpringConfig {
  /** Spring stiffness (higher = more rigid) */
  stiffness?: number;
  /** Spring damping (higher = less oscillation) */
  damping?: number;
  /** Spring mass */
  mass?: number;
  /** Initial velocity */
  velocity?: number;
  /** Rest delta threshold */
  restDelta?: number;
  /** Rest speed threshold */
  restSpeed?: number;
}

/**
 * Default spring configurations
 */
export const SPRING_CONFIGS = {
  gentle: { stiffness: 100, damping: 15 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 400, damping: 30 },
  slow: { stiffness: 280, damping: 60 },
  molasses: { stiffness: 280, damping: 120 }
} as const;

// ========================================
// TEXT ANIMATION INTERFACES
// ========================================

/**
 * Base interface for text animations
 */
export interface BaseTextAnimationProps extends BaseAnimationProps {
  /** Text content to animate */
  text?: string;
  /** Custom content instead of text */
  children?: ReactNode;
  /** Font size */
  fontSize?: number | string;
  /** Font weight */
  fontWeight?: number | string;
  /** Text color */
  color?: string;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Cursor className */
  cursorClassName?: string;
  /** Start delay before animation begins */
  startDelay?: number;
  /** Whether to loop the animation */
  loop?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

/**
 * Typewriter animation props
 */
export interface TypewriterProps extends BaseTextAnimationProps {
  /** Typing speed in milliseconds */
  speed?: number;
}

/**
 * Letter-by-letter animation props
 */
export interface LetterByLetterProps extends BaseTextAnimationProps {
  /** Stagger delay between letters */
  staggerDelay?: number;
  /** Animation direction for letters */
  direction?: AnimationDirection;
}

/**
 * Text scramble animation props
 */
export interface ScrambleTextProps extends BaseTextAnimationProps {
  /** Characters to use for scrambling */
  charset?: string;
  /** Scramble duration */
  scrambleDuration?: number;
  /** Reveal duration */
  revealDuration?: number;
}

/**
 * Text wave animation props
 */
export interface WaveTextProps extends BaseTextAnimationProps {
  /** Wave amplitude */
  amplitude?: number;
  /** Wave frequency */
  frequency?: number;
  /** Wave speed */
  speed?: number;
}

/**
 * Text glitch animation props
 */
export interface GlitchProps extends BaseTextAnimationProps {
  /** Glitch intensity */
  intensity?: AnimationIntensity;
  /** Glitch duration */
  glitchDuration?: number;
  /** Interval between glitches */
  glitchInterval?: number;
}

/**
 * Text gradient animation props
 */
export interface GradientAnimationProps extends BaseTextAnimationProps {
  /** Gradient colors */
  colors?: string[];
  /** Gradient direction */
  gradientDirection?: 'horizontal' | 'vertical' | 'diagonal';
  /** Animation speed */
  animationSpeed?: number;
}

/**
 * Text split animation props
 */
export interface SplitTextProps extends BaseTextAnimationProps {
  /** Split direction */
  splitDirection?: 'horizontal' | 'vertical' | 'both';
  /** Stagger delay between splits */
  staggerDelay?: number;
  /** Split distance */
  splitDistance?: number;
}

/**
 * Bounce letters animation props
 */
export interface BounceLettersProps extends BaseTextAnimationProps {
  /** Bounce height */
  bounceHeight?: number;
  /** Stagger delay between letters */
  staggerDelay?: number;
  /** Bounce duration */
  bounceDuration?: number;
}

// ========================================
// CONTAINER ANIMATION INTERFACES
// ========================================

/**
 * Base interface for container animations
 */
export interface BaseContainerAnimationProps extends BaseAnimationProps {
  /** Content to animate */
  children: ReactNode;
  /** Animation direction */
  direction?: AnimationDirection;
  /** Animation distance */
  distance?: number;
  /** Initial scale */
  scale?: number;
  /** Animation intensity */
  intensity?: AnimationIntensity;
}

/**
 * Scale fade animation props
 */
export interface ScaleFadeProps extends BaseContainerAnimationProps {
  /** Initial scale value */
  scale?: number;
  /** Animation direction */
  direction?: AnimationDirection;
}

/**
 * Slide in animation props
 */
export interface SlideInProps extends BaseContainerAnimationProps {
  /** Slide distance */
  distance?: number;
  /** Animation direction */
  direction?: AnimationDirection;
}

/**
 * Rotate scale animation props
 */
export interface RotateScaleProps extends BaseContainerAnimationProps {
  /** Rotation angle */
  rotation?: number;
  /** Scale value */
  scale?: number;
  /** Rotation direction */
  rotationDirection?: 'clockwise' | 'counterclockwise';
}

/**
 * Morph shape animation props
 */
export interface MorphShapeProps extends BaseContainerAnimationProps {
  /** Target shape */
  targetShape?: 'circle' | 'square' | 'triangle' | 'custom';
  /** Morph duration */
  morphDuration?: number;
  /** Custom path for morphing */
  customPath?: string;
}

/**
 * Pulse animation props
 */
export interface PulseProps extends BaseContainerAnimationProps {
  /** Pulse scale */
  scale?: number;
  /** Pulse intensity */
  intensity?: AnimationIntensity;
}

/**
 * Wobble animation props
 */
export interface WobbleProps extends BaseContainerAnimationProps {
  /** Wobble intensity */
  intensity?: AnimationIntensity;
  /** Wobble frequency */
  frequency?: number;
}

/**
 * Flip card animation props
 */
export interface FlipCardProps extends BaseContainerAnimationProps {
  /** Flip direction */
  flipDirection?: 'horizontal' | 'vertical';
  /** Front content */
  frontContent?: ReactNode;
  /** Back content */
  backContent?: ReactNode;
  /** Show back content initially */
  showBack?: boolean;
}

/**
 * Skew transform animation props
 */
export interface SkewTransformProps extends BaseContainerAnimationProps {
  /** Skew angle in degrees */
  skewAngle?: number;
  /** Skew direction */
  skewDirection?: 'horizontal' | 'vertical' | 'both';
}

/**
 * Liquid morph animation props
 */
export interface LiquidMorphProps extends BaseContainerAnimationProps {
  /** Morph intensity */
  intensity?: AnimationIntensity;
  /** Morph speed */
  speed?: number;
  /** Border radius */
  borderRadius?: number | string;
}

/**
 * Shimmer animation props
 */
export interface ShimmerProps extends BaseContainerAnimationProps {
  /** Shimmer color */
  shimmerColor?: string;
  /** Shimmer width */
  shimmerWidth?: number;
  /** Shimmer speed */
  shimmerSpeed?: number;
  /** Shimmer direction */
  shimmerDirection?: 'left' | 'right' | 'top' | 'bottom';
}

/**
 * Glow pulse animation props
 */
export interface GlowPulseProps extends BaseContainerAnimationProps {
  /** Glow color */
  glowColor?: string;
  /** Glow intensity */
  intensity?: AnimationIntensity;
  /** Glow radius */
  glowRadius?: number;
}

// ========================================
// ADVANCED ANIMATION INTERFACES
// ========================================

/**
 * Particle explosion animation props
 */
export interface ParticleExplosionProps extends BaseAnimationProps {
  /** Content to animate */
  children: ReactNode;
  /** Number of particles */
  particleCount?: number;
  /** Particle size */
  particleSize?: number;
  /** Explosion radius */
  explosionRadius?: number;
  /** Particle colors */
  colors?: string[];
  /** Trigger explosion */
  trigger?: boolean;
}

/**
 * Matrix rain animation props
 */
export interface MatrixRainProps extends BaseAnimationProps {
  /** Rain density */
  density?: number;
  /** Rain speed */
  speed?: number;
  /** Character set */
  charset?: string;
  /** Rain color */
  color?: string;
  /** Background opacity */
  backgroundOpacity?: number;
}

/**
 * Wave pattern animation props
 */
export interface WavePatternProps extends BaseAnimationProps {
  /** Wave amplitude */
  amplitude?: number;
  /** Wave frequency */
  frequency?: number;
  /** Wave speed */
  speed?: number;
  /** Wave color */
  color?: string;
  /** Number of waves */
  waveCount?: number;
}

/**
 * Orbiting elements animation props
 */
export interface OrbitingElementsProps extends BaseAnimationProps {
  /** Center content */
  children: ReactNode;
  /** Number of orbiting elements */
  orbitCount?: number;
  /** Orbit radius */
  orbitRadius?: number;
  /** Orbit duration */
  orbitDuration?: number;
  /** Element size */
  elementSize?: number;
  /** Element color */
  elementColor?: string;
  /** Orbit direction */
  reverse?: boolean;
}

/**
 * Magnetic hover animation props
 */
export interface MagneticHoverProps extends BaseAnimationProps {
  /** Content to animate */
  children: ReactNode;
  /** Magnetic strength */
  strength?: number;
  /** Magnetic range */
  range?: number;
  /** Spring configuration */
  springConfig?: SpringConfig;
}

/**
 * Elastic drag animation props
 */
export interface ElasticDragProps extends BaseAnimationProps {
  /** Content to animate */
  children: ReactNode;
  /** Elasticity strength */
  elasticity?: number;
  /** Drag resistance */
  resistance?: number;
  /** Spring configuration */
  springConfig?: SpringConfig;
}

/**
 * Stagger grid animation props
 */
export interface StaggerGridProps extends BaseAnimationProps {
  /** Grid items */
  children: ReactNode[];
  /** Number of grid columns */
  gridCols?: number;
  /** Stagger delay between items */
  staggerDelay?: number;
  /** Animation direction */
  direction?: AnimationDirection;
  /** Animation distance */
  distance?: number;
}

/**
 * Parallax layers animation props
 */
export interface ParallaxLayersProps extends BaseAnimationProps {
  /** Layer content */
  children: ReactNode[];
  /** Parallax speed */
  speed?: number;
  /** Offset distance */
  offset?: number;
  /** Disable parallax on mobile */
  disableOnMobile?: boolean;
}

/**
 * Path animation props
 */
export interface PathAnimationProps extends BaseAnimationProps {
  /** Content to animate */
  children: ReactNode;
  /** SVG path */
  path?: string;
  /** Animation duration */
  duration?: number;
  /** Path offset */
  offset?: number;
  /** Repeat animation */
  repeat?: AnimationRepeat;
}

/**
 * Morphing blob animation props
 */
export interface MorphingBlobProps extends BaseAnimationProps {
  /** Blob size */
  size?: number;
  /** Blob color */
  color?: string;
  /** Morph speed */
  speed?: number;
  /** Blob intensity */
  intensity?: AnimationIntensity;
  /** Border radius */
  borderRadius?: number | string;
}

/**
 * Infinite scroll animation props
 */
export interface InfiniteScrollProps extends BaseAnimationProps {
  /** Scroll content */
  children: ReactNode[];
  /** Scroll direction */
  direction?: 'horizontal' | 'vertical';
  /** Scroll speed */
  speed?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Duplicate items for seamless loop */
  duplicate?: boolean;
}

/**
 * 3D Cube animation props
 */
export interface Cube3DProps extends BaseAnimationProps {
  /** Cube size */
  size?: number;
  /** Cube color */
  color?: string;
  /** Rotation speed */
  rotationSpeed?: number;
  /** Auto rotate */
  autoRotate?: boolean;
  /** Rotation axes */
  rotationAxes?: ('x' | 'y' | 'z')[];
}

/**
 * Lightning effect animation props
 */
export interface LightningEffectProps extends BaseAnimationProps {
  /** Lightning color */
  color?: string;
  /** Lightning thickness */
  thickness?: number;
  /** Lightning duration */
  duration?: number;
  /** Lightning branches */
  branches?: number;
  /** Trigger lightning */
  trigger?: boolean;
}

// ========================================
// UTILITY TYPES AND ENUMS
// ========================================

/**
 * Animation state types
 */
export type AnimationState = 'idle' | 'playing' | 'paused' | 'completed';

/**
 * Animation timing configuration
 */
export interface AnimationTiming {
  /** Delay before animation starts */
  delay: number;
  /** Animation duration */
  duration: number;
  /** Animation easing */
  ease: AnimationEase;
  /** Repeat configuration */
  repeat: AnimationRepeat;
}

/**
 * Animation transform configuration
 */
export interface AnimationTransform {
  /** Scale transformation */
  scale?: number;
  /** Rotation transformation */
  rotation?: number;
  /** X position transformation */
  x?: number;
  /** Y position transformation */
  y?: number;
  /** Skew transformation */
  skew?: number;
  /** Opacity transformation */
  opacity?: number;
}

/**
 * Animation variant configuration
 */
export interface AnimationVariant {
  /** Initial state */
  initial: AnimationTransform;
  /** Target state */
  target: AnimationTransform;
  /** Animation timing */
  timing: AnimationTiming;
}

/**
 * Animation preset configurations
 */
export const ANIMATION_PRESETS = {
  fadeIn: {
    initial: { opacity: 0 },
    target: { opacity: 1 },
    timing: { delay: 0, duration: 0.6, ease: 'easeOut', repeat: 'once' }
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    target: { opacity: 1, y: 0 },
    timing: { delay: 0, duration: 0.6, ease: 'easeOut', repeat: 'once' }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    target: { opacity: 1, scale: 1 },
    timing: { delay: 0, duration: 0.6, ease: 'easeOut', repeat: 'once' }
  }
} as const;

// ========================================
// COMPONENT-SPECIFIC TYPES
// ========================================

/**
 * Blur in animation props
 */
export interface BlurInProps extends BaseContainerAnimationProps {
  /** Blur intensity */
  blurAmount?: number;
  /** Animation direction */
  direction?: AnimationDirection;
}

/**
 * Fade in up animation props
 */
export interface FadeInUpProps extends BaseContainerAnimationProps {
  /** Animation distance */
  distance?: number;
}

/**
 * Flip 3D animation props
 */
export interface Flip3DProps extends BaseContainerAnimationProps {
  /** Flip axis */
  flipAxis?: 'x' | 'y' | 'z';
  /** Flip angle */
  flipAngle?: number;
  /** Flip direction */
  flipDirection?: 'forward' | 'backward';
}

/**
 * Neon glow animation props
 */
export interface NeonGlowProps extends BaseContainerAnimationProps {
  /** Glow color */
  glowColor?: string;
  /** Glow intensity */
  intensity?: AnimationIntensity;
  /** Glow animation speed */
  animationSpeed?: number;
}

/**
 * 3D Path animation props
 */
export interface Path3DAnimationProps extends BaseAnimationProps {
  /** Content to animate */
  children: ReactNode;
  /** 3D path points */
  pathPoints?: Array<{ x: number; y: number; z: number }>;
  /** Animation duration */
  duration?: number;
  /** Path smoothness */
  smoothness?: number;
  /** Loop animation */
  loop?: boolean;
}

// ========================================
// EXPORT ALL TYPES
// ========================================

// All interfaces and types are already exported above
// This section is intentionally left empty to avoid redeclaration errors