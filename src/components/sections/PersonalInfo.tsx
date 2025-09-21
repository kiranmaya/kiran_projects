'use client';

import { motion } from 'framer-motion';
import {
  ArrowDownIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { PersonalInfo as PersonalInfoType } from '@/types';

interface PersonalInfoProps {
  data: PersonalInfoType;
}

export default function PersonalInfo({ data }: PersonalInfoProps) {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Avatar */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {data.avatar ? (
                  <img
                    src={data.avatar}
                    alt={`${data.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-gray-700">
                    {data.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {data.name}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-6">
              {data.title}
            </p>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {data.bio}
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="w-5 h-5 mr-2 text-blue-500" />
              <span>{data.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <EnvelopeIcon className="w-5 h-5 mr-2 text-blue-500" />
              <a
                href={`mailto:${data.email}`}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {data.email}
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <PhoneIcon className="w-5 h-5 mr-2 text-blue-500" />
              <a
                href={`tel:${data.phone}`}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {data.phone}
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-12">
            {data.socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">{link.platform[0]}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => {
                const element = document.querySelector('#portfolio');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button
              onClick={() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
           
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}