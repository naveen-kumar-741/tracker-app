import type { ButtonHTMLAttributes, ReactElement } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: ReactElement;
}
