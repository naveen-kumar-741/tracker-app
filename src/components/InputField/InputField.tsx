import { forwardRef } from 'react';
import { typographyVariants } from '../Typography/typo.interface';
import Typography from '../Typography/Typography';
import type { IInputProps } from './input.interface';

const InputField = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      className = '',
      icon: Icon,
      error,
      wrapperClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1 px-1 ${wrapperClassName}`}>
        {label && (
          <label htmlFor={props.id}>
            <Typography
              label={label}
              variant={typographyVariants.caption_12_500}
              className="text-(--dark)"
            />
          </label>
        )}
        <input
          className={`text-(--dark) border border-(--bg-dark-10) rounded-sm text-sm px-2 py-1 w-full outline-none focus:border-(--bg-dark-20) focus-visible:border-(--bg-dark-20)! ${className}`}
          autoComplete="off"
          ref={ref}
          {...props}
        />
        {error && (
          <Typography
            label={error}
            variant={typographyVariants.caption_12_400}
            className="text-red-500"
          />
        )}
      </div>
    );
  }
);

export default InputField;
