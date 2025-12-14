import React, { useContext, useState } from 'react';
import Logo from '../../assets/logo.svg?react';
import HamburgerIcon from '../../assets/hamburger.svg?react';
import LightMode from '../../assets/light_mode.svg?react';
import DarkMode from '../../assets/dark_mode.svg?react';
import { AppContext } from '../../providers/AppProvider';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';
import { useTheme } from '../../providers/ThemeProvider';
import { SideBarMenu } from '../../constant';
import { useNavigate } from 'react-router-dom';
import type { ISideBarMenu } from '../../interfaces/app.interface';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentPageDetails } = useContext(AppContext);
  const { currentPageDetails } = useContext(AppContext);
  const { theme, setTheme } = useTheme();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const OnNavigation = (menu: ISideBarMenu) => {
    setCurrentPageDetails(menu);
    navigate(menu.route);
  };

  return (
    <header className="sticky top-0 left-0 w-full shadow-(--header-shadow) p-2.5 sm:p-5 flex gap-2 justify-between items-center bg-(--light)">
      <div className=" w-full flex items-center justify-between">
        <Logo className="w-auto h-10 sm:hidden" />
        <HamburgerIcon
          className="w-6 h-6 sm:hidden"
          onClick={() => setShowMenu((prev) => !prev)}
        />
        <Typography
          label={currentPageDetails?.label ?? ''}
          variant={typographyVariants.heading_24_700}
          className="hidden sm:block"
        />
        <div className="rounded-sm hidden sm:flex shadow-(--toggle-shadow) cursor-pointer overflow-hidden">
          <LightMode
            className="w-8 h-8 p-2"
            style={{
              background: `var(${
                theme === 'light' ? '--bg-dark-10' : '--light'
              })`,
            }}
            role="button"
            onClick={() => setTheme('light')}
          />
          <DarkMode
            className="w-8 h-8 p-2"
            style={{
              background: `var(${
                theme === 'dark' ? '--bg-dark-10' : '--light'
              })`,
            }}
            role="button"
            onClick={() => setTheme('dark')}
          />
        </div>
      </div>
      <div
        className={`${
          showMenu ? 'h-fit p-2.5 shadow-(--header-shadow)' : 'h-0'
        }  w-full absolute top-full left-0 transition-all bg-(--light) flex gap-2 overflow-hidden`}
      >
        {SideBarMenu.map(({ icon: Icon, ...menu }) => (
          <button
            className={`p-2.5 h-fit flex flex-col flex-1 gap-2 ${
              location.pathname === menu.route ? 'bg-(--primary-10)' : ''
            } rounded-sm items-center cursor-pointer border-none outline-none justify-center`}
            onClick={() => OnNavigation({ icon: Icon, ...menu })}
            title={menu.label}
            key={menu.label}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <Typography
              label={menu.label}
              variant={typographyVariants.body_14_500}
              className="flex-1 text-left"
            />
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
