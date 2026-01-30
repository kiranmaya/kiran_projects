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
    <section id="experience" className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Career Journey
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            18+ Years of Experience in Game Development and Software Engineering.
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
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary hidden md:block" />

            {experiences.map((experience, _index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className="relative mb-12 md:mb-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-background rounded-full border-4 border-primary shadow-glow hidden md:block z-10" />

                <div className="md:ml-16">
                  <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <motion.h3
                          className="text-xl font-bold text-foreground mb-1"
                        >
                          <CharacterSplit
                            text={experience.role}
                            direction="left"
                            stagger={0.03}
                            delay={0.2}
                          />
                        </motion.h3>
                        <motion.p
                          className="text-lg text-primary font-medium"
                        >
                          {experience.company}
                        </motion.p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${experience.current ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-foreground/10 text-foreground/60 border border-foreground/10'}`}>
                          {experience.current ? 'Current' : 'Past'}
                        </span>
                      </div>
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center text-foreground/40 mb-4 text-sm font-mono">
                      <span>
                        {formatDate(experience.startDate)} -{' '}
                        {experience.current
                          ? 'Present'
                          : experience.endDate ? formatDate(experience.endDate) : ''}
                      </span>
                    </div>

                    {/* Description */}
                    <motion.p
                      className="text-foreground/80 mb-4 leading-relaxed"
                    >
                      <TextAnimation
                        text={experience.description}
                        type="split"
                        className="inline"
                        delay={0.5}
                        stagger={0.02}
                      />
                    </motion.p>

                    {/* Technologies (if any) */}
                    {experience.technologies && experience.technologies.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-foreground/40 mb-2">
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
                              className="px-3 py-1 bg-foreground/10 text-foreground/80 rounded-full text-xs font-medium border border-foreground/10"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {experience.achievements && experience.achievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground/40 mb-2">
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
                              className="text-foreground/60 text-sm flex items-start"
                            >
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
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
      </div>
    </section>
  );
}