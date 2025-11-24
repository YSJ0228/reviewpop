import { useEffect, useState } from 'react';

import { diff, now } from '@shared/lib/date';

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const update = () => setTimeLeft(Math.max(0, diff(targetDate, now(), 'second')));
    update();
    const timer = setInterval(() => update(), 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
