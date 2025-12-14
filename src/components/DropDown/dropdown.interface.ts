export interface ITrackerDropDownProps {
  options: IOption[];
  value: IOption | null;
  onChange: (option: number) => void;
  className?: string;
  wrapperClassName?: string;
  label?: string;
  error?: string;
}

export interface IOption {
  value: number;
  label: string;
}
