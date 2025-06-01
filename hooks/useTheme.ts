import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { Theme } from '../themes/themeType';

interface ThemeContextType {
  theme: Theme;
  activeThemeName: string;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};