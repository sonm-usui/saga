import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import {
  WHITE_LIST_DARK_THEME_PAGES,
  WHITE_LIST_PURPLE_THEME_PAGES
} from '../constants/mode-themes';
import { appPaths } from '../constants';
import { useAboutUsTheme } from '../context/AboutUsThemeContext';

export const useThemeModes = () => {
  const location = useLocation();
  const { aboutUsTheme } = useAboutUsTheme();

  const themes = useMemo(() => {
    if (location.pathname === appPaths.about.path) {
      return {
        isDarkMode: aboutUsTheme === 'dark',
        isPurpleMode: aboutUsTheme === 'purple',
        isDefaultMode: aboutUsTheme === 'default'
      };
    }
    const isDarkMode = WHITE_LIST_DARK_THEME_PAGES.some((path) => {
      return matchPath(location.pathname, path);
    });

    const isPurpleMode = WHITE_LIST_PURPLE_THEME_PAGES.some((path) => {
      return matchPath(path, location.pathname);
    });

    const isDefaultMode = !isDarkMode && !isPurpleMode;

    return { isDarkMode, isPurpleMode, isDefaultMode };
  }, [location, aboutUsTheme]);

  return themes;
};
