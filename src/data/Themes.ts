export interface Theme {
    id: string;
    name: string;
    flower: string;
    isDark: boolean;
    colors: {
        background: string;
        foreground: string;
        primary: string;
        primaryGlow: string;
        secondary: string;
        secondaryGlow: string;
        accent: string;
        cardBg: string;
        cardBorder: string;
    };
}

export const themes: Theme[] = [
    {
        id: 'rose',
        name: 'Royal Rose',
        flower: '🌹',
        isDark: true,
        colors: {
            background: '#0f0505',
            foreground: '#fce4e4',
            primary: '#e11d48',
            primaryGlow: 'rgba(225, 29, 72, 0.4)',
            secondary: '#fb7185',
            secondaryGlow: 'rgba(251, 113, 133, 0.4)',
            accent: '#f43f5e',
            cardBg: 'rgba(225, 29, 72, 0.05)',
            cardBorder: 'rgba(225, 29, 72, 0.2)',
        }
    },
    {
        id: 'lavender',
        name: 'Mystic Lavender',
        flower: '🪻',
        isDark: true,
        colors: {
            background: '#09050f',
            foreground: '#f5f3ff',
            primary: '#7c3aed',
            primaryGlow: 'rgba(124, 58, 237, 0.4)',
            secondary: '#a78bfa',
            secondaryGlow: 'rgba(167, 139, 250, 0.4)',
            accent: '#8b5cf6',
            cardBg: 'rgba(124, 58, 237, 0.05)',
            cardBorder: 'rgba(124, 58, 237, 0.2)',
        }
    },
    {
        id: 'sunflower',
        name: 'Golden Sunflower',
        flower: '🌻',
        isDark: true,
        colors: {
            background: '#0c0c05',
            foreground: '#fefce8',
            primary: '#eab308',
            primaryGlow: 'rgba(234, 179, 8, 0.4)',
            secondary: '#facc15',
            secondaryGlow: 'rgba(250, 204, 21, 0.4)',
            accent: '#fbbf24',
            cardBg: 'rgba(234, 179, 8, 0.05)',
            cardBorder: 'rgba(234, 179, 8, 0.2)',
        }
    },
    {
        id: 'cherry',
        name: 'Sakura Dream',
        flower: '🌸',
        isDark: true,
        colors: {
            background: '#1a0f12',
            foreground: '#fff1f2',
            primary: '#fb7185',
            primaryGlow: 'rgba(251, 113, 133, 0.4)',
            secondary: '#fecdd3',
            secondaryGlow: 'rgba(254, 205, 211, 0.4)',
            accent: '#fda4af',
            cardBg: 'rgba(251, 113, 133, 0.05)',
            cardBorder: 'rgba(251, 113, 133, 0.2)',
        }
    },
    {
        id: 'poppy',
        name: 'Crimson Poppy',
        flower: '🌺',
        isDark: true,
        colors: {
            background: '#0a0a0a',
            foreground: '#fafafa',
            primary: '#dc2626',
            primaryGlow: 'rgba(220, 38, 38, 0.4)',
            secondary: '#f87171',
            secondaryGlow: 'rgba(248, 113, 113, 0.4)',
            accent: '#ef4444',
            cardBg: 'rgba(220, 38, 38, 0.05)',
            cardBorder: 'rgba(220, 38, 38, 0.2)',
        }
    },
    {
        id: 'orchid',
        name: 'Vibrant Orchid',
        flower: '🪷',
        isDark: true,
        colors: {
            background: '#0f051a',
            foreground: '#fae8ff',
            primary: '#c026d3',
            primaryGlow: 'rgba(192, 38, 211, 0.4)',
            secondary: '#e879f9',
            secondaryGlow: 'rgba(232, 121, 249, 0.4)',
            accent: '#d946ef',
            cardBg: 'rgba(192, 38, 211, 0.05)',
            cardBorder: 'rgba(192, 38, 211, 0.2)',
        }
    },
    {
        id: 'cornflower',
        name: 'Azure Cornflower',
        flower: '🥣',
        isDark: true,
        colors: {
            background: '#05091a',
            foreground: '#eff6ff',
            primary: '#2563eb',
            primaryGlow: 'rgba(37, 99, 235, 0.4)',
            secondary: '#60a5fa',
            secondaryGlow: 'rgba(96, 165, 250, 0.4)',
            accent: '#3b82f6',
            cardBg: 'rgba(37, 99, 235, 0.05)',
            cardBorder: 'rgba(37, 99, 235, 0.2)',
        }
    },
    {
        id: 'lotus',
        name: 'Zen Lotus',
        flower: '🪷',
        isDark: false,
        colors: {
            background: '#fdf2f8',
            foreground: '#831843',
            primary: '#db2777',
            primaryGlow: 'rgba(219, 39, 119, 0.4)',
            secondary: '#f472b6',
            secondaryGlow: 'rgba(244, 114, 182, 0.4)',
            accent: '#ec4899',
            cardBg: 'rgba(219, 39, 119, 0.05)',
            cardBorder: 'rgba(219, 39, 119, 0.2)',
        }
    },
    {
        id: 'daisy',
        name: 'Sunny Daisy',
        flower: '🌼',
        isDark: false,
        colors: {
            background: '#ffffff',
            foreground: '#1c1917',
            primary: '#ca8a04',
            primaryGlow: 'rgba(202, 138, 4, 0.4)',
            secondary: '#facc15',
            secondaryGlow: 'rgba(250, 204, 21, 0.4)',
            accent: '#eab308',
            cardBg: 'rgba(202, 138, 4, 0.05)',
            cardBorder: 'rgba(202, 138, 4, 0.2)',
        }
    },
    {
        id: 'lily',
        name: 'Pure Lily',
        flower: '💮',
        isDark: false,
        colors: {
            background: '#f0fdf4',
            foreground: '#064e3b',
            primary: '#10b981',
            primaryGlow: 'rgba(16, 185, 129, 0.4)',
            secondary: '#34d399',
            secondaryGlow: 'rgba(52, 211, 153, 0.4)',
            accent: '#059669',
            cardBg: 'rgba(16, 185, 129, 0.05)',
            cardBorder: 'rgba(16, 185, 129, 0.2)',
        }
    },
    {
        id: 'midnight',
        name: 'Eclipse Dark',
        flower: '🌙',
        isDark: true,
        colors: {
            background: '#000000',
            foreground: '#ffffff',
            primary: '#3b82f6',
            primaryGlow: 'rgba(59, 130, 246, 0.4)',
            secondary: '#6366f1',
            secondaryGlow: 'rgba(99, 102, 241, 0.4)',
            accent: '#ffffff',
            cardBg: 'rgba(255, 255, 255, 0.05)',
            cardBorder: 'rgba(255, 255, 255, 0.1)',
        }
    },
    {
        id: 'prism',
        name: 'Prism Light',
        flower: '☀️',
        isDark: false,
        colors: {
            background: '#ffffff',
            foreground: '#000000',
            primary: '#2563eb',
            primaryGlow: 'rgba(37, 99, 235, 0.4)',
            secondary: '#4f46e5',
            secondaryGlow: 'rgba(79, 70, 229, 0.4)',
            accent: '#000000',
            cardBg: 'rgba(0, 0, 0, 0.05)',
            cardBorder: 'rgba(0, 0, 0, 0.1)',
        }
    }
];
