import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const themes = [
    { id: 'system', icon: 'desktop_windows', label: 'Sistema' },
    { id: 'light', icon: 'light_mode', label: 'Claro' },
    { id: 'dark', icon: 'dark_mode', label: 'Oscuro' },
];

export default function ThemeToggle() {
    const [theme, setTheme] = useState('system');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'system';
        setTheme(storedTheme);
        setMounted(true);
    }, []);

    const reflectTheme = (newTheme) => {
        const root = document.documentElement;
        let effectiveTheme = newTheme;

        if (typeof window === 'undefined') return;

        if (newTheme === 'system') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        // Remove all possible theme classes
        root.classList.remove('light', 'dark', 'theme-midnight', 'theme-amoled');

        // Add the specific theme class
        root.classList.add(effectiveTheme);
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        reflectTheme(newTheme);
    };

    // System change listener
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                reflectTheme('system');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    if (!mounted) return null;

    return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full p-1 flex items-center gap-1 shadow-sm transition-colors duration-300">
            {themes.map((t) => {
                const isActive = theme === t.id;
                return (
                    <button
                        key={t.id}
                        onClick={() => handleThemeChange(t.id)}
                        className={`relative z-10 flex items-center justify-center p-1.5 rounded-full transition-all duration-300 ${isActive
                            ? 'text-primary'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-gray-100/50 dark:hover:bg-white/5'
                            }`}
                        aria-label={t.label}
                        title={t.label}
                    >
                        <span className="material-symbols-outlined text-[18px] relative z-20">
                            {t.icon}
                        </span>
                        {isActive && (
                            <motion.div
                                layoutId="theme-active-indicator"
                                className="absolute inset-0 bg-[var(--color-background)] rounded-full shadow-sm border border-[var(--color-border)] z-10"
                                initial={false}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
