import type React from 'react';
import type { ITimerProps } from './event.interface';
import CountDown from '../CountDown/CountDown';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const Timer: React.FC<ITimerProps> = ({ startTime, endTime }) => {
  const dateTime = useMemo(() => {
    const now = dayjs();

    if (dayjs(startTime).isAfter(now)) {
      return dayjs(startTime).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
    }

    return dayjs(endTime).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
  }, [startTime, endTime]);

  const isEnded = useMemo(() => {
    return dayjs().isAfter(dateTime);
  }, [dateTime]);

  if (isEnded) {
    return <>ended</>;
  }

  return <CountDown dateTime={dateTime} />;
};

export default Timer;
