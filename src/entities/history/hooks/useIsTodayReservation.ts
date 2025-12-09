import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

/**
 * 체험 예약일이 당일인지 확인하는 훅
 * @param appliedAt - 체험 예약일과 시간
 * @returns 체험 예약일이 당일인지 여부
 */
export function useIsTodayReservation(appliedAt: string[] | undefined) {
  const [isToday, setIsToday] = useState(() =>
    appliedAt ? dayjs(appliedAt[0]).isSame(dayjs(), 'day') : false,
  );

  useEffect(() => {
    if (!appliedAt) return;

    // 자정까지 남은 시간 계산
    const now = dayjs();
    const midnight = now.add(1, 'day').startOf('day');
    const timeUntilMidnight = midnight.diff(now);

    const timer = setTimeout(() => {
      setIsToday(dayjs(appliedAt[0]).isSame(dayjs(), 'day'));
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [appliedAt]);

  return isToday;
}
