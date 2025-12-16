export interface ITrackerDropDownProps {
  options: IOption[];
  value: IOption | null;
  onChange: (option: number | undefined) => void;
  className?: string;
  wrapperClassName?: string;
  label?: string;
  error?: string;
  isClearable?: boolean;
}

export interface IOption {
  value: number;
  label: string;
}
