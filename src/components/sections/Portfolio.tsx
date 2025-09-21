'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarIcon,
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
  { value: 'web', label: 'Web Apps' },
  { value: 'game', label: 'Games' },
  
];

export default function Portfolio({ projects }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Debug logging
  console.log('Portfolio component rendered');
  console.log('Projects prop:', projects);
  console.log('Projects length:', projects?.length || 0);
  console.log('Selected category:', selectedCategory);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(
        project =>
          project.category.toLowerCase() ===
          (selectedCategory as string).toLowerCase()
      );

  console.log('Filtered projects length:', filteredProjects?.length || 0);
  console.log('Filtered projects:', filteredProjects);

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
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

// Resolve image path for a project using public/images as fallback
const getImageSrc = (project: Project) => {
  // If the project already points to /images, use it
  if (project.image && project.image.startsWith('/images')) {
    return project.image;
  }

  // If image uses /projects/ path, try the equivalent /images/ path
  if (project.image && project.image.startsWith('/')) {
    return project.image.replace(/^\/projects\//, '/images/');
  }

  // Fallback: try using the project title as filename in public/images (best-effort)
  // Example: title "Ace Strike" -> "/images/Ace%20Strike.jpg"
  const titlePath = `/images/${encodeURIComponent(project.title)}.jpg`;
  return titlePath;
};
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my recent projects, featuring web applications, games,
            and interactive experiences I've built.
          </p>
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
                console.log('Filter button clicked:', filter.value);
                console.log('Available projects by category:');
                if (projects) {
                  const categoryCount = projects.reduce((acc, project) => {
                    acc[project.category] = (acc[project.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);
                  console.log('Category counts:', categoryCount);
                }
                setSelectedCategory(filter.value);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === filter.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
               
               
                <div className="aspect-video bg-gray-100 overflow-hidden relative">
                  <img
                    src={getImageSrc(project)}
                    alt={project.title}
                    className="w-full h-full object-cover bg-transparent block relative z-10"
                    onLoad={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      console.log(
                        `Image loaded for project ${project.id}:`,
                        target.src,
                        'naturalWidth:',
                        target.naturalWidth,
                        'naturalHeight:',
                        target.naturalHeight,
                        'computed display:',
                        window.getComputedStyle(target).display,
                        'computed opacity:',
                        window.getComputedStyle(target).opacity
                      );
                      if (target.naturalWidth === 0 || target.naturalHeight === 0) {
                        console.warn(`Image for project ${project.id} has zero natural size`, target.src);
                      }
                      // Check if image becomes dark after 100ms
                      setTimeout(() => {
                        const computedStyle = window.getComputedStyle(target);
                        console.log(
                          `Image ${project.id} after 100ms - opacity:`,
                          computedStyle.opacity,
                          'filter:',
                          computedStyle.filter,
                          'background-color:',
                          computedStyle.backgroundColor
                        );
                      }, 100);
                    }}
                    onError={async (e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      console.error(`Image failed for project ${project.id}:`, target.src);
                      // Try fallback (profile) once
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = '1';
                        target.src = '/images/kiranphoto.jpg';
                        console.info(`Falling back to /images/kiranphoto.jpg for project ${project.id}`);
                      } else {
                        // Best-effort probe of the resource to capture HTTP status (may be blocked by CORS)
                        try {
                          const resp = await fetch(target.src, { method: 'HEAD' });
                          console.info(`HEAD ${target.src} status:`, resp.status);
                        } catch (err) {
                          console.warn('Fetch probe failed for', target.src, err);
                        }
                      }
                    }}
                  />
                </div>
               

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <LinkIcon className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <CodeBracketIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center text-gray-500 text-sm">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>
                    {formatDate(project.startDate)}
                    {project.endDate && ` - ${formatDate(project.endDate)}`}
                  </span>
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-gray-600">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Project Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-gray-700">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                            {selectedProject.status}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Category:</span>
                          <span className="ml-2 text-gray-600 capitalize">
                            {selectedProject.category}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Duration:</span>
                          <span className="ml-2 text-gray-600">
                            {formatDate(selectedProject.startDate)}
                            {selectedProject.endDate && ` - ${formatDate(selectedProject.endDate)}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  {selectedProject.highlights.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Key Highlights
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start text-gray-700">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                      >
                        View Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        View Code
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                      >
                        Live Site
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