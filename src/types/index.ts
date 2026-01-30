export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string; // Changed from bio
  bio?: string; // Optional for backward compat
  avatar?: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  [key: string]: string | undefined;
}


export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

// Skills Types
export interface Skill {
  id?: string;
  name: string;
  category: SkillCategory;
  level: number; // Changed to number for progress bars
  icon?: string;
}

export type SkillCategory = 'ai' | 'web' | 'game' | 'tool' | 'frontend' | 'backend' | 'database' | 'design' | 'other';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'; // Kept for backward compat if needed, but main usage will be number

// Experience Types
export interface Experience {
  id: string;
  company: string;
  role: string; // Changed from position to role
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  technologies?: string[];
  achievements: string[];
  location?: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export type ProjectCategory = 'ai' | 'web' | 'game' | 'tool' | 'mobile' | 'desktop' | 'other';
export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

// Contact Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// ========================================
// ANIMATION TYPES
// ========================================

// Re-export all animation types from the animations module
export * from './animations';