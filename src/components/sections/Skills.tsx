'use client';

import { motion } from 'framer-motion';
import {
  CircleStackIcon,
  CommandLineIcon,
  CpuChipIcon, // For AI
  GlobeAltIcon,
  PaintBrushIcon,
  ServerIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';
import { Skill } from '@/types';

interface SkillsProps {
  skills: Skill[];
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ai: CpuChipIcon,
  web: GlobeAltIcon,
  game: CommandLineIcon,
  tool: WrenchIcon,
  design: PaintBrushIcon,
  backend: ServerIcon,
  database: CircleStackIcon,
  other: WrenchIcon,
};

const categoryColors: Record<string, string> = {
  ai: 'from-purple-500 to-pink-500',
  web: 'from-blue-500 to-cyan-500',
  game: 'from-green-500 to-emerald-500',
  tool: 'from-orange-500 to-red-500',
  design: 'from-pink-500 to-rose-500',
  other: 'from-gray-500 to-slate-500',
};

const categoryLabels: Record<string, string> = {
  ai: "AI & Machine Learning",
  web: "Web Development",
  game: "Game Development",
  tool: "Tools & DevOps",
  design: "Design",
  other: "Other"
};

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    // Default to 'other' if category not found or just use the string
    const cat = skill.category || 'other';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="skills" className="py-20 bg-black text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Technical Arsenal
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            My proficiency in various technologies, from AI models to game engines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const Icon = categoryIcons[category] || WrenchIcon;
            const colorGradient = categoryColors[category] || categoryColors['other'];
            const label = categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);

            return (
              <motion.div
                key={category}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorGradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100">
                    {label}
                  </h3>
                </div>

                <div className="space-y-6">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.name} // Use name or ID
                      variants={itemVariants}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${colorGradient}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}