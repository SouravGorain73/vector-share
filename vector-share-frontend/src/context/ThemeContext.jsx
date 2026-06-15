import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to dark mode as requested
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('vectorshare-theme');
    if (savedTheme) {
      return savedTheme;
    }
    return 'dark'; // Default to dark mode
  });

  useEffect(() => {
    localStorage.setItem('vectorshare-theme', theme);
    
    // Update body class
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Set color-scheme for native elements like scrollbars
    root.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
