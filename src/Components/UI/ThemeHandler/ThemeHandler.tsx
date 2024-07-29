/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useThemeModes } from '../../../hook/useThemeModes';
import './ThemeHandler.scss';

export const ThemeHandler: React.FC = () => {
  const themes = useThemeModes();

  useEffect(() => {
    const headerElement: any = document.querySelector('.header');
    const defaultLayout: any = document.querySelector('.default-layout');

    if (themes.isDarkMode) {
      headerElement?.classList.add('dark');
    } else {
      headerElement?.classList.remove('dark');
    }

    if (themes.isPurpleMode) {
      headerElement?.classList.add('purple');
      defaultLayout?.classList.add('purple');
    } else {
      headerElement?.classList.remove('purple');
      defaultLayout?.classList.remove('purple');
    }
  }, [document, themes]);

  return <></>;
};
