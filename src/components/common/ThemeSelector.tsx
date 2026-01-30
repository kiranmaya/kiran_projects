'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { themes } from '@/data/Themes';
import { motion, AnimatePresence } from 'framer-motion';
import { PaintBrushIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function ThemeSelector() {
    const { currentTheme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-colors"
                title="Change Theme"
            >
                <span className="text-lg">{currentTheme.flower}</span>
                <span className="hidden sm:inline text-sm font-medium">{currentTheme.name}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-64 z-50 rounded-2xl bg-background border border-foreground/10 shadow-2xl overflow-hidden backdrop-blur-xl"
                        >
                            <div className="p-2 grid grid-cols-1 gap-1">
                                <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground/50">
                                    Flower Themes
                                </div>
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => {
                                            setTheme(theme.id);
                                            setIsOpen(false);
                                        }}
                                        className={`
                      flex items-center justify-between w-full px-3 py-2 rounded-xl transition-all
                      ${currentTheme.id === theme.id
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-foreground/5 text-foreground/80 hover:text-foreground'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{theme.flower}</span>
                                            <span className="text-sm font-medium">{theme.name}</span>
                                        </div>
                                        {currentTheme.id === theme.id && (
                                            <CheckIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
