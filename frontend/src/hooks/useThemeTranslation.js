import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

export const useThemeTranslation = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const translate = (key, options = {}) => {
    const specificKey = `${key}.${theme}`;
    
    // Check i18n instance for the themed version first
    return i18n.exists(specificKey) 
      ? t(specificKey, options) 
      : t(key, options);
  };

  return { 
    t: translate, 
    i18n,
    currentTheme: theme 
  };
};