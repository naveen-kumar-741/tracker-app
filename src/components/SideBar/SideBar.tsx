import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react';
import OpenModeIcon from '../../assets/open_mode.svg?react';
import CloseModeIcon from '../../assets/close_mode.svg?react';
import MiniLogo from '../../assets/mini_logo.svg?react';

import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';
import { SideBarMenu } from '../../constant';
import type { ISideBarMenu } from '../../interfaces/app.interface';
import { AppContext } from '../../providers/AppProvider';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPageDetails } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpand, setIsExpand] = useState<boolean>(true);

  const OnNavigation = (menu: ISideBarMenu) => {
    setCurrentPageDetails(menu);
    navigate(menu.route);
  };

  useEffect(() => {
    if (searchParams.get('expandSideBar')) {
      setIsExpand(true);
      searchParams.delete('expandSideBar');
      setSearchParams(searchParams);
    }
  }, [location]);

  return (
    <aside
      className={`h-full shadow-(--main-shadow) flex-col ${
        isExpand ? 'w-65' : 'w-18'
      } px-2.5 py-5 items-center gap-6 transition-all hidden md:flex z-1`}
    >
      {isExpand ? (
        <Logo className="h-12.5 w-auto" />
      ) : (
        <MiniLogo className="h-12.5 w-auto" />
      )}
      <div className="w-full h-0 border-b border-(--bg-dark-20)" />
      <section className="flex-1 flex flex-col w-full">
        {SideBarMenu.map(({ icon: Icon, ...menu }) => (
          <button
            className={`p-2.5 flex gap-2 ${
              location.pathname === menu.route ? 'bg-(--primary-10)' : ''
            } rounded-sm items-center cursor-pointer border-none outline-none justify-center`}
            onClick={() => OnNavigation({ icon: Icon, ...menu })}
            title={menu.label}
            key={menu.label}
          >
            <Icon className="h-4 w-auto" />
            {isExpand && (
              <Typography
                label={menu.label}
                variant={typographyVariants.body_16_400}
                className="flex-1 text-left"
              />
            )}
          </button>
        ))}
      </section>
      <section className="hidden md:flex justify-center items-center gap-2 w-full px-2">
        {isExpand && (
          <Typography
            label="Collapse"
            variant={typographyVariants.body_16_400}
            className="flex-1"
          />
        )}
        {isExpand ? (
          <OpenModeIcon
            className="h-6 w-auto cursor-pointer"
            onClick={() => setIsExpand(false)}
          />
        ) : (
          <CloseModeIcon
            className="h-6 w-auto cursor-pointer"
            onClick={() => setIsExpand(true)}
          />
        )}
      </section>
    </aside>
  );
};

export default SideBar;
