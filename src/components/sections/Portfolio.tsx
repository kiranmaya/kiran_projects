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
        return 'bg-green-900/50 text-green-300 border border-green-700';
      case 'in-progress':
        return 'bg-blue-900/50 text-blue-300 border border-blue-700';
      case 'planned':
        return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700';
      default:
        return 'bg-gray-800 text-gray-400';
    }
  };

  const getImageSrc = (project: Project) => {
    // Basic fallback logic if needed
    return project.image;
  };

  return (
    <section id="portfolio" className="py-20 bg-[#0a0a0a] text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Selected Works
          </h2>
          <motion.p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
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
                ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
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
              className="group bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video bg-gray-800">
                {/* Since we don't have real images yet, use a placeholder gradient or try to load the image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-600">
                  <span className="text-4xl">🚀</span>
                </div>

                <Image
                  src={getImageSrc(project)}
                  alt={project.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                  onError={(e) => {
                    // Hide image on error to show placeholder
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
                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full text-xs font-medium shadow-lg">
                      Featured
                    </span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200"
                    >
                      <EyeIcon className="w-6 h-6" />
                    </button>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-600/80 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/30"
                      >
                        <LinkIcon className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3 text-sm">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-medium border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs font-medium border border-gray-700">
                      +{project.technologies.length - 3}
                    </span>
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
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-[#111] border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-gray-400">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      <span className="text-3xl">×</span>
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-200 mb-4">
                        Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-500 w-24">Status:</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                            {selectedProject.status}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-500 w-24">Category:</span>
                          <span className="text-gray-300 capitalize">
                            {selectedProject.category}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-500 w-24">Timeline:</span>
                          <span className="text-gray-300">
                            {formatDate(selectedProject.startDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-200 mb-4">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-900/50 rounded-full text-sm font-medium"
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
                      <h3 className="text-lg font-semibold text-gray-200 mb-4">
                        Highlights
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-400"
                          >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-800">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition-colors duration-200 shadow-lg shadow-blue-500/20 flex items-center gap-2"
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
                        className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-bold hover:border-white hover:text-white transition-colors duration-200 flex items-center gap-2"
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