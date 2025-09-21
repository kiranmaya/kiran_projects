'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bars3Icon,
  BriefcaseIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
// Simple utility function for combining class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: HomeIcon },
  { id: 'about', label: 'About', href: '#about', icon: UserIcon },
  { id: 'skills', label: 'Skills', href: '#skills', icon: CodeBracketIcon },
  { id: 'experience', label: 'Experience', href: '#experience', icon: BriefcaseIcon },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio', icon: CodeBracketIcon },
  { id: 'contact', label: 'Contact', href: '#contact', icon: EnvelopeIcon },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /**
   * Smooth-scroll to an in-page anchor.
   * If the target element isn't found (likely because we're on a different route),
   * navigate to the home route first and then attempt to scroll.
   */
  const scrollToSection = async (href: string) => {
    // Normalize selector (ensure it starts with '#')
    const selector = href.startsWith('#') ? href : `#${href}`;
    // Try to find element on current page
    const element = document.querySelector(selector);
    // Debug log to validate behavior at runtime
    // eslint-disable-next-line no-console
    console.log('Header.scrollToSection', selector, !!element, 'pathname=', pathname);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }

    // If not on root, navigate to root first and then scroll
    if (pathname !== '/') {
      try {
        await router.push('/');
        // Give browser a tick to render the home content before querying
        setTimeout(() => {
          const el = document.querySelector(selector);
          // eslint-disable-next-line no-console
          console.log('Header.postNavScroll', selector, !!el);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          setIsMenuOpen(false);
        }, 120);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Navigation to home failed before scrolling to', selector, err);
        setIsMenuOpen(false);
      }
    } else {
      // Element wasn't found but we're on home — simply close menu
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-xl font-bold text-gray-900">Portfolio</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                      'text-gray-700 hover:text-blue-600 hover:bg-blue-50',
                      'focus:outline-none focus:text-blue-600 focus:bg-blue-50'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.href)}
                      className={cn(
                        'flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                        'text-gray-700 hover:text-blue-600 hover:bg-blue-50',
                        'focus:outline-none focus:text-blue-600 focus:bg-blue-50'
                      )}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}