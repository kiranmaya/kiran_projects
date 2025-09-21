'use client';

import { motion } from 'framer-motion';
import {
  CircleStackIcon,
  CodeBracketIcon,
  CogIcon,
  PaintBrushIcon,
  ServerIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';
import { Skill, SkillCategory } from '@/types';
import TextAnimation, { CharacterSplit } from '@/components/ui/TextAnimation';

import { 
  Glitch
} from '@/components/ui/animations';



interface SkillsProps {
  skills: Skill[];
}

const categoryIcons: Record<SkillCategory, React.ComponentType<{ className?: string }>> = {
  frontend: CodeBracketIcon,
  backend: ServerIcon,
  database: CircleStackIcon,
  tools: WrenchIcon,
  design: PaintBrushIcon,
  other: CogIcon,
};

const categoryColors: Record<SkillCategory, string> = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-purple-500 to-indigo-500',
  tools: 'from-orange-500 to-red-500',
  design: 'from-pink-500 to-rose-500',
  other: 'from-gray-500 to-slate-500',
};

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

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

  const skillLevelColors = {
    beginner: 'bg-red-200 text-red-800',
    intermediate: 'bg-yellow-200 text-yellow-800',
    advanced: 'bg-blue-200 text-blue-800',
    expert: 'bg-green-200 text-green-800',
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
            across different technologies and tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills], _categoryIndex) => {
            const Icon = categoryIcons[category as SkillCategory];
            const colorGradient = categoryColors[category as SkillCategory];

            return (
              <motion.div
                key={category}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <motion.div
                  variants={itemVariants}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorGradient} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                <motion.h3
                  variants={itemVariants}
                  className="text-xl font-semibold text-gray-900 mb-4"
                >
                  <CharacterSplit
                    text={category}
                    direction="up"
                    stagger={0.05}
                    delay={0.2}
                  />
                </motion.h3>

                <div className="space-y-3">
                  {categorySkills.map((skill, _skillIndex) => (
                    <motion.div
                      key={skill.id}
                      variants={itemVariants}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center flex-1">
                        <CharacterSplit
                          text={skill.name}
                          direction="left"
                          stagger={0.03}
                          delay={0.1}
                          className="text-gray-700 font-medium"
                        />
                        {skill.icon && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="ml-2 text-gray-500"
                          >
                            {skill.icon}
                          </motion.span>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${skillLevelColors[skill.level]}`}
                      >
                        {skill.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              <motion.span
                className="text-4xl font-bold text-black relative block"
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
                Always Learning
              </motion.span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Technology evolves rapidly, and I&apos;m committed to continuous learning.
              I regularly explore new frameworks, tools, and best practices to stay
              current and deliver cutting-edge solutions.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}