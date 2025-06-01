import { createContext, ReactNode, useMemo, useState } from "react";
import { Theme } from "./themeType";
import { nebulaCorporateTheme } from "./nebulaCorporateTheme";

type ThemeName = 'nebulaCorporateTheme'

// A map to store all available themes
const themes: Record<ThemeName, Theme> = {
  nebulaCorporateTheme: nebulaCorporateTheme,
};

interface ThemeContextType {
  theme: Theme;
  activeThemeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialThemeName?: ThemeName; // Allow consumers to specify initial theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialThemeName = 'nebulaCorporateTheme' }) => {
  const [activeThemeName, setActiveThemeName] = useState<ThemeName>(initialThemeName);

  // Get the current theme object from the map
  const theme = useMemo(() => themes[activeThemeName], [activeThemeName]);

  // Function to change the theme
  const setTheme = (themeName: ThemeName) => {
    if (themes[themeName]) {
      setActiveThemeName(themeName);
    } else {
      console.warn(`Theme "${themeName}" not found. Falling back to default.`);
      setActiveThemeName(initialThemeName);
    }
  };

  const contextValue = useMemo(() => ({
    theme,
    activeThemeName,
    setTheme,
  }), [theme, activeThemeName, setTheme]); // Dependencies for useMemo

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};