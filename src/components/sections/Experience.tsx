'use client';

import { motion } from 'framer-motion';
import { Experience as ExperienceType } from '@/types';
import TextAnimation, { CharacterSplit } from '@/components/ui/TextAnimation';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My professional journey and the valuable experiences I&apos;ve gained
            throughout my career.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />

            {experiences.map((experience, _index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className="relative mb-12 md:mb-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-md hidden md:block" />

                <div className="md:ml-16">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <motion.h3
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          viewport={{ once: true }}
                          className="text-xl font-bold text-gray-900 mb-1"
                        >
                          <CharacterSplit
                            text={experience.position}
                            direction="left"
                            stagger={0.03}
                            delay={0.2}
                          />
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="text-lg text-blue-600 font-medium"
                        >
                          {experience.company}
                        </motion.p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {experience.current ? 'Current' : 'Past'}
                        </span>
                      </div>
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center text-gray-500 mb-4">
                      <span className="text-sm">
                        {formatDate(experience.startDate)} -{' '}
                        {experience.current
                          ? 'Present'
                          : formatDate(experience.endDate!)}
                      </span>
                    </div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-gray-700 mb-4 leading-relaxed"
                    >
                      <TextAnimation
                        text={experience.description}
                        type="split"
                        className="inline"
                        delay={0.5}
                        stagger={0.02}
                      />
                    </motion.p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.5 + techIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {experience.achievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <motion.li
                              key={achievementIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.6 + achievementIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="text-gray-700 text-sm flex items-start"
                            >
                              <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.7 + achievementIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                              />
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Career Highlights
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Throughout my career, I&apos;ve had the opportunity to work on diverse projects,
              collaborate with talented teams, and continuously grow both technically and
              professionally. Each role has contributed to my expertise and passion for
              creating exceptional digital experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}