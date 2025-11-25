import { diff } from '@shared/lib/date';

import { CompletedCard } from '../CampaignCard/CompletedCard';

import type { CampaignListProps } from './types';

import styles from './style.module.scss';

export function CompletedCampaignList({ filteredCampaigns }: Omit<CampaignListProps, 'status'>) {
  return (
    <div className={styles.CampaignList} role="feed" aria-label="마감된 체험 목록">
      {filteredCampaigns
        .sort((a, b) =>
          diff(b.schedule.winnerAnnouncementSchedule[1], a.schedule.winnerAnnouncementSchedule[1]),
        )
        .map((campaign) => (
          <CompletedCard key={campaign.id} campaign={campaign} />
        ))}
    </div>
  );
}
