// AboutUsThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AboutUsThemeContextType = {
  aboutUsTheme: string;
  setAboutUsTheme: (theme: string) => void;
};

const AboutUsThemeContext = createContext<AboutUsThemeContextType | undefined>(undefined);

export const useAboutUsTheme = (): AboutUsThemeContextType => {
  const context = useContext(AboutUsThemeContext);
  if (!context) {
    throw new Error('useAboutUsTheme must be used within a AboutUsThemeProvider');
  }
  return context;
};

interface AboutUsThemeProviderProps {
  children: ReactNode;
}

export const AboutUsThemeProvider: React.FC<AboutUsThemeProviderProps> = ({ children }) => {
  const [aboutUsTheme, setAboutUsTheme] = useState<string>('default'); // Default theme

  return (
    <AboutUsThemeContext.Provider value={{ aboutUsTheme, setAboutUsTheme }}>
      {children}
    </AboutUsThemeContext.Provider>
  );
};
