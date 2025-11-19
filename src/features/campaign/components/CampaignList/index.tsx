'use client';

import { useCampaigns, filterCampaignsByStatus } from '@entities/campaign/hooks/useCampaigns';
import { CampaignCard } from '../CampaignCard';
import type { CampaignListProps } from './types';
import styles from './style.module.scss';

export function CampaignList({ status }: CampaignListProps) {
  const { data: campaigns, isLoading, error } = useCampaigns();
  const now = new Date();

  const filteredCampaigns = filterCampaignsByStatus(campaigns, status);

  if (isLoading) {
    return (
      <div
        className={styles['CampaignList--Loading']}
        role="status"
        aria-live="polite"
        aria-label="체험 목록 로딩 중"
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

  // TODO: 추후 조건 및 문구 수정
  if (filteredCampaigns.length === 0) {
    return (
      <div className={styles['CampaignList--Empty']} role="status" aria-label={`체험이 없습니다`}>
        <p>해당 체험이 없습니다.</p>
      </div>
    );
  }

  //TODO: 추후 조건 및 문구 수정
  return (
    <div
      className={styles.CampaignList}
      role="feed"
      aria-label={`무슨무슨 체험 목록`}
      aria-busy={isLoading}
    >
      {filteredCampaigns.map(
        (campaign) =>
          (status !== 'active' || campaign.schedule.applicationSchedule[1] > now.toISOString()) && (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ),
      )}
    </div>
  );
}
