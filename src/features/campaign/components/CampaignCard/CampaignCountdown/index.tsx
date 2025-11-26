'use client';

import { useCountdown } from '@shared/hooks/useCountdown';
import { formatDate } from '@shared/lib/date';

export function CampaignCountdown({ targetDate }: { targetDate: string }) {
  const totalSeconds = useCountdown(targetDate);
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');

  return (
    <span>
      {Number(hours) >= 24
        ? `${formatDate(targetDate, 'MMDD_LONG')} 오픈`
        : `오픈까지 ${hours}:${minutes}:${seconds}`}
    </span>
  );
}
