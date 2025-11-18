import { useMyCampaigns } from '@entities/history/hooks/useMyCampaigns';

import { CampaignCard } from '@features/history/components/CampaignCard';

import styles from './style.module.scss';

export function RejectedList() {
  const { data: campaigns, isLoading, error } = useMyCampaigns();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return (
      <div>
        <p>데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (campaigns?.length === 0) {
    return (
      <div>
        <p>미선정 캠페인이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.RejectedList}>
      {campaigns
        ?.filter((campaign) => campaign.status === 'rejected')
        .map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} type="rejected" />
        ))}
    </div>
  );
}
