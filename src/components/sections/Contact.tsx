'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircleIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { ContactForm as ContactFormType, PersonalInfo } from '@/types';
import { CharacterSplit } from '@/components/ui/TextAnimation';

interface ContactProps {
  personalInfo: PersonalInfo;
}

export default function Contact({ personalInfo }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send data to API route
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optional: Add error state UI here if desired, currently just logging
      alert('Failed to send message. Please try again later.'); // Simple fallback
    } finally {
      setIsSubmitting(false);
    }

    // State updates handled in try/catch block

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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

  // Convert socialLinks object to array for easier mapping
  const socialLinksArray = Object.entries(personalInfo.socialLinks || {}).map(([platform, url]) => ({
    platform,
    url
  })).filter(link => link.url);

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            I&apos;m always interested in AI collaborations, Next.js projects, or just a tech chat.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-6">
                  Let&apos;s Connect
                </h3>
                <p className="text-gray-400 mb-8">
                  Whether you have an idea for an agentic workflow, a game concept, or a web platform,
                  I&apos;d love to hear from you.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-sm hover:border-gray-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mr-4">
                    <EnvelopeIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-200">Email</span>
                    <motion.a
                      href={`mailto:${personalInfo.email}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 block mt-1"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {personalInfo.email}
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-sm hover:border-gray-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mr-4">
                    <PhoneIcon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-200">Phone</span>
                    <motion.a
                      href={`tel:${personalInfo.phone}`}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200 block mt-1"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {personalInfo.phone}
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-sm hover:border-gray-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mr-4">
                    <MapPinIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-200">Location</span>
                    <motion.p
                      className="text-gray-400 mt-1"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {personalInfo.location}
                    </motion.p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h4 className="font-medium text-gray-200 mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinksArray.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-blue-400 hover:border-blue-400 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm font-medium uppercase">
                        {link.platform[0]}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-100 mb-6">
                  Send a Message
                </h3>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-100 mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-gray-400">
                        Thank you for reaching out. I&apos;ll get back to you soon!
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-400 mb-2"
                          >
                            Name <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-400 mb-2"
                          >
                            Email <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-400 mb-2"
                        >
                          Subject <span className="text-blue-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
                          placeholder="Project Inquiry"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-400 mb-2"
                        >
                          Message <span className="text-blue-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none placeholder-gray-600"
                          placeholder="How can I help you?"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}