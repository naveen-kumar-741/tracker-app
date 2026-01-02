import dayjs from 'dayjs';
import type {
  IPausedTime,
  IUnitsState,
} from '../components/CountDown/countdown.interface';
import type { PositionType } from '../components/Popover/popover.interface';

export const NextUnitMap = new Map<keyof IUnitsState, keyof IUnitsState>([
  ['seconds', 'minutes'],
  ['minutes', 'hours'],
  ['hours', 'days'],
  ['days', 'months'],
  ['months', 'years'],
  ['years', 'years'],
]);

export const MaxUnitMap = new Map<keyof IUnitsState, number>([
  ['seconds', 60],
  ['minutes', 60],
  ['hours', 24],
  ['months', 12],
  ['years', 100],
]);

export const getMaxUnit = (date: string): IUnitsState => {
  return {
    seconds: MaxUnitMap.get('seconds') ?? 0,
    minutes: MaxUnitMap.get('minutes') ?? 0,
    hours: MaxUnitMap.get('hours') ?? 0,
    days: dayjs(date).daysInMonth() ?? 30,
    months: MaxUnitMap.get('months') ?? 0,
    years: MaxUnitMap.get('years') ?? 0,
  };
};

export const getUnitInterval = (date: string, unitFor: keyof IUnitsState) => {
  switch (unitFor) {
    case 'seconds':
      return 1000;

    case 'minutes':
      return 60 * 1000;

    case 'hours':
      return 60 * 60 * 1000;

    case 'days':
      return 24 * 60 * 60 * 1000;

    case 'months':
      return dayjs(date).daysInMonth() * 24 * 60 * 60 * 1000;

    case 'years':
      return 12 * 31 * 24 * 60 * 60 * 1000;

    default:
      return Infinity;
  }
};

export const getCalendarDiffFromNow = (
  targetDate: string,
  pausedTimes: IPausedTime[] = []
): IUnitsState => {
  let start = dayjs();
  let end = dayjs(targetDate);

  // Ensure start is always before end
  if (end.isBefore(start)) {
    [start, end] = [end, start];
  }

  let pausedMs = 0;

  for (const pause of pausedTimes) {
    const pauseStart = dayjs(pause.start);
    const pauseEnd = dayjs(pause.end);

    // Ignore invalid or out-of-range pauses
    if (pauseEnd.isBefore(pauseStart)) continue;

    // Clamp pause range within start ↔ end
    const effectiveStart = pauseStart.isBefore(start) ? start : pauseStart;
    const effectiveEnd = pauseEnd.isAfter(end) ? end : pauseEnd;

    if (effectiveEnd.isAfter(effectiveStart)) {
      pausedMs += effectiveEnd.diff(effectiveStart);
    }
  }

  // Apply pause reduction
  end = end.subtract(pausedMs, 'millisecond');

  const years = end.diff(start, 'year');
  start = start.add(years, 'year');

  const months = end.diff(start, 'month');
  start = start.add(months, 'month');

  const days = end.diff(start, 'day');
  start = start.add(days, 'day');

  const hours = end.diff(start, 'hour');
  start = start.add(hours, 'hour');

  const minutes = end.diff(start, 'minute');
  start = start.add(minutes, 'minute');

  const seconds = end.diff(start, 'second');

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};

export const getTopPos = (
  anchorRect: DOMRect,
  popoverRect: DOMRect,
  position: PositionType
) => {
  switch (position) {
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return anchorRect.top + anchorRect.height;
    case 'top':
    case 'top-start':
    case 'top-end':
      return anchorRect.top - popoverRect.height;
    case 'left':
    case 'right':
      return anchorRect.top - popoverRect.height / 2;
    default:
      return 0;
  }
};

export const getRightPos = (
  anchorRect: DOMRect,
  popoverRect: DOMRect,
  position: PositionType
) => {
  switch (position) {
    case 'bottom-end':
    case 'top-end':
      return window.innerWidth - anchorRect.right;
    case 'bottom':
    case 'top':
      return (
        window.innerWidth +
        anchorRect.width / 2 -
        anchorRect.right -
        popoverRect.width / 2
      );
    case 'bottom-start':
    case 'top-start':
      return (
        window.innerWidth -
        anchorRect.right +
        anchorRect.width -
        popoverRect.width
      );
    default:
      return 0;
  }
};
