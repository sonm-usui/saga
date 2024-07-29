import React from 'react';
import { useThemeModes } from '../../../hook/useThemeModes';
import logoImg from '../../../assets/images/pngs/coalapay-logo.png';
import logoImgDarkMode from '../../../assets/images/pngs/logo-dark.png';
import './Logo.scss';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const themes = useThemeModes();

  const renderLogoAccordingTheme = () => {
    if (themes.isPurpleMode || themes.isDarkMode) {
      return <img src={logoImgDarkMode} id="logo-header" alt="logo" />;
    }
    return <img src={logoImg} alt="logo" />;
  };

  return <div className={`logo ${className}`}>{renderLogoAccordingTheme()}</div>;
};
