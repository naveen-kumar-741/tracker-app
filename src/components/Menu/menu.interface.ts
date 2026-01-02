import type { FC, SVGProps } from 'react';

export interface ITrackerMenuProps {
  menuOptions: MenuOption[];
  onSelect: (option: MenuOption) => void;
  showIcon?: boolean;
}

export interface MenuOption {
  label: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  color?: string;
}
