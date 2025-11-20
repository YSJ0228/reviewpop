'use client';

import { useCountdown } from '@shared/hooks/useCountdown';

export function CampaignCountdown({ targetDate }: { targetDate: string }) {
  const totalSeconds = useCountdown(targetDate);
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');

  return <span>{`${hours}:${minutes}:${seconds}`}</span>;
}
