export interface ITackerDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  wrapperClassName?: string;
  label?: string;
  error?: string;
  minDate?: Date;
  minTime?: Date;
  maxTime?: Date;
}
