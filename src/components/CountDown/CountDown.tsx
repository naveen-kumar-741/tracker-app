import type React from 'react';
import type { IUnitsState, ICountDownProps } from './countdown.interface';

import { useEffect, useMemo, useRef, useState } from 'react';
import Cube from './Cube';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getCalendarDiffFromNow, getMaxUnit } from '../../utils/helper';
import { initialUnitState } from './countdown.constant';

dayjs.extend(utc);

const CountDown: React.FC<ICountDownProps> = ({
  dateTime,
  size = 30,
  pausedTimes,
  running = true,
  className = '',
}) => {
  const [units, setUnits] = useState<IUnitsState>(initialUnitState);
  const [rotation, setRotation] = useState<IUnitsState>(initialUnitState);

  const intervalRef = useRef<number | null>(null);

  const max = useMemo(() => getMaxUnit(dateTime), [dateTime]);

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const updateUnits = () => {
      const nextUnits = getCalendarDiffFromNow(dateTime, pausedTimes);
      setUnits((prevUnits) => {
        setRotation((prevRotation) => {
          const updated = { ...prevRotation };

          (Object.keys(nextUnits) as Array<keyof IUnitsState>).forEach(
            (key) => {
              if (prevUnits[key] !== nextUnits[key]) {
                updated[key] += 90;
              }
            }
          );

          return updated;
        });

        return nextUnits;
      });
    };
    if (running) {
      intervalRef.current = window.setInterval(updateUnits, 1000);
    }
    updateUnits();

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [max, running]);

  return (
    <div className={`flex ${className}`}>
      <Cube
        size={size}
        suffix="Y"
        units={units.years}
        rotation={rotation.years}
        show={!!units.years}
      />
      <Cube
        size={size}
        suffix="M"
        units={units.months}
        rotation={rotation.months}
        show={!!units.years || !!units.months}
      />
      <Cube
        size={size}
        suffix="d"
        units={units.days}
        rotation={rotation.days}
        show={!!units.years || !!units.months || !!units.days}
      />
      <Cube
        size={size}
        suffix="h"
        units={units.hours}
        rotation={rotation.hours}
        show={!!units.years || !!units.months || !!units.hours}
      />
      <Cube
        size={size}
        suffix="m"
        units={units.minutes}
        rotation={rotation.minutes}
        show={!!units.years || !!units.months || !!units.minutes}
      />
      <Cube
        size={size}
        suffix="s"
        units={units.seconds}
        rotation={rotation.seconds}
      />
    </div>
  );
};

export default CountDown;
