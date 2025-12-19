import type React from 'react';
import Select from 'react-select';
import type { ITrackerDropDownProps } from './dropdown.interface';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';

const TrackerDropDown: React.FC<ITrackerDropDownProps> = ({
  label,
  error,
  options,
  value,
  onChange,
  wrapperClassName = '',
  className = '',
  isClearable = false,
  isDisabled = false,
}) => {
  return (
    <div
      className={`flex flex-col gap-1 px-1 ${
        isDisabled ? 'opacity-50' : ''
      } ${wrapperClassName}`}
    >
      {label && (
        <label>
          <Typography
            label={label}
            variant={typographyVariants.caption_12_500}
            className="text-(--dark)"
          />
        </label>
      )}
      <Select
        options={options}
        value={value}
        onChange={(option) => onChange(option?.value ?? 0)}
        placeholder="Select tag"
        isClearable={isClearable}
        className={className}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldBlockScroll={true}
        closeMenuOnScroll={false}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 60,
          }),
        }}
        classNames={{
          control: () =>
            'h-7.5 min-h-7.5! text-(--dark) border border-(--bg-dark-10)! rounded-sm text-sm w-full outline-none focus:border-(--bg-dark-20)! focus-visible:border-(--bg-dark-20)! bg-transparent!',
          indicatorsContainer: () => 'h-7.5',
          valueContainer: () => 'pt-0!',
          option: () => 'py-1! px-2!',
          singleValue: () => ' text-(--dark)!',
        }}
        isDisabled={isDisabled}
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

export default TrackerDropDown;
