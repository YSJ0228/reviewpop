import { useMemo } from 'react';

import { diff, now } from '@shared/lib/date';

import { RecruitingCard } from '../CampaignCard/RecruitingCard';

import type { CampaignListProps } from './types';

import styles from './style.module.scss';

export function RecruitingCampaignList({ filteredCampaigns }: Omit<CampaignListProps, 'status'>) {
  const thisTime = now();

  const sortedCampaigns = useMemo(() => {
    return filteredCampaigns
      .filter((campaign) => {
        return campaign.schedule.application.end > thisTime.toISOString();
      })
      .sort(
        (a, b) =>
          diff(a.schedule.application.end, b.schedule.application.end) ||
          a.currentRecruitment - b.currentRecruitment ||
          b.maxRecruitment - a.maxRecruitment,
      );
  }, [filteredCampaigns, thisTime]);

  return (
    <div className={styles.CampaignList} role="feed" aria-label="진행 중인 체험 목록">
      {sortedCampaigns.map((campaign) => (
        <RecruitingCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
