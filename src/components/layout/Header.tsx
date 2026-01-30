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
import ThemeSelector from '../common/ThemeSelector';

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
  { id: 'skills', label: 'Skills', href: '#skills', icon: CodeBracketIcon },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio', icon: CodeBracketIcon },
  { id: 'experience', label: 'Experience', href: '#experience', icon: BriefcaseIcon },
  { id: 'contact', label: 'Contact', href: '#contact', icon: EnvelopeIcon },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = async (href: string) => {
    const selector = href.startsWith('#') ? href : `#${href}`;
    const element = document.querySelector(selector);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }

    if (pathname !== '/') {
      try {
        await router.push('/');
        setTimeout(() => {
          const el = document.querySelector(selector);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          setIsMenuOpen(false);
        }, 300); // Increased timeout slightly for reliability
      } catch (err) {
        setIsMenuOpen(false);
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <h1 className="text-xl font-bold text-foreground tracking-widest uppercase">
              Kiran<span className="text-primary">.Dev</span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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
                      'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                      'text-foreground/70 hover:text-primary hover:bg-foreground/5',
                      'focus:outline-none focus:text-primary focus:bg-foreground/5'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
            <div className="h-6 w-px bg-foreground/10 mx-2" />
            <ThemeSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeSelector />
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/5 focus:outline-none"
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
              className="md:hidden bg-background border-t border-foreground/10"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
                        'text-foreground/70 hover:text-primary hover:bg-foreground/5',
                        'focus:outline-none focus:text-primary focus:bg-foreground/5'
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
