import { Experience, PersonalInfo, Project, Skill } from '@/types';

export const personalInfo: PersonalInfo = {
  name: "Kiran Kumar",
  title: "AI & Next.js Developer | Game Tech Veteran",
  email: "kiran.killstreak@gmail.com",
  phone: "+91 9666099355",
  location: "Hyderabad, India",
  about: "Enthusiastic and ambitious developer with over 18+ years of experience, blending creative flair with technical expertise. Specializing in AI/ML, Python, Next.js, and Game Development. Passionate about Neural Networks, PyTorch, and building the next generation of intelligent web applications.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/kiran-killstreak", // Placeholder, user didn't provide
    github: "https://github.com/kiran-killstreak", // Placeholder
    twitter: "https://twitter.com/kiran_dev" // Placeholder
  }
};

export const skills: Skill[] = [
  {
    name: "AI & Machine Learning",
    level: 90,
    category: "ai",
    icon: "Brain"
  },
  {
    name: "Python (PyTorch, TensorFlow)",
    level: 95,
    category: "ai",
    icon: "Python"
  },
  {
    name: "Next.js & React",
    level: 90,
    category: "web",
    icon: "Globe"
  },
  {
    name: "Neural Networks (LSTM, RNN, GAN)",
    level: 85,
    category: "ai",
    icon: "Network"
  },
  {
    name: "Game Development (Unity3D, Unreal)",
    level: 98,
    category: "game",
    icon: "Gamepad"
  },
  {
    name: "C# & .NET",
    level: 95,
    category: "game",
    icon: "Code"
  },
  {
    name: "Tailwind CSS & Design",
    level: 88,
    category: "web",
    icon: "Palette"
  }
];

export const projects: Project[] = [
  {
    id: "zeroloss",
    title: "ZeroLoss",
    description: "An AI-driven project hosted on Vercel.",
    longDescription: "A cutting-edge web application demonstrating advanced Next.js capabilities and AI integration.",
    technologies: ["Next.js", "AI", "Vercel"],
    category: "web",
    image: "/images/zeroloss.jpg", // Placeholder
    status: "completed",
    startDate: "2024-01-01",
    demoUrl: "https://zeroloss.vercel.app/", // Inferred from user input
    featured: true,
    highlights: ["Deployed on Vercel", "Integrates AI models", "Responsive Design"]
  },
  {
    id: "paniponics",
    title: "PaniPonics",
    description: "Vertical Farming E-commerce Platform",
    longDescription: "A user-friendly e-commerce platform for aeroponic vertical gardening towers. Features secure checkout, product listings, and educational content.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "MongoDB", "Node.js"],
    category: "web",
    image: "/images/paniponics.jpg",
    status: "completed",
    startDate: "2023-01-01",
    featured: true,
    highlights: ["E-commerce functionality", "Secure payments", "Educational resources"]
  },
  {
    id: "shortnews",
    title: "Short News",
    description: "Mobile-First News Aggregator",
    longDescription: "A sleek, mobile-optimized news aggregation website using Vercel's v0.app platform. Delivers concise, real-time updates on NSE F&O markets.",
    technologies: ["React", "Tailwind CSS", "Vercel", "MongoDB"],
    category: "web",
    image: "/images/short_news.jpg",
    status: "completed",
    startDate: "2023-06-01",
    featured: true,
    highlights: ["Real-time updates", "Mobile-first design", "NSE F&O market data"]
  },
  {
    id: "antigravity",
    title: "Anti-Gravity Editor",
    description: "Next-gen Code Editor",
    longDescription: "An experimental code editor implementation focusing on agentic workflows.",
    technologies: ["AI", "Agents", "Editor"],
    category: "tool",
    image: "/images/editor.jpg",
    status: "in-progress",
    startDate: "2024-01-01",
    featured: false,
    highlights: ["Agentic AI", "Code editing", "Experimental"]
  },
  {
    id: "geminicli",
    title: "Gemini CLI",
    description: "Command Line Interface for Gemini",
    longDescription: "A powerful CLI tool to interact with Google's Gemini models directly from the terminal.",
    technologies: ["Python", "Gemini API", "CLI"],
    category: "tool",
    image: "/images/cli.jpg",
    status: "completed",
    startDate: "2023-01-01",
    featured: false,
    highlights: ["Direct API access", "Terminal interface", "Automation"]
  }
];

export const experiences: Experience[] = [
  {
    id: "ace-games",
    role: "Senior Game Programmer",
    company: "Ace Games Pvt. Ltd",
    location: "Hyderabad",
    startDate: "2014-01-01",
    current: true,
    description: "Leading development of AAA titles and mobile games. Architecting game systems and mentoring junior developers.",
    achievements: [
      "Developed & Published 60+ Games",
      "Author of 10+ game source tutorials"
    ]
  },
  {
    id: "gameshastra",
    role: "Senior Game Programmer",
    company: "Gameshastra Pvt. Ltd",
    location: "Hyderabad",
    startDate: "2012-05-01",
    endDate: "2013-12-31",
    description: "Game development and optimization for various platforms.",
    achievements: []
  },
  {
    id: "voice-gate",
    role: "Game Programmer",
    company: "Voice Gate India Pvt. Ltd",
    location: "Hyderabad",
    startDate: "2010-01-01",
    endDate: "2012-05-01",
    description: "Developed interactive applications and games.",
    achievements: []
  }
];