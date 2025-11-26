import { diff } from '@shared/lib/date';

import { BeforeRecruitingCard } from '../CampaignCard/BeforeRecruitingCard';

import type { CampaignListProps } from './types';

import styles from './style.module.scss';

export function BeforeRecruitingCampaignList({
  filteredCampaigns,
}: Omit<CampaignListProps, 'status'>) {
  return (
    <div className={styles.CampaignList} role="feed" aria-label="오픈 예정 체험 목록">
      {filteredCampaigns
        .sort((a, b) => diff(a.schedule.applicationSchedule[0], b.schedule.applicationSchedule[0]))
        .map((campaign) => (
          <BeforeRecruitingCard key={campaign.id} campaign={campaign} />
        ))}
    </div>
  );
}
