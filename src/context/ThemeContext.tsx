'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, themes } from '@/data/Themes';

interface ThemeContextType {
    currentTheme: Theme;
    setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(
        themes.find(t => t.id === 'prism') || themes[0]
    );
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('site-theme');
        if (savedTheme) {
            const theme = themes.find((t) => t.id === savedTheme);
            if (theme) setCurrentTheme(theme);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Update CSS variables
        const root = document.documentElement;
        const { colors } = currentTheme;

        root.style.setProperty('--background', colors.background);
        root.style.setProperty('--foreground', colors.foreground);
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--primary-glow', colors.primaryGlow);
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--secondary-glow', colors.secondaryGlow);
        root.style.setProperty('--accent', colors.accent);
        root.style.setProperty('--card-bg', colors.cardBg);
        root.style.setProperty('--card-border', colors.cardBorder);

        // Set theme class for potential utility overrides
        themes.forEach(t => root.classList.remove(`theme-${t.id}`));
        root.classList.add(`theme-${currentTheme.id}`);

        // Set dark/light mode attribute
        root.setAttribute('data-theme', currentTheme.isDark ? 'dark' : 'light');

        localStorage.setItem('site-theme', currentTheme.id);
    }, [currentTheme, mounted]);

    const setTheme = (themeId: string) => {
        const theme = themes.find((t) => t.id === themeId);
        if (theme) setCurrentTheme(theme);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
