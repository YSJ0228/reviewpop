import { diff } from '@shared/lib/date';
import { BeforeRecruitingCard } from '../CampaignCard/BeforeRecruitingCard';
import { CampaignListProps } from './types';

import styles from './style.module.scss';

export function BeforeRecruitingCampaignList({ data }: CampaignListProps) {
  const campaigns = data || [];

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <div className={styles.CampaignList} role="feed" aria-label="오픈 예정 체험 목록">
      {campaigns
        .sort((a, b) => diff(a.schedule.application.start, b.schedule.application.start))
        .map((campaign) => (
          <BeforeRecruitingCard key={campaign.id} campaign={campaign} />
        ))}
    </div>
  );
}
