import type { InputHTMLAttributes, ReactElement } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactElement;
  error?: string;
  wrapperClassName?: string;
}
