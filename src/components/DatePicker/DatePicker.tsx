import type React from 'react';
import type { ITackerDatePickerProps } from './datepicker.interface';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';
import DatePicker from 'react-datepicker';

const TackerDatePicker: React.FC<ITackerDatePickerProps> = ({
  label,
  error,
  value,
  onChange,
  wrapperClassName = '',
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 px-1 ${wrapperClassName}`}>
      {label && (
        <label>
          <Typography
            label={label}
            variant={typographyVariants.caption_12_500}
            className="text-(--dark)"
          />
        </label>
      )}
      <DatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select date & time"
        wrapperClassName="h-7.5"
        className={`text-(--dark) border border-(--bg-dark-10) rounded-sm text-sm px-2 py-1 w-full outline-none focus:border-(--bg-dark-20) focus-visible:border-(--bg-dark-20)! ${className}`}
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
};
export default TackerDatePicker;
