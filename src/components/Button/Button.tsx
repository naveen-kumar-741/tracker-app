import { forwardRef } from 'react';
import { typographyVariants } from '../Typography/typo.interface';
import Typography from '../Typography/Typography';
import type { IButtonProps } from './button.interface';

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ label, className, icon: Icon, ...props }, ref) => {
    return (
      <button
        className={`bg-(--primary-75) px-2 py-1.5 rounded-sm h-fit flex items-center justify-center gap-0.5 cursor-pointer text-white ${className}`}
        ref={ref}
        {...props}
      >
        {Icon}
        <Typography
          label={label}
          variant={typographyVariants.body_14_500}
          className="text-inherit"
        />
      </button>
    );
  }
);

export default Button;
