'use client';

import { useMyCampaigns, filterCampaignsByStatus } from '@entities/history/hooks/useMyCampaigns';

import { APPLICATION_STATUS_LABELS } from '@features/history/constants';

import { CampaignCard } from '../CampaignCard';

import type { IMyCampaignListProps } from './types';

import styles from './style.module.scss';

export function CampaignList({ status }: IMyCampaignListProps) {
  const { data: campaigns, isLoading, error } = useMyCampaigns();

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

  // 빈 목록인 경우 null 반환 (EmptyState는 CampaignTabs에서 처리)
  if (filteredCampaigns.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.CampaignList}
      role="feed"
      aria-label={`${APPLICATION_STATUS_LABELS[status]} 체험 목록`}
      aria-busy={isLoading}
    >
      {filteredCampaigns.map((application) => (
        <CampaignCard key={application.campaign.id} application={application} type={status} />
      ))}
    </div>
  );
}
