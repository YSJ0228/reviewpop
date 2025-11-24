'use client';

import { useCampaigns, filterCampaignsByStatus } from '@entities/campaign/hooks/useCampaigns';
import { CAMPAIGN_STATUS_LABELS } from '@entities/campaign/types/campaign.types';
import { diff, now } from '@shared/lib/date';

import { CampaignCard } from '../CampaignCard';

import type { CampaignListProps } from './types';

import styles from './style.module.scss';
import dayjs from 'dayjs';

export function CampaignList({ status }: CampaignListProps) {
  const { data: campaigns, isLoading, error } = useCampaigns();
  const thisTime = now();
  const statusTitle = CAMPAIGN_STATUS_LABELS[status];

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

  // TODO: 이후 EmptyState로 수정
  if (filteredCampaigns.length === 0) {
    return (
      <div className={styles['CampaignList--Empty']} role="status" aria-label={`체험이 없습니다`}>
        <p>해당 체험이 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className={styles.CampaignList}
      role="feed"
      aria-label={`${statusTitle} 체험 목록`}
      aria-busy={isLoading}
    >
      {status === 'before_recruiting' &&
        filteredCampaigns
          .sort((a, b) =>
            diff(a.schedule.applicationSchedule[0], b.schedule.applicationSchedule[0]),
          )
          .map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}
      {status === 'completed' &&
        filteredCampaigns
          .sort((a, b) =>
            diff(
              b.schedule.winnerAnnouncementSchedule[1],
              a.schedule.winnerAnnouncementSchedule[1],
            ),
          )
          .map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}
      {status === 'recruiting' &&
        filteredCampaigns
          .filter((campaign) => {
            return campaign.schedule.applicationSchedule[1] > thisTime.toISOString();
          })
          .sort((a, b) => {
            return (
              diff(a.schedule.applicationSchedule[1], b.schedule.applicationSchedule[1]) ||
              a.currentRecruitment - b.currentRecruitment ||
              b.maxRecruitment - a.maxRecruitment
            );
          })
          .map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}
    </div>
  );
}
