import type React from 'react';
import type { ITimerProps } from './event.interface';
import CountDown from '../CountDown/CountDown';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';

const Timer: React.FC<ITimerProps> = ({ startTime, endTime }) => {
  const dateTime = useMemo(() => {
    const now = dayjs();

    if (dayjs(startTime).isAfter(now)) {
      return dayjs(startTime).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
    }

    return dayjs(endTime).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
  }, [startTime, endTime]);

  const isEnded = useMemo(() => {
    return dayjs().isAfter(endTime);
  }, [endTime]);

  const notYetStarted = useMemo(() => {
    return dayjs().isBefore(startTime);
  }, [startTime]);

  if (isEnded) {
    return <>ended</>;
  }

  return (
    <div className="flex gap-2 items-center">
      <Typography
        label={notYetStarted ? 'Starts in' : 'Ends in'}
        variant={typographyVariants.caption_12_500}
      />

      <CountDown dateTime={dateTime} />
    </div>
  );
};

export default Timer;
