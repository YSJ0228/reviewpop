import { EmptyState } from '@shared/components';
import { RecruitingCard } from '../CampaignCard/RecruitingCard';
import { CampaignListProps } from './types';

import styles from './style.module.scss';

export function RecruitingCampaignList({ data }: CampaignListProps) {
  const campaigns = data || [];

  if (campaigns.length === 0) {
    return <EmptyState variant="no-opened" />;
  }

  return (
    <div className={styles.CampaignList} role="feed" aria-label="모집 중인 체험 목록">
      {campaigns.map((campaign) => (
        <RecruitingCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
