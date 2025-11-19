import { diff } from '@shared/lib/date';
import { useEffect, useState } from 'react';

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState();
  const now = new Date();

  useEffect(() => {
    const timer = setInterval(() => {
      diff(targetDate, now, 'second');
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
