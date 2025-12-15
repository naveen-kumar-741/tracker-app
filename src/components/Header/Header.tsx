import React, { useContext, useEffect, useRef, useState } from 'react';
import Logo from '../../assets/logo.svg?react';
import HamburgerIcon from '../../assets/hamburger.svg?react';
import { AppContext } from '../../providers/AppProvider';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';
import { SideBarMenu } from '../../constant';
import { useNavigate } from 'react-router-dom';
import type { ISideBarMenu } from '../../interfaces/app.interface';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const { setCurrentPageDetails } = useContext(AppContext);
  const { currentPageDetails } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const OnNavigation = (menu: ISideBarMenu) => {
    setCurrentPageDetails(menu);
    navigate(menu.route);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 w-full shadow-(--header-shadow) p-2.5 md:p-5 flex gap-2 justify-between items-center bg-(--light) z-10"
    >
      <div className="w-full flex items-center justify-between">
        <Logo className="w-auto h-10 md:hidden" />
        <HamburgerIcon
          className="w-6 h-6 md:hidden"
          onClick={() => setShowMenu((prev) => !prev)}
        />
        <Typography
          label={currentPageDetails?.label ?? ''}
          variant={typographyVariants.heading_24_700}
          className="hidden md:block"
        />
        <ThemeToggle />
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
