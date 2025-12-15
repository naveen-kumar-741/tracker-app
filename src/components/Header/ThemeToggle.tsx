import type React from 'react';

import LightMode from '../../assets/light_mode.svg?react';
import DarkMode from '../../assets/dark_mode.svg?react';
import { useTheme } from '../../providers/ThemeProvider';
import type { ThemeToggleProps } from './header.interface';

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = 'hidden md:flex',
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={`rounded-sm shadow-(--toggle-shadow) cursor-pointer overflow-hidden ${className}`}
    >
      <LightMode
        className="w-8 h-8 p-2"
        style={{
          background: `var(${theme === 'light' ? '--bg-dark-10' : '--light'})`,
        }}
        role="button"
        onClick={() => setTheme('light')}
      />
      <DarkMode
        className="w-8 h-8 p-2"
        style={{
          background: `var(${theme === 'dark' ? '--bg-dark-10' : '--light'})`,
        }}
        role="button"
        onClick={() => setTheme('dark')}
      />
    </div>
  );
};

export default ThemeToggle;
