import type React from 'react';
import type { ITrackerMenuProps } from './menu.interface';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';

const TrackerMenu: React.FC<ITrackerMenuProps> = ({
  menuOptions,
  onSelect,
}) => {
  return (
    <div className="min-w-30 bg-(--light) flex-col flex rounded-sm shadow-(--toggle-shadow)">
      {menuOptions.map(({ icon: Icon, ...menu }) => (
        <button
          className="p-2 flex gap-1.5 hover:bg-(--primary-10) rounded-sm items-center cursor-pointer border-none outline-none justify-center"
          title={menu.label}
          key={menu.label}
          onMouseDown={() => onSelect({ icon: Icon, ...menu })}
        >
          {Icon && <Icon className="h-4 w-auto  text-(--dark)" />}
          <Typography
            label={menu.label}
            variant={typographyVariants.body_14_400}
            className="flex-1 text-left"
          />
        </button>
      ))}
    </div>
  );
};
export default TrackerMenu;
