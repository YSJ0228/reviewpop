import { filterCampaignsByStatus, useMyCampaigns } from '@entities/history/hooks/useMyCampaigns';

import { CampaignCard } from '@features/history/components/CampaignCard';

import styles from './style.module.scss';

export function RejectedList() {
  const { data: campaigns, isLoading, error } = useMyCampaigns();
  const rejectedCampaigns = filterCampaignsByStatus(campaigns, 'rejected');

  if (isLoading) {
    return (
      <div role="status" aria-live="polite" aria-label="미선정 체험 목록 로딩 중">
        로딩중...
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" aria-live="assertive">
        <p>데이터를 불러오는데 실패했습니다.</p>
        <p>{error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}</p>
      </div>
    );
  }

  if (campaigns?.length === 0) {
    return (
      <div role="status" aria-label="미선정 체험이 없습니다.">
        <p>미선정 캠페인이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.RejectedList} role="feed" aria-label="미선정 체험 목록">
      {rejectedCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} type="rejected" />
      ))}
    </div>
  );
}
