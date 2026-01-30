'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  CodeBracketIcon,
  EyeIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { Project, ProjectCategory } from '@/types';

interface PortfolioProps {
  projects: Project[];
}

const categoryFilters: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'ai', label: 'AI & ML' },
  { value: 'web', label: 'Web Apps' },
  { value: 'game', label: 'Games' },
  { value: 'tool', label: 'Tools' },
];

export default function Portfolio({ projects }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(
      project =>
        project.category.toLowerCase() ===
        (selectedCategory as string).toLowerCase()
    );

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/20 text-primary border border-primary/30';
      case 'in-progress':
        return 'bg-secondary/20 text-secondary border border-secondary/30';
      case 'planned':
        return 'bg-accent/20 text-accent border border-accent/30';
      default:
        return 'bg-foreground/10 text-foreground/60';
    }
  };

  const getImageSrc = (project: Project) => {
    return project.image;
  };

  return (
    <section id="portfolio" className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Selected Works
          </h2>
          <motion.p
            className="text-lg text-foreground/60 max-w-2xl mx-auto"
          >
            A curated collection of my work in AI, Game Development, and Web Technologies.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categoryFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setSelectedCategory(filter.value);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${selectedCategory === filter.value
                ? 'bg-primary border-primary text-background shadow-lg shadow-primary/20'
                : 'bg-transparent border-foreground/10 text-foreground/60 hover:border-primary/50 hover:text-foreground'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group bg-foreground/5 rounded-xl border border-foreground/10 shadow-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video bg-foreground/10">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center text-foreground/20">
                  <span className="text-4xl opacity-20">🚀</span>
                </div>

                <Image
                  src={getImageSrc(project)}
                  alt={project.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-2 py-1 bg-gradient-to-r from-secondary to-accent text-background rounded-full text-xs font-medium shadow-lg">
                      Featured
                    </span>
                  </div>
                )}

                {/* Hover Overlay Removed as per request */}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-foreground/60 mb-4 line-clamp-3 text-sm">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-foreground/10 text-foreground/80 rounded text-xs font-medium border border-foreground/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-foreground/10 text-foreground/40 rounded text-xs font-medium border border-foreground/10">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-foreground/10">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg text-sm font-semibold transition-all duration-200"
                  >
                    <EyeIcon className="w-4 h-4" />
                    Details
                  </button>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-all duration-200"
                      title="Live Demo"
                    >
                      <LinkIcon className="w-5 h-5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg transition-all duration-200"
                      title="Source Code"
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-background border border-foreground/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-foreground/60">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-foreground/40 hover:text-foreground transition-colors duration-200"
                    >
                      <span className="text-3xl">×</span>
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground/80 mb-4">
                        Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="font-medium text-foreground/40 w-24">Status:</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                            {selectedProject.status}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-foreground/40 w-24">Category:</span>
                          <span className="text-foreground/80 capitalize">
                            {selectedProject.category}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-foreground/40 w-24">Timeline:</span>
                          <span className="text-foreground/80">
                            {formatDate(selectedProject.startDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground/80 mb-4">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  {selectedProject.highlights.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-foreground/80 mb-4">
                        Highlights
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-center text-foreground/60"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-foreground/10">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-primary text-background rounded-lg font-bold hover:opacity-90 transition-colors duration-200 shadow-xl shadow-primary/20 flex items-center gap-2"
                      >
                        <LinkIcon className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-foreground/20 text-foreground rounded-lg font-bold hover:bg-foreground/5 transition-colors duration-200 flex items-center gap-2"
                      >
                        <CodeBracketIcon className="w-5 h-5" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}