export interface ICountDownProps {
  dateTime: string;
  size?: number;
  pausedTimes?: IPausedTime[];
  running?: boolean;
  className?: string;
}

export interface ICubeProps {
  size: number;
  units: number;
  rotation: number;
  suffix?: string;
  show?: boolean;
}

export interface IUnitsState<T = number> {
  seconds: T;
  minutes: T;
  hours: T;
  days: T;
  months: T;
  years: T;
}

export interface IPausedTime {
  start: string;
  end?: string;
}
