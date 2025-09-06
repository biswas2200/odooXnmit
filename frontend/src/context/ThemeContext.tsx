import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get theme from localStorage or default to system
    const storedTheme = localStorage.getItem('ecofinds_theme') as Theme;
    return storedTheme || 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Update actual theme based on system preference
  useEffect(() => {
    const updateActualTheme = () => {
      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setActualTheme(systemPrefersDark ? 'dark' : 'light');
      } else {
        setActualTheme(theme);
      }
    };

    updateActualTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateActualTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (actualTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [actualTheme]);

  // Set theme function
  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme);
    localStorage.setItem('ecofinds_theme', newTheme);
  };

  // Toggle theme function
  const toggleTheme = (): void => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme utility functions
export const themeUtils = {
  // Get theme-aware class names
  getThemeClasses: (lightClass: string, darkClass: string): string => {
    return `${lightClass} dark:${darkClass}`;
  },

  // Get theme-aware colors
  getThemeColors: (lightColor: string, darkColor: string): string => {
    return `${lightColor} dark:${darkColor}`;
  },

  // Check if current theme is dark
  isDark: (actualTheme: 'light' | 'dark'): boolean => {
    return actualTheme === 'dark';
  },

  // Get theme icon
  getThemeIcon: (theme: Theme): string => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '☀️';
    }
  },

  // Get theme label
  getThemeLabel: (theme: Theme): string => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'Light';
    }
  },
};

// Theme-aware component wrapper
export const withTheme = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { actualTheme } = useTheme();
    return <Component {...props} theme={actualTheme} />;
  };
};

// Theme toggle button component
export const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

  const themes: Theme[] = ['light', 'dark', 'system'];
  const currentIndex = themes.indexOf(theme);

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={`Current theme: ${themeUtils.getThemeLabel(theme)}`}
    >
      <span className="text-lg">
        {themeUtils.getThemeIcon(theme)}
      </span>
    </button>
  );
};
