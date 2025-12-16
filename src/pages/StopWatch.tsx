import type React from 'react';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import CountDown from '../components/CountDown/CountDown';
import Button from '../components/Button/Button';
import type { IPausedTime } from '../components/CountDown/countdown.interface';
import PauseResume from '../assets/play_pause.svg?react';
import StopIcon from '../assets/stop_icon.svg?react';

const StopWatch: React.FC = () => {
  const [startTime, setStartTime] = useState<string>('');
  const [running, setRunning] = useState<boolean>(false);
  const [pausedTimes, setPausedTimes] = useState<IPausedTime[]>([]);

  const isPaused = useMemo(() => {
    return pausedTimes.length > 0 && !pausedTimes[pausedTimes.length - 1]?.end;
  }, [pausedTimes]);

  const stop = () => {
    const now = dayjs().utc().format();
    setStartTime(now);
    setRunning(false);
    setPausedTimes([]);
    localStorage.removeItem('startTime');
  };

  const pauseOrContinue = () => {
    const now = dayjs().utc().format();
    if (pausedTimes.length === 0 && !running) {
      setStartTime(now);
      setRunning(true);
      localStorage.setItem('startTime', now);
    } else if (!isPaused) {
      setPausedTimes((prev) => [
        ...prev,
        {
          start: now,
        },
      ]);
      setRunning(false);
    } else {
      setPausedTimes((prev) => {
        if (prev.length > 0) {
          prev[prev.length - 1].end = now;
        }
        return [...prev];
      });
      setRunning(true);
    }
  };

  useEffect(() => {
    const localStartTime = localStorage.getItem('startTime');
    const localPausedTimes = localStorage.getItem('pausedTimes');
    const localRunning = localStorage.getItem('running');
    if (!localStartTime) {
      const now = dayjs().utc().format();
      setStartTime(now);
    } else {
      setStartTime(localStartTime);
    }

    if (localPausedTimes) {
      setPausedTimes(JSON.parse(localPausedTimes));
    }
    if (localRunning) {
      setRunning(localRunning === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pausedTimes', JSON.stringify(pausedTimes));
  }, [pausedTimes]);

  useEffect(() => {
    localStorage.setItem('running', JSON.stringify(running));
  }, [running]);

  return (
    <section className="flex flex-col w-full justify-center items-center gap-3">
      <CountDown
        dateTime={startTime}
        size={80}
        pausedTimes={pausedTimes}
        running={running}
        className="text-4xl!"
      />
      <div className="flex gap-2 text-amber-300">
        <Button
          label={
            !isPaused
              ? pausedTimes.length > 0 || running
                ? 'Pause'
                : 'Start'
              : 'Resume'
          }
          onClick={pauseOrContinue}
          icon={<PauseResume className="w-5 h-5" />}
        />
        <Button
          label="Stop"
          onClick={stop}
          icon={<StopIcon className="w-5 h-5" />}
        />
      </div>
    </section>
  );
};

export default StopWatch;
