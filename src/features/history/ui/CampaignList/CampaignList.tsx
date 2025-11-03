'use client';

import { useCampaigns, filterCampaignsByStatus } from '../../hooks/useCampaigns';
import type { CampaignStatus } from '../../types/campaign.types';
import { STATUS_LABELS } from '../../types/campaign.types';
import { CampaignCard } from '../CampaignCard/CampaignCard';
import styles from './CampaignList.module.scss';

interface CampaignListProps {
  status: CampaignStatus;
}

export function CampaignList({ status }: CampaignListProps) {
  const { data: campaigns, isLoading, error } = useCampaigns();

  const filteredCampaigns = filterCampaignsByStatus(campaigns, status);

  if (isLoading) {
    return (
      <div
        className={styles['CampaignList--Loading']}
        role="status"
        aria-live="polite"
        aria-label="캠페인 목록 로딩 중"
      >
        <div className={styles.CampaignList__Spinner} />
        <span>로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['CampaignList--Error']} role="alert" aria-live="assertive">
        <p>데이터를 불러오는데 실패했습니다.</p>
        <p className={styles.CampaignList__ErrorMessage}>
          {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
        </p>
      </div>
    );
  }

  if (filteredCampaigns.length === 0) {
    return (
      <div
        className={styles['CampaignList--Empty']}
        role="status"
        aria-label={`${STATUS_LABELS[status]} 상태의 캠페인이 없습니다`}
      >
        <p>해당 상태의 캠페인이 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className={styles.CampaignList}
      role="feed"
      aria-label={`${STATUS_LABELS[status]} 캠페인 목록`}
      aria-busy={isLoading}
    >
      {filteredCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
